import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
  export let getAllCtaegories = createAsyncThunk("categories/getAllCtaegories",async ()=>{
    const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
    return data.data
 })
 let initialState={
    categories:[]
 }

  let categoriesSlice =createSlice({
    name:"categories",
    initialState,
    extraReducers:(builders)=>{
        builders.addCase(getAllCtaegories.fulfilled,(state,actions)=>{
            state.categories=actions.payload
        })
    }
 })
 export let categoriesReducer = categoriesSlice.reducer;