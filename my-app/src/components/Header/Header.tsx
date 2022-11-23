import React from 'react'
import cn from './Header.module.scss'
import cube from './img/cube.svg'
import share from './img/share.svg'

export default function Header() {
	return (
		<header className={cn['header']}>
			<div className={cn['btns']}>
				<img src={cube} alt='cube' className={cn['cube']} onClick={() => { alert('This button is not functioning yet') }} />
				<img src={share} alt='share' className={cn['share']} onClick={() => { alert('This button is not functioning yet') }} />
			</div>
			<ul className={cn['links']}>
				<li className={cn['activeLink']}>Просмотр</li>
				<li className={cn['notActiveLink']}>Управление</li>
			</ul>
		</header>
	)
}
