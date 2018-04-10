import React, { Component } from 'react'
import Route from 'react-router-dom/Route'
import './App.css'
// import { Sidebar } from './containers/Sidebar'
// import { MessagesList } from './containers/MessagesList'
// import { AddMessage } from './containers/AddMessage'
import Chat from './components/Chat'
import Home from './components/home/Home'

function App(props) {
	const C = new Component()
	C.render = () => {
		return (
			<div className="container">
				<Route path="/" exact component={Home} />
				<Route path="/chat" exact component={Chat} />
			</div>
		)
	}
	return C
}

export default App
