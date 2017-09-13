import { isUpper, normalizeCase } from '../utils'

const test = require('tape')

test('isUpper', t => {
	t.equal(isUpper('ooo'), false)
	t.equal(isUpper('OOO'), true)
	t.equal(isUpper('Thành'), false)
	t.equal(isUpper('THÀNH'), true)
	t.end()
})

test('normalizeCase', t => {
	t.throws(() => normalizeCase('nooo', 'nooooooooo'))
	t.equal(normalizeCase('', ''), '')
	t.equal(normalizeCase('NGUYEN', 'nguyễn'), 'NGUYỄN')
	t.equal(normalizeCase('thi', 'thị'), 'thị')
	t.equal(normalizeCase('ChUOi', 'chuối'), 'ChUỐi')
	t.equal(normalizeCase('CHieN', 'chiên'), 'CHiêN')
	t.end()
})
