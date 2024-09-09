import { createSlice } from '@reduxjs/toolkit'

const initialState= {
  name: '',
  email: '',
  phone:'',
  address:'',
  avatar:'',
  access_token: '',
  id:'',
  isAdmin:false
}
export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) =>{
         const {name='', email='', address='', phone='', avatar='', access_token, _id='', isAdmin }= action.payload
         state.name = name ;
         state.email= email;
         state.address= address;
         state.phone= phone;
         state.avatar= avatar;
         state.id = _id;
         state.isAdmin = isAdmin ;
         state.access_token = access_token;
         console.log('Updated state:', state);  
    },
    resetUser: (state) =>{
      state.name = '';
      state.email= '';
      state.address= '';
      state.phone= '';
      state.avatar= '';
      state.id = '';
      state.access_token = '';
      state.isAdmin = false;
 }
  }
})

export const { updateUser,resetUser } = userSlide.actions

export default userSlide.reducer