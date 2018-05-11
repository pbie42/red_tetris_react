import * as types from '../constants/ActionTypes'

export const errorUsernameTaken = username => ({
	type: types.USERNAME_TAKEN,
	username
})
