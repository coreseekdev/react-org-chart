const React = require('react')
const ReactDOM = require('react-dom')
const OrgChart = require('../react/org-chart')
const fakeData = require('../utils/fake-data')

const root = document.getElementById('root')
const tree = fakeData()

const props = {
  tree: {
    id: 1,
    person: {
      id: 1,
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg',
      department: '',
      name: 'Imelda Haley',
      title: 'CEO',
      totalReports: 5
    },
    hasChild: true,
    children: []
  },
  loadChildren: d => {
    // this could also just be `return tree.children`
    return Promise.resolve(tree.children)
  },
  lineType: 'curve'
}

ReactDOM.render(React.createElement(OrgChart, props, null), root)
