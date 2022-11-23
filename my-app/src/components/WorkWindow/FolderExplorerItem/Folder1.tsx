import React, { useState } from 'react'
import cn from './FolderExplorerItem.module.scss'
import folder1 from './img/FolderIcon1.svg'
import folder2 from './img/FolderIcon2.svg'
import doc from './img/doc.svg'
import trash from './img/TrashFill.svg'
import { createFile, deleteFile, updateFile } from '../../../API/api';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { deleteFromList, addInList, setIsEditing } from '../../../redux/reducers/FolderExplorer/FolderExplorerSlice';
import Folder2 from './Folder2'
import { listItem } from '../../../redux/reducers/FolderExplorer/FolderExplorerSlice';


interface props {
	itemId: number
	nameOfWorks: string
	salary: number
	equipment: number
	overheadCosts: number
	estimatedProfit: number
	isEditing: boolean
	child: listItem[]
}


export default function Folder1({ nameOfWorks, salary, equipment, overheadCosts, estimatedProfit, itemId, isEditing, child }: props) {
	const userId = Number(localStorage.getItem('id'))
	const dispatch = useAppDispatch()
	const [isHover, setIsHover] = useState(false)
	const [inpValue, setInputValue] = useState(nameOfWorks)

	function handleKeyPress(event: any) {
		if (event.key === 'Enter') {
			updateFile(itemId, userId, inpValue)
			dispatch(setIsEditing({ id: itemId, editingStatus: false, newName: inpValue }))
		}
	}

	function Hover() {
		return (isHover ?
			<div className={cn['levelIconsEdit']}>
				<img src={folder1} alt="f1" onClick={() => {
					createFile(null, 'folder', userId)
						.then((response) => {
							dispatch(addInList({ parentId: null, itemId: response.data.current.id }))
						})
				}} />
				<img src={folder2} alt="f2" onClick={() => {
					let folderId: number
					createFile(itemId, 'folder', userId)
						.then((response) => {
							folderId = response.data.current.id
							dispatch(addInList({ parentId: itemId, itemId: folderId }))
							createFile(folderId, 'file', userId)
								.then((response) => {
									dispatch(addInList({ parentId: folderId, itemId: response.data.current.id }))
								})
						})

				}} />
				<img src={doc} alt="doc" onClick={() => {
					createFile(itemId, 'folder', userId)
						.then((response) => { dispatch(addInList({ parentId: itemId, itemId: response.data.current.id })) })
				}} />
				<img src={trash} onClick={() => {
					deleteFile(itemId, userId)
						.then(() => { dispatch(deleteFromList(itemId)) })
				}} alt="img" />
			</div>
			: <div className={cn['levelIcons']}><img src={folder1} alt="folder" /></div>)
	}

	function ReturnFolders() {
		let amoutChildren = 0
		return child.map((e, index) => {
			const СonnectingLineSize = amoutChildren * 60 + 60
			amoutChildren = e.child.length
			return <Folder2
				СonnectingLineSize={СonnectingLineSize}
				key={e.id}
				itemId={e.id}
				nameOfWorks={e.rowName}
				salary={e.salary}
				equipment={e.equipmentCosts}
				overheadCosts={e.overheads}
				estimatedProfit={e.estimatedProfit}
				isEditing={e.isEditing}
				child={e.child} />
		}
		)
	}
	return (
		<>
			<div className={cn['FolderExplorer__item']}>

				<div onMouseEnter={() => { setIsHover(true) }}
					onMouseLeave={() => { setIsHover(false) }}
					className={cn['level']}>
					{Hover()}
				</div>
				{isEditing ?
					<input onChange={(e) => setInputValue(e.target.value)} className={cn['nameEdit']} value={inpValue} autoFocus type="text"
						onBlur={
							() => {
								updateFile(itemId, userId, inpValue)
								dispatch(setIsEditing({ id: itemId, editingStatus: false, newName: inpValue }))
							}

						}
						onKeyDown={handleKeyPress}
					/>
					: <div className={cn['nameOfWorks']}
						onDoubleClick={() => { dispatch(setIsEditing({ id: itemId, editingStatus: true, newName: '' })) }}
					>{nameOfWorks}</div>
				}
				<div className={cn['salary']}>{salary}</div>
				<div className={cn['equipment']}>{equipment}</div>
				<div className={cn['overheadCosts']}>{overheadCosts}</div>
				<div className={cn['estimatedProfit']}>{estimatedProfit}</div>
			</div>
			{ReturnFolders()}
		</>
	)
}
