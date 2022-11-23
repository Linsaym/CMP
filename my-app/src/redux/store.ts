import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './reducers/counter/counterSlice';
import FolderExplorerReducer from './reducers/FolderExplorer/FolderExplorerSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		FolderExplorer: FolderExplorerReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
