import React from 'react'
import  logo from '../../assets/images/logo/logo.png';
import '../../assets/styles/homeSiderBar.css'
function SideBar() {
  return (

	<div className="side_bar_content">
		<div className="nav_brand">
			<img src={logo} alt="brand"  />
		</div>
		<div className="try_editor">
			<p>Try Our Online Editor</p>
		</div>
		<div className="animated_button">
			<a href="/coding" className="animated_coding_link">Start Coding</a>
		</div>
		<div className="side_bar_menu">
			<ul>
				<li className="side_bar_menu_item"><a href="/search" className="side_bar_menu_link">Search Pens</a></li>
				<li className="side_bar_menu_item"><a href="/codingEditor" className="side_bar_menu_link">Challenges</a></li>
				<li className="side_bar_menu_item"><a href="/sparks" className="side_bar_menu_link">Sparks</a></li>
			</ul>
		</div>
		
	</div>
		

  )
}

export default SideBar
