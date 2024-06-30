import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './CounterSlice'
import { categoriesReducer } from './CategoriesSlice'


 export let Store = configureStore({
    reducer: {
       counter: counterReducer,
       categories: categoriesReducer,
       

    },

})