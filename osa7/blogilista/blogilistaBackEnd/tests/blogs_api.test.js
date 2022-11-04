const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

const loginAsUser = async (username, password) => {
  const loginRequestJson = {
    username: username,
    password: password,
  };
  const result = await api.post("/api/login").send(loginRequestJson);

  return result.body;
};

const users = [
  {
    username: "placeholder",
    name: "placeholder name",
    password: "1234",
    blogs: [],
  },
  {
    username: "second placeholder",
    name: "testname",
    blogs: [],
    password: "1234",
  },
];

const blogs = [
  {
    title: "This blog is owned by username placeholder",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "This blog is owned by username second placeholder",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 6,
  },
];

describe("default tests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("amount of returned blogs is correct", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(blogs.length);
  });

  test("indentifying field must be id", async () => {
    const response = await api.get("/api/blogs");
    const returnedBlogs = response.body.map((blog) => blog);
    expect(returnedBlogs[0].id).toBeDefined();
  });

  test("adding a new blog increases the returned blogs length by 1", async () => {
    //   const allUsers = await User.find({})

    const loginInfo = await loginAsUser("placeholder", "1234");

    const newBlog = {
      author: "test author",
      title: "just added blog",
      url: "https://www.helsinki.fi/fi",
      likes: 10,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${loginInfo.token}`)
      .send(newBlog);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(blogs.length + 1);
  });

  test("just added blog is found from the database", async () => {
    const loginInfo = await loginAsUser("placeholder", "1234");
    const newBlog = {
      author: "test author",
      title: "just added blog",
      url: "https://www.helsinki.fi/fi",
      likes: 10,
    };
    const addedBlog = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${loginInfo.token}`)
      .send(newBlog);

    const blogToCheck = await Blog.findById(addedBlog.body.blog.id);

    expect(blogToCheck.author).toBe("test author");
    expect(blogToCheck.title).toBe("just added blog");
  });

  test("blog created with empty likes is assinged 0 likes when added to database", async () => {
    const loginInfo = await loginAsUser("placeholder", "1234");
    const newBlog = {
      author: "test author",
      title: "just added blog",
      url: "https://www.helsinki.fi/fi",
    };

    const savedBlog = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${loginInfo.token}`)
      .send(newBlog);

    const blogToCheck = await Blog.findById(savedBlog.body.blog.id);
    expect(blogToCheck.likes).toBe(0);
  });

  test("if new blog title is empty return 400", async () => {
    const loginInfo = await loginAsUser("placeholder", "1234");

    const newBlog = {
      author: "test",
      title: "",
      url: "https://www.helsinki.fi/fi",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${loginInfo.token}`)
      .send(newBlog)
      .expect(400);
  });

  test("if new blog url is empty return 400", async () => {
    const loginInfo = await loginAsUser("placeholder", "1234");

    const newBlog = {
      author: "test",
      title: "test title",
      url: "",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${loginInfo.token}`)
      .send(newBlog)
      .expect(400);
  });

  test("deleted blog is removed from the database", async () => {
    const loginInfo = await loginAsUser("placeholder", "1234");
    const request = await api.get(`/api/blogs/`);
    const blogToBeRemoved = request.body[0];
    await api
      .delete(`/api/blogs/${blogToBeRemoved.id}`)
      .set("Authorization", `Bearer ${loginInfo.token}`);

    await api.get(`/api/blogs/${blogToBeRemoved.id}`).expect(404);
  });

  test("changing a blog changes values correctly", async () => {
    const loginInfo = await loginAsUser("placeholder", "1234");
    const blogToBeChanged = await Blog.findOne({
      title: "This blog is owned by username placeholder",
    });

    const newLikes = blogToBeChanged.likes + 1;

    const response = await api
      .put(`/api/blogs/${blogToBeChanged.id}`)
      .set("Authorization", `Bearer ${loginInfo.token}`)
      .send({ likes: newLikes });

    const blogQuery = await api.get(`/api/blogs/${blogToBeChanged.id}`);

    const changedBlog = blogQuery.body;
    expect(changedBlog.likes).toBe(newLikes);
  });

  test("changing a missing blog returns status code 404 missing", async () => {
    const loginInfo = await loginAsUser("placeholder", "1234");
    const request = await api.get(`/api/blogs/`);
    const blogToBeChanged = request.body[0];
    const blogId = blogToBeChanged.id;
    delete blogToBeChanged.id;
    await api
      .delete(`/api/blogs/${blogId}`)
      .set("Authorization", `Bearer ${loginInfo.token}`)
      .expect(204);
    await api
      .put(`/api/blogs/${blogId}`)
      .set("Authorization", `Bearer ${loginInfo.token}`)
      .send(blogToBeChanged)
      .expect(404);
  });

  test("creating a blog when logged in as a user assings the user to the blog correctly", async () => {
    const loginInfo = await loginAsUser("placeholder", "1234");
    const newBlog = {
      title: "new blog",
      url: "http://localhost:3003/",
      likes: 0,
    };
    const savedBlog = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${loginInfo.token}`)
      .send(newBlog)
      .expect(201);
    const blog = await Blog.findOne({ title: "new blog" });
    const blogUser = await User.findOne({ id: blog.user });
    expect(blogUser.username).toEqual(loginInfo.username);
  });

  test("creating a blog when logged in as a user assings the blog to the user correctly", async () => {
    const loginInfo = await loginAsUser("placeholder", "1234");
    const newBlog = {
      title: "new blog",
      url: "http://localhost:3003/",
      likes: 0,
    };
    const savedBlogReq = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${loginInfo.token}`)
      .send(newBlog)
      .expect(201);
    const savedBlog = savedBlogReq.body.blog;

    const blogUser = await User.findOne({ username: loginInfo.username });

    expect(blogUser.blogs.toString()).toContain(savedBlog.id.toString());
  });
});

describe("blog permission tests", () => {
  test("creating a blog when logged in as a user succeeds", async () => {
    const loginInfo = await loginAsUser("placeholder", "1234");
    const newBlog = {
      title: "new blog",
      url: "http://localhost:3003/",
      likes: 0,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${loginInfo.token}`)
      .send(newBlog)
      .expect(201);
  });

  test("creating a blog when not logged in as a user fails with errorcode 401 and doesnt create a blog", async () => {
    const newBlog = {
      title: "new blog",
      url: "http://localhost:3003/",
      likes: 0,
    };
    const serverResponse = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401);
    const blog = await Blog.findOne({ title: "new blog" });
    expect(blog).toBe(null);
  });

  test("removing a blog when logged in as a user that created the blog succeeds", async () => {
    const loginInfo = await loginAsUser("placeholder", "1234");
    const blogToBeRemoved = await Blog.findOne({
      title: "This blog is owned by username placeholder",
    });
    const removedBlog = await api
      .delete(`/api/blogs/${blogToBeRemoved.id}`)
      .set("Authorization", `Bearer ${loginInfo.token}`)
      .expect(204);

    const blog = await Blog.findOne({
      title: "This blog is owned by username placeholder",
    });
    expect(blog).toBe(null);
  });

  test("removing a blog when not logged in as a user that created the blog fails with errorcode 401", async () => {
    const loginInfo = await loginAsUser("second placeholder", "1234");

    const blogToBeRemoved = await Blog.findOne({
      title: "This blog is owned by username placeholder",
    });
    const removedBlog = await api
      .delete(`/api/blogs/${blogToBeRemoved.id}`)
      .set("Authorization", `Bearer ${loginInfo.token}`)
      .expect(401);

    const blog = await Blog.findOne({
      title: "This blog is owned by username placeholder",
    });
    expect(blog.title).toBe("This blog is owned by username placeholder");
  });
});

beforeEach(async () => {
  await User.deleteMany({});
  await api.post("/api/users").send(users[0]);
  await api.post("/api/users").send(users[1]);

  await Blog.deleteMany({});
  const authToken = await loginAsUser("placeholder", "1234");
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${authToken.token}`)
    .send(blogs[0]);

  const secondAuthToken = await loginAsUser("second placeholder", "1234");
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${secondAuthToken.token}`)
    .send(blogs[1]);

  // const allBlogs = await Blog.find({})
  // console.log(allBlogs)
});

afterAll(() => {
  mongoose.connection.close();
});
