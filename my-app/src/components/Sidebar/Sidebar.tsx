import React from 'react'
import SidebarItem from './SidebarItem/SidebarItem'
import cn from './Sidebar.module.scss'

export default function Sidebar() {
	return (
		<div className={cn['sidebar']}>
			<div className={cn['sidebar__title']}>
				<span className={cn['projectName']}>Название проекта</span>
				<span className={cn['abbreviation']}>Аббревиатура</span>
				<div className={cn['arrow']}></div>
				{/* Кликабельная ли эта стрелочка? */}
			</div>
			<div className={cn['sidebar__items']}>
				<SidebarItem sectionName='По проекту' />
				<SidebarItem sectionName='Объекты' />
			</div>

		</div>
	)
}
