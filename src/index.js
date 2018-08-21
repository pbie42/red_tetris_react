import React from 'react'
import ReactDOM from 'react-dom'
import './client/index.css'
import App from './client/App'
import registerServiceWorker from './client/registerServiceWorker'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { HashRouter } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'

import reducers from './client/reducers'
import setupSocket from './client/sockets'
import {
	handleGameAddLines,
	handleGameBoardUpdate,
	handleGameJoined,
	handleGameLobbyNewMessage,
	handleGameNewPiece,
	handleGameNewPieces,
	handleGameStart,
	handleMessageAdd,
	handleRoomAddition,
	handleRoomUserAddition,
	handleRoomUserRemoval,
	handleUserAddition,
	handleUserRemoval
} from './client/sagas'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
	applyMiddleware(sagaMiddleware)
	// other store enhancers if any
)

export const store = createStore(reducers, enhancer)

const socket = setupSocket(store.dispatch)

sagaMiddleware.run(handleGameAddLines, { socket })

sagaMiddleware.run(handleGameBoardUpdate, { socket })

sagaMiddleware.run(handleGameJoined, { socket })

sagaMiddleware.run(handleGameLobbyNewMessage, { socket })

sagaMiddleware.run(handleGameNewPiece, { socket })

sagaMiddleware.run(handleGameNewPieces, { socket })

sagaMiddleware.run(handleGameStart, { socket })

sagaMiddleware.run(handleMessageAdd, { socket })

sagaMiddleware.run(handleRoomAddition, { socket })

sagaMiddleware.run(handleRoomUserAddition, { socket })

sagaMiddleware.run(handleRoomUserRemoval, { socket })

sagaMiddleware.run(handleUserAddition, { socket })

sagaMiddleware.run(handleUserRemoval, { socket })

ReactDOM.render(
	<Provider store={store} saga={sagaMiddleware}>
		<div className="container">
			<HashRouter hashType="noslash">
				<App />
			</HashRouter>
		</div>
	</Provider>,
	document.getElementById('root')
)
registerServiceWorker()
