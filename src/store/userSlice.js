import { createSlice } from "@reduxjs/toolkit"

let user = createSlice({
  name : 'user',
  initialState : {name : 'kim', age : 20 , count:2},
  reducers : {
    changeName(state) {
   state.name='lee'
    },
 
  
  }
})

export let {changeName} = user.actions

export default user;