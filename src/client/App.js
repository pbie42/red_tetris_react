import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import { HomeContainer } from './containers/home/HomeContainer'
import { LobbyContainer } from './containers/lobby/LobbyContainer'
import { GameContainer } from './containers/game/GameContainer'
import { ErrorContainer } from './containers/error/ErrorContainer'

function App() {
	const C = new Component()
	C.render = () => {
		return (
			<div>
				<Switch>
					<Route path="/" exact component={HomeContainer} />
					<Route path="/lobby" exact component={LobbyContainer} />
					<Route path="/error" exact component={ErrorContainer} />
					<Route path="/:game" component={GameContainer} />
				</Switch>
			</div>
		)
	}
	return C
}

export default App
