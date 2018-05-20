import * as types from '../constants/ActionTypes'

export const errorUsernameTaken = username => ({
	type: types.ERROR_USERNAME_TAKEN,
	username
})

export const errorTooManyMembers = () => ({
	type: types.ERROR_TOO_MANY_MEMBERS
})
