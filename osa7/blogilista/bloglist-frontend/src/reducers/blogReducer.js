import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
const initialState = [];

const blogReducer = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog(state, action) {
      console.log(action.payload);
      const newState = state.concat(action.payload);
      state = newState;
      return newState;
    },
    setAllBlogs(state, action) {
      state = action.payload;
      console.log(action.payload);
      return action.payload;
    },
    removeBlogFromStore(state, action) {
      const newState = state.filter((blog) => {
        return blog.id !== action.payload.id;
      });
      state = newState;
      return newState;
    },
    modifyiSingleBlog(state, action) {
      console.log(action.payload);
      const id = action.payload.id;
      const modifiedBlogData = action.payload;
      const newState = state.map((blog) =>
        blog.id === id ? modifiedBlogData : blog
      );
      console.log(newState);
      state = newState;
      return newState;
    },
    sortAllBlogs(state, action) {
      const newState = state.sort((a, b) => {
        return b.likes - a.likes;
      });
      state = newState;
      return newState;
    },
  },
});

export const {
  addBlog,
  setAllBlogs,
  removeBlogFromStore,
  modifyiSingleBlog,
  sortAllBlogs,
} = blogReducer.actions;

export const handleLike = (blog) => {

  return async dispatch => {
  const modifiedBlogData = {
    likes: blog.likes + 1,
    user: blog.user.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    id: blog.id,
  };
  await blogService.modifyi(modifiedBlogData);

  //in the local storage we want to also store the entire user obj to the blog
  dispatch(modifyiSingleBlog({ ...modifiedBlogData, user: blog.user }));
  dispatch(sortAllBlogs());
}
};


export const handleRemoval = (blog) => {
  return async dispatch => {
    const confirmRemoval = window.confirm(
      `remove blog ${blog.title} by ${blog.author}?`
    );
    if (confirmRemoval === true) {
      await blogService.remove(blog);
      dispatch(removeBlogFromStore(blog));
      dispatch(sortAllBlogs());
    }
  }
};

export default blogReducer.reducer;
