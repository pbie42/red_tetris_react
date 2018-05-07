import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import { HomeContainer } from './containers/home/Home'
import { LobbyContainer } from './containers/lobby/LobbyContainer'

function App() {
	const C = new Component()
	C.render = () => {
		return (
			<div>
				<Switch>
					<Route path="/" exact component={HomeContainer} />
					<Route path="/lobby" exact component={LobbyContainer} />
				</Switch>
			</div>
		)
	}
	return C
}

export default App
