import React, { Component } from 'react'
import './main.styl'
import { TimeBox, Axis } from '../components'

class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      spinners: []
    }

    setTimeout(() => {
      this.setState({
        spinners: [1]
      })
    }, 1000)

    setTimeout(() => {
      this.setState({
        spinners: [1, 2]
      })
    }, 2000)

    setTimeout(() => {
      this.setState({
        spinners: [1, 2, 3]
      })
    }, 3000)

    setTimeout(() => {
      this.setState({
        spinners: [1, 2, 3, 4]
      })
    }, 4000)
  }

  render () {

    const { spinners } = this.state

    const colors = ['#99CCCC', '#FFCC99', '#FFCCCC', '#FFFF99', '#CCCCFF', '#FF9999']

    const spinnerEl = spinners.map((value) => {
      const spanTextTemp = '我是里程碑哦我是里程碑哦我是里程碑哦'
      let spanText = spanTextTemp
      for (let i = 1; i < value; i++) {
        spanText += spanTextTemp
      }
      const color = colors[value - 1]
      return (
        <TimeBox key={value} type={value % 2} color={color}>
          <span>{spanText}</span>
        </TimeBox>
      )
    })

    return (
      <div>
        <Axis>
          {spinnerEl}
        </Axis>
      </div>
    )
  }
}

export default Main
