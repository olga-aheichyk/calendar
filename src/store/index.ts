import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

const rootReducer = combineReducers(reducers);

//export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({reducer: rootReducer});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch