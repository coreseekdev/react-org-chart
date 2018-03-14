const faker = require('faker')

module.exports = function fakeData() {
  let count = 0

  const genData = ({ depth = 0, department = '' }) => {
    ++count

    const id = fakeId()
    const person = getPerson(id, { depth, department })

    if (depth > 6 || count >= 20000) {
      return { id, person, hasChild: false }
    }

    const { children, totalReports } = getChildren(
      { depth: depth + 1, department: department || person.department },
      genData
    )

    person.totalReports = totalReports

    return {
      id,
      person,
      hasChild: true,
      children
    }
  }

  const data = genData({})

  console.log('total nodes', count)

  return data
}

function fakeId() {
  return Math.floor(Math.random() * 300000)
}

function getPerson(id, { depth, department }) {
  return {
    id,
    avatar: faker.image.avatar(), // 'https://github.com/fouad.png',
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    title: depth > 0 ? faker.name.jobTitle() : 'CEO',
    department: depth > 0 ? department || getDept() : ''
  }
}

const depts = [
  'Engineering',
  'Product',
  'Communications',
  'Marketing',
  'HR',
  'Design'
]

function getDept() {
  const randIndex = Math.floor(depts.length * Math.random())

  return depts[randIndex]
}

function getChildren({ depth, department }, genData) {
  const length = Math.ceil(Math.random() * 6) + (4 - depth)

  if (length < 0) {
    return { totalReports: 0, children: [] }
  }

  return {
    totalReports: length,
    children: Array.apply(null, { length }).map(_ =>
      genData({ depth: depth + 1, department })
    )
  }
}
