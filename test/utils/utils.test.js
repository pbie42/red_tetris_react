import { expect } from 'chai'
import {
	verifyMemberCount,
	verifyMembers,
	verifyRoomName,
	verifyUsername,
	verifyUrl,
	parseUrl
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
	describe('verifyMemberCount', () => {
		const rooms = [
			{ roomName: 'Danger Room', members: ['john', 'paul', 'george', 'ringo'] },
			{
				roomName: 'Mee Room',
				members: ['Oliver', 'Jen', 'Alex', 'Juliana', 'Nick', 'Josie']
			},
			{
				roomName: 'Boys Room',
				members: ['Dan', 'Yohann', 'Armon', 'Paul', 'Thomas']
			}
		]
		it('returns true if there are less than 5 members in a room', () => {
			const result = verifyMemberCount(rooms, 'Danger Room')
			expect(result).to.be.true
		})
		it('returns false if there are 5 or more members in a room', () => {
			const result1 = verifyMemberCount(rooms, 'Mee Room')
			const result2 = verifyMemberCount(rooms, 'Boys Room')
			expect(result1).to.be.false
			expect(result2).to.be.false
		})
	})

	describe('verifyMembers', () => {
		const username1 = 'nick'
		const username2 = 'paul'
		const rooms = [
			{ roomName: 'Danger Room', members: ['john', 'paul', 'george', 'ringo'] }
		]
		it('returns true if there is no member with same name', () => {
			const result = verifyMembers(username1, 'Danger Room', rooms)
			expect(result).to.be.true
		})
		it('returns false if there is already a member with same name', () => {
			const result = verifyMembers(username2, 'Danger Room', rooms)
			expect(result).to.be.false
		})
	})

	describe('verifyRoomName', () => {
		const rooms = [
			{ roomName: 'Danger Room', members: ['john', 'paul', 'george', 'ringo'] }
		]
		it('returns true if there is no room with same name', () => {
			const result = verifyRoomName('Cool Room', rooms)
			expect(result).to.be.true
		})
		it('returns false if there is already a room with same name', () => {
			const result = verifyRoomName('Danger Room', rooms)
			expect(result).to.be.false
		})
	})

	describe('verifyUsername', () => {
		const users = [{ name: 'paul', id: 0 }, { name: 'jen', id: 1 }]
		it('returns true if there is no user with same name', () => {
			const result = verifyUsername('rick', users)
			expect(result).to.be.true
		})
		it('returns false if there is already a user with same name', () => {
			const result = verifyUsername('paul', users)
			expect(result).to.be.false
		})
	})

	describe('verifyUrl', () => {
		const urlGood = 'Todd_Room[Todd_Man]'
		const urlBad1 = 'Todd_RoomTodd_Man]'
		const urlBad2 = 'Todd_Room[Todd_Man'
		const urlBad3 = 'Todd_Room[Todd_Man]hello'
		let result

		describe('verifies the structure of the join game url', () => {
			it('returns false if missing "["', () => {
				result = verifyUrl(urlBad1)
				expect(result).to.be.false
			})
			it('returns false if missing "]"', () => {
				result = verifyUrl(urlBad2)
				expect(result).to.be.false
			})
			it('returns false if url does not end with "]"', () => {
				result = verifyUrl(urlBad3)
				expect(result).to.be.false
			})
			it('returns true if all criteria met', () => {
				let test = verifyUrl(urlGood)
				expect(test).to.be.true
			})
		})
	})
})
