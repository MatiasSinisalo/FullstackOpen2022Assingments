import { createSlice } from "@reduxjs/toolkit";

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
      console.log("sorted!");
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

export default blogReducer.reducer;
