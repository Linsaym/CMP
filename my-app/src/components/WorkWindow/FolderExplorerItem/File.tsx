import React, { useState } from 'react'
import cn from './FolderExplorerItem.module.scss'
import folder2 from './img/FolderIcon2.svg'
import doc from './img/doc.svg'
import trash from './img/TrashFill.svg'
import { createFile, deleteFile, updateFile } from '../../../API/api';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { deleteFromList, setIsEditing } from '../../../redux/reducers/FolderExplorer/FolderExplorerSlice';

interface props {
	itemId: number
	nameOfWorks: string
	salary: number
	equipment: number
	overheadCosts: number
	estimatedProfit: number
	isEditing: boolean
	index: number
}


export default function File({ nameOfWorks, salary, equipment, overheadCosts, estimatedProfit, itemId, isEditing, index }: props) {
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
			<div className={cn['levelIconsEdit2']}>
				<img src={doc} alt="doc" />
				<img src={trash} onClick={() => {
					deleteFile(itemId, userId)
						.then(() => { dispatch(deleteFromList(itemId)) })
				}} alt="img" />
			</div>
			:
			<div className={cn['levelIcons2']}><img src={doc} alt="folder" /></div>)
	}

	return (
		<>
			<div className={cn['FolderExplorer__item']}>

				<div onMouseEnter={() => { setIsHover(true) }}
					onMouseLeave={() => { setIsHover(false) }}
					className={cn['level']}>
					{Hover()}
				</div>
				<div className={cn['inheritanceMarkFile']} style={{ height: `${56 + index * 5}px`, top: `-${25 + index * 5}px` }}></div>
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
		</>
	)
}
