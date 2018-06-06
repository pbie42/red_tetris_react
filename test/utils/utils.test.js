import { expect } from 'chai'
import {
	roomAddUser,
	parseUrl,
	roomRemoveUser,
	verifyMemberCount,
	verifyMembers,
	verifyRoomName,
	verifyUrl,
	verifyUsername
} from '../../src/client/utils'

describe('Utils', () => {
	describe('parseUrl', () => {
		it('returns room and player strings with proper spacing from game creation url', () => {
			const url = 'Todd_Room[Todd_Man]'
			const { room, player } = parseUrl(url)
			expect(room).to.equal('Todd Room')
			expect(player).to.equal('Todd Man')
		})

		it('parses all variations of strings', () => {
			let url1 = 'Todd_Room[Todd_Man]'
			let url2 = 'Todd_RoomTodd_Man]'
			let url3 = 'Todd_RoomTodd_Man'
			let url4 = 'Todd_Room[Todd_Man'
			let parsed = parseUrl(url1)
			expect(parsed.room).to.equal('Todd Room')
			expect(parsed.player).to.equal('Todd Man')
			parsed = parseUrl(url2)
			expect(parsed.room).to.equal('Todd RoomTodd Man')
			expect(parsed.player).to.equal('')
			parsed = parseUrl(url3)
			expect(parsed.room).to.equal('Todd RoomTodd Man')
			expect(parsed.player).to.equal('')
			parsed = parseUrl(url1)
			expect(parsed.room).to.equal('Todd Room')
			expect(parsed.player).to.equal('Todd Man')
		})
	})

	describe('roomAddUser', () => {
		it('returns new rooms array after adding user to desired room', () => {
			const username = 'pbie'
			const roomName = 'Todd Room'
			let rooms = [
				{ roomName: 'Todd Room', members: ['toddster'] },
				{ roomName: 'Danger Room', members: ['wolverine', 'cyclops'] }
			]
			rooms = roomAddUser(username, roomName, rooms)
			expect(rooms[0].members).to.eql(['toddster', 'pbie'])
		})

		it('returns unchanged rooms array if user already exists in specified room', () => {
			const username = 'wolverine'
			const roomName = 'Danger Room'
			let rooms = [
				{ roomName: 'Todd Room', members: ['pbie', 'toddster'] },
				{ roomName: 'Danger Room', members: ['wolverine', 'cyclops'] }
			]
			rooms = roomAddUser(username, roomName, rooms)
			expect(rooms[1].members).to.eql(['wolverine', 'cyclops'])
		})

		it('returns unchanged rooms array if specified room does not exist', () => {
			const username = 'mario'
			const roomName = 'Mushroom Room'
			let rooms = [
				{ roomName: 'Todd Room', members: ['pbie', 'toddster'] },
				{ roomName: 'Danger Room', members: ['wolverine', 'cyclops'] }
			]
			rooms = roomAddUser(username, roomName, rooms)
			expect(rooms[0].members).to.eql(['pbie', 'toddster'])
			expect(rooms[1].members).to.eql(['wolverine', 'cyclops'])
		})
	})

	describe('roomRemoveUser', () => {
		it('returns new rooms array after removing user from desired room', () => {
			const username = 'pbie'
			const roomName = 'Todd Room'
			let rooms = [
				{ roomName: 'Todd Room', members: ['pbie', 'toddster'] },
				{ roomName: 'Danger Room', members: ['wolverine', 'cyclops'] }
			]
			rooms = roomRemoveUser(username, roomName, rooms)
			expect(rooms[0].members).to.eql(['toddster'])
		})

		it('returns unchanged rooms array if user does not exist in specified room', () => {
			const username = 'storm'
			const roomName = 'Danger Room'
			let rooms = [
				{ roomName: 'Todd Room', members: ['pbie', 'toddster'] },
				{ roomName: 'Danger Room', members: ['wolverine', 'cyclops'] }
			]
			rooms = roomRemoveUser(username, roomName, rooms)
			expect(rooms[1].members).to.eql(['wolverine', 'cyclops'])
		})

		it('returns unchanged rooms array if specified room does not exist', () => {
			const username = 'mario'
			const roomName = 'Mushroom Room'
			let rooms = [
				{ roomName: 'Todd Room', members: ['pbie', 'toddster'] },
				{ roomName: 'Danger Room', members: ['wolverine', 'cyclops'] }
			]
			rooms = roomRemoveUser(username, roomName, rooms)
			expect(rooms[0].members).to.eql(['pbie', 'toddster'])
			expect(rooms[1].members).to.eql(['wolverine', 'cyclops'])
		})
	})
})
