import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


import { apiSlice } from "../api";

export const store = configureStore({
	reducer: combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer
  }),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat(apiSlice.middleware)
});

type DispatchFunc = () => AppDispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

