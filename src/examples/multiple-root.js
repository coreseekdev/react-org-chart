const fakeData = require('../utils/fake-data')
const { init } = require('../chart')
const { children } = fakeData()

init({ id: '#root', data: { children }, lineType: 'angle' })
