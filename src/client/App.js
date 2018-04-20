import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import { HomeContainer } from './containers/home/Home'

function App() {
	const C = new Component()
	C.render = () => {
		return (
			<div>
				<Switch>
					<Route path="/" exact component={HomeContainer} />
				</Switch>
			</div>
		)
	}
	return C
}

export default App
