import React from 'react'
import ReactDOM from 'react-dom'
import './client/index.css'
import App from './client/App'
import registerServiceWorker from './client/registerServiceWorker'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'

import reducers from './client/reducers'
import setupSocket from './client/sockets'
import handleNewMessage from './client/sagas'
import username from './client/utils/username'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
	applyMiddleware(sagaMiddleware)
	// other store enhancers if any
)

export const store = createStore(reducers, enhancer)

// const socket = setupSocket(store.dispatch, username)

// sagaMiddleware.run(handleNewMessage, { socket, username })

ReactDOM.render(
	<Provider store={store}>
		<div className="container">
			<Router>
				<App />
			</Router>
		</div>
	</Provider>,
	document.getElementById('root')
)
registerServiceWorker()
