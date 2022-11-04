import Blog from "./Blog";
const Blogs = ({ blogs, handleLike, handleRemoval, user }) => {
  return (
    <>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemoval={handleRemoval}
          user={user}
        />
      ))}
    </>
  );
};

export default Blogs;
