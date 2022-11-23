import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import WorkWindow from './components/WorkWindow/WorkWindow';
import cn from './App.module.scss'
import axios from 'axios';
import { fetchId, } from './redux/reducers/FolderExplorer/FolderExplorerSlice'
import { useAppDispatch, useAppSelector } from './redux/hooks';



function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (localStorage.getItem('id') == null) {
			dispatch(fetchId())
		}
	}, [])

	return (
		<div>
			<Header />
			<main className={cn['main']}>
				<Sidebar />
				{localStorage.getItem('id') == null ? null : <WorkWindow />}
			</main>
		</div>
	);
}

export default App;
