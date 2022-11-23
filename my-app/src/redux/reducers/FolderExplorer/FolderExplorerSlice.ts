import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { createFile } from '../../../API/api';
import { RootState } from '../../store';

export const fetchId = createAsyncThunk(
	'fetchId',
	async () => {
		const response = await axios.post('http://185.244.172.108:8081/v1/outlay-rows/entity/create')
		return response.data
	}
)

export const fetchList = createAsyncThunk(
	'fetchList',
	async (userId: number, thunkApi) => {
		const { data } = await axios.get(`http://185.244.172.108:8081/v1/outlay-rows/entity/${userId}/row/list`)
		if (data.length === 0) {
			const id = Number(localStorage.getItem('id'))
			await createFile(null, 'Default Folder', id)
			thunkApi.dispatch(fetchList(id))
		} else {
			return data;
		}
	}
)

export interface listItem {
	child: listItem[]
	equipmentCosts: number
	estimatedProfit: number
	id: number
	machineOperatorSalary: number
	mainCosts: number
	materials: number
	mimExploitation: number
	overheads: number
	rowName: string
	salary: number
	supportCosts: number
	total: number
	isEditing: boolean
}
export interface FolderExplorerState {
	list: listItem[]
}
const initialState: FolderExplorerState = {
	list: [],
}

export const FolderExplorer = createSlice({
	name: 'FolderExplorer',
	initialState,
	reducers: {
		setList: (state, action: PayloadAction<listItem[]>) => {
			state.list = action.payload.map(e => { return { ...e, isEditing: false } })
		},
		deleteFromList: (state, action: PayloadAction<number>) => {
			const deleteTarget = (array: listItem[], targetId: number) => {
				const newArray: listItem[] = [];

				array.forEach((elem: listItem) => {
					if (elem.id === targetId) {
						return;
					} else if (elem.child.length) {
						newArray.push({ ...elem, child: deleteTarget(elem.child, targetId) });
					} else {
						newArray.push(elem);
					}
				});

				return newArray;
			};
			state.list = deleteTarget(state.list, action.payload)
		},
		setIsEditing: (state, action: PayloadAction<{ id: number, editingStatus: boolean, newName: string }>) => {
			//Если мы не хотим менять имя, передаём пустую строку
			const UpdateById = (array: listItem[], id: number) => {
				const newArray: listItem[] = [];

				array.forEach((elem: listItem) => {
					if (elem.id === id) {
						if (action.payload.editingStatus) {
							newArray.push({ ...elem, isEditing: action.payload.editingStatus })
						} else {//editingStatus == false
							newArray.push({ ...elem, isEditing: action.payload.editingStatus, rowName: action.payload.newName })
						}
					} else if (elem.child.length) {
						newArray.push({ ...elem, child: UpdateById(elem.child, id) });
					} else {
						newArray.push(elem);
					}
				})

				return newArray;
			}
			state.list = UpdateById(state.list, action.payload.id)

		},
		addInList: (state, action: PayloadAction<{ parentId: number | null, itemId: number }>) => {
			const newElem = {
				id: action.payload.itemId,
				rowName: "default name",
				total: 0,
				salary: 0,
				mimExploitation: 0,
				machineOperatorSalary: 0,
				materials: 0,
				mainCosts: 0,
				supportCosts: 0,
				equipmentCosts: 0,
				overheads: 0,
				estimatedProfit: 0,
				child: [],
				isEditing: true
			}
			if (action.payload.parentId == null) {
				state.list = [...state.list, newElem]
			} else {
				const AddInParent = (array: listItem[], parentId: number) => {
					const newArray: listItem[] = [];

					array.forEach((elem: listItem) => {
						if (elem.id === parentId) {
							newArray.push({ ...elem, child: [...elem.child, newElem] })
						} else if (elem.child.length) {
							newArray.push({ ...elem, child: AddInParent(elem.child, parentId) });
						} else {
							newArray.push(elem);
						}
					})

					return newArray;
				}
				state.list = AddInParent(state.list, action.payload.parentId)
			}

		},


	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchId.fulfilled, (state, action) => {
				localStorage.setItem('id', action.payload.id)
				console.log(action.payload)
			})
			.addCase(fetchList.fulfilled, (state, action) => {
				state.list = (action.payload)
			})
	},
});

export const { setList, deleteFromList, addInList, setIsEditing } = FolderExplorer.actions;

export const list = (state: RootState) => state.FolderExplorer.list;

export default FolderExplorer.reducer;
