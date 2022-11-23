import React, { useState } from 'react'
import cn from './FolderExplorerItem.module.scss'
import folder2 from './img/FolderIcon2.svg'
import doc from './img/doc.svg'
import trash from './img/TrashFill.svg'
import { createFile, deleteFile, updateFile } from '../../../API/api';
import { useAppDispatch } from '../../../redux/hooks'
import { deleteFromList, addInList, setIsEditing } from '../../../redux/reducers/FolderExplorer/FolderExplorerSlice';
import File from './File'

interface props {
	itemId: number
	nameOfWorks: string
	salary: number
	equipment: number
	overheadCosts: number
	estimatedProfit: number
	isEditing: boolean
	child: any[]
	СonnectingLineSize: number
}


export default function Folder2({ nameOfWorks, salary, equipment, overheadCosts, estimatedProfit, itemId, isEditing, child, СonnectingLineSize }: props) {
	const userId = Number(localStorage.getItem('id'))
	const dispatch = useAppDispatch()
	const [isHover, setIsHover] = useState(false)
	const [inpValue, setInputValue] = useState(nameOfWorks)
	const [type, setType] = useState('folder')

	function handleKeyPress(event: any) {
		if (event.key === 'Enter') {
			updateFile(itemId, userId, inpValue)
			dispatch(setIsEditing({ id: itemId, editingStatus: false, newName: inpValue }))
		}
	}
	function Hover() {
		if (child.length > 0) {
			return (isHover ?
				<div className={cn['levelIconsEdit1']}>
					<img src={folder2} alt="f2" onClick={() => {
						createFile(itemId, 'folder', userId)
							.then((response) => {
								const parentId = response.data.current.id
								createFile(parentId, 'file', userId)
							})
					}} />
					<img src={doc} alt="doc" onClick={() => {
						createFile(itemId, 'file', userId)
							.then((response) => {
								dispatch(addInList({ parentId: itemId, itemId: response.data.current.id }))
							})
					}} />
					<img src={trash} onClick={() => {
						deleteFile(itemId, userId)
							.then(() => { dispatch(deleteFromList(itemId)) })
					}} alt="img" />

				</div>
				:
				<div className={cn['levelIcons1']}><img src={folder2} alt="folder" /></div>)
		} else {
			return (isHover ?
				<div className={cn['levelIconsEdit1']}>
					<img src={doc} alt="doc" />
					<img src={trash} onClick={() => {
						deleteFile(itemId, userId)
							.then(() => { dispatch(deleteFromList(itemId)) })
					}} alt="img" />

				</div>
				:
				<div className={cn['levelIcons1']}><img src={doc} alt="doc" /></div>)
		}

	}

	return (
		<>
			<div className={cn['FolderExplorer__item']}>

				<div onMouseEnter={() => { setIsHover(true) }}
					onMouseLeave={() => { setIsHover(false) }}
					className={cn['level']}>
					{Hover()}
				</div>
				<div className={cn['inheritanceMark']} style={{ height: `${СonnectingLineSize}px`, top: `-${СonnectingLineSize - 30}px` }}></div>
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
			{child.map((e, index) => <File
				index={index}
				key={e.id}
				itemId={e.id}
				nameOfWorks={e.rowName}
				salary={e.salary}
				equipment={e.equipmentCosts}
				overheadCosts={e.overheads}
				estimatedProfit={e.estimatedProfit}
				isEditing={e.isEditing}
			/>)}
		</>
	)
}
