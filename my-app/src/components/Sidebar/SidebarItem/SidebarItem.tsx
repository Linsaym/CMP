import React from 'react'
import block from './img/block.svg'
import cn from './SidebarItem.module.scss'

interface props {
	sectionName: string
}
export default function SidebarItem({ sectionName }: props) {
	return (
		<div className={cn['SidebarItem']}>
			<img src={block} alt='*' />
			<span>{sectionName}</span>
		</div >
	)
}
