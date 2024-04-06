import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import counterReducer  from './userInfoSlice'
// ...

// export const store = configureStore({
//   reducer: {
//     posts: postsReducer,
//     comments: commentsReducer,
//     users: usersReducer,
//   },
// })

export const store = configureStore({
    reducer: {
     testReducer:reducer,
     userInfoReducer:counterReducer 
    },
  })

  // Subscribe to store changes and save to localStorage
store.subscribe(() => {
 const currentState = store.getState();
 if(currentState.userInfoReducer.token) {
    localStorage.setItem('userToken',currentState.userInfoReducer.token)
 }
 if(currentState.userInfoReducer.userInfo) {
  localStorage.setItem("userInfo",JSON.stringify(currentState.userInfoReducer.userInfo))
 }
 if(currentState.userInfoReducer.menuList) {
  localStorage.setItem("menuList",JSON.stringify(currentState.userInfoReducer.menuList))
 }

});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch