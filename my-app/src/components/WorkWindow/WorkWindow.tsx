import React, { useEffect } from 'react'
import Folder1 from './FolderExplorerItem/Folder1'
import cn from './WorkWindow.module.scss'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchList, list } from '../../redux/reducers/FolderExplorer/FolderExplorerSlice';
import { createFile, deleteFile, updateFile } from '../../API/api';

export default function WorkWindow() {
	const userId = Number(localStorage.getItem('id'))
	const listFiles = useAppSelector(list)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (listFiles && listFiles.length === 0) { dispatch(fetchList(userId)) }
	}, [listFiles])

	return (
		<div className={cn['WorkWindow']}>
			<div className={cn['WorkWindow__bar']}>
				<div className={cn['WorkWindow__openProjectName']}>Строительно-монтажные работы</div>
			</div>
			<div className={cn['FolderExplorer']}>
				<div className={cn['FolderExplorer__topBar']}>
					<div className={cn['FolderExplorer__topBar-left']}>
						<span>Уровень</span>
						<span>Наименование работ</span>
					</div>
					<div className={cn['FolderExplorer__topBar-right']}>
						<span>Основная з/п</span>
						<span>Оборудование</span>
						<span>Накладные расходы</span>
						<span>Сметная прибыль</span>
					</div>
				</div>
				<div className={cn['FolderExplorer__items']}>
					{listFiles && listFiles.map(e =>
						<Folder1
							itemId={e.id}
							isEditing={e.isEditing}
							nameOfWorks={e.rowName}
							salary={e.salary}
							equipment={e.equipmentCosts}
							overheadCosts={e.overheads}
							estimatedProfit={e.estimatedProfit}
							key={e.id}
							child={e.child}
						/>)}
				</div>
			</div>
		</div>
	)
}


