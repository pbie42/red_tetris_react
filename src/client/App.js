import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import { HomeContainer } from './containers/home/Home'
import LobbyComponent from './components/lobby/Lobby'

function App() {
	const C = new Component()
	C.render = () => {
		return (
			<div>
				<Switch>
					<Route path="/" exact component={HomeContainer} />
					<Route path="/lobby" exact component={LobbyComponent} />
				</Switch>
			</div>
		)
	}
	return C
}

export default App
