const fakeData = require('../utils/fake-data')
const { init } = require('../chart')
const data = fakeData()

init({ id: '#body', data, lineType: 'angle' })
