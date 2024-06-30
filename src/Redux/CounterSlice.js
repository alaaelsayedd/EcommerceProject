import { createSlice } from "@reduxjs/toolkit";
let initialState ={
    counter:0,
}

let counterSlice = createSlice({
    name:"counter",
    initialState,
    reducers:{
        increase:(state ,actions)=>{
            state.counter++;
            console.log(actions.payload)
        },
        decrease:(state)=>{
            state.counter--
        }
    }
})
 export let counterReducer =counterSlice.reducer;
  export let {increase,decrease} = counterSlice.actions;
 