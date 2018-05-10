import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import { HomeContainer } from './containers/home/Home'
import { LobbyContainer } from './containers/lobby/LobbyContainer'
import { GameContainer } from './containers/game/GameContainer'

function App() {
	const C = new Component()
	C.render = () => {
		return (
			<div>
				<Switch>
					<Route path="/" exact component={HomeContainer} />
					<Route path="/lobby" exact component={LobbyContainer} />
					<Route path="/:game" component={GameContainer} />
				</Switch>
			</div>
		)
	}
	return C
}

export default App
