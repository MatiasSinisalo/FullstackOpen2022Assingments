const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const counter = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(counter, 0);
};

const favoriteBlog = (blogs) => {
  const sortedBlogs = [].concat(blogs).sort((a, b) => b.likes - a.likes);
  if (sortedBlogs.length > 0) {
    return {
      title: sortedBlogs[0].title,
      author: sortedBlogs[0].author,
      likes: sortedBlogs[0].likes,
    };
  } else {
    return undefined;
  }
};

const mostBlogs = (blogs) => {
  const authorBlogCounts = new Map();
  blogs.forEach((blog) => {
    if (!authorBlogCounts.has(blog.author)) {
      authorBlogCounts.set(blog.author, 1);
    } else {
      authorBlogCounts.set(blog.author, authorBlogCounts.get(blog.author) + 1);
    }
  });

  let authorWithMostBlogs = "";
  let mostBlogsCount = 0;
  authorBlogCounts.forEach((value, key) => {
    if (value > mostBlogsCount) {
      authorWithMostBlogs = key;
      mostBlogsCount = value;
    }
  });

  return { author: authorWithMostBlogs, blogs: mostBlogsCount };
};

const mostLikes = (blogs) => {
  const authorBlogLikes = new Map();
  blogs.forEach((blog) => {
    if (!authorBlogLikes.has(blog.author)) {
      authorBlogLikes.set(blog.author, blog.likes);
    } else {
      authorBlogLikes.set(
        blog.author,
        authorBlogLikes.get(blog.author) + blog.likes
      );
    }
  });

  let authorWithMostLikes = "";
  let mostLikesCount = 0;
  authorBlogLikes.forEach((value, key) => {
    if (value > mostLikesCount) {
      authorWithMostLikes = key;
      mostLikesCount = value;
    }
  });

  return { author: authorWithMostLikes, likes: mostLikesCount };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
