import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Route from 'react-router-dom/Route'
import './App.css'
// import { Sidebar } from './containers/Sidebar'
// import { MessagesList } from './containers/MessagesList'
// import { AddMessage } from './containers/AddMessage'
import Chat from './components/Chat'
import Home from './components/Home'

class App extends Component {
	render() {
		return (
			<Router>
				<div className="container">
					<Route path="/chat" exact component={Chat} />
					<Route path="/" exact component={Home} />
				</div>
			</Router>
		)
	}
}

export default App
