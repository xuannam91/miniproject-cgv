// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   users: [],
// };
// export const fetchApi = createAsyncThunk("user/fetchUser", async () => {
//   const response = await axios.get("http://localhost:8000/users");
//   return response.data;
// });

// export const putApi = createAsyncThunk("user/postchUser", async () => {
//     const res = await axios.post("http://localhost:8000/users");
//     return res.data;
// })
// console.log(fetchApi);

// const todoSlice = createSlice({
//     name: "users",
//     initialState,
//     extraReducers(builder) {
//         builder.addCase(fetchApi.fulfilled, (state, action) => {
//           state.users = action.payload;
//         });
//       },

// });
// export default todoSlice.reducer;
// export const selectAllTodo = (state) => state.users.users;