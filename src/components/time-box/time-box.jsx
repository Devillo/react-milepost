import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { CLASS_PREFIX } from '../../configs'
import { Spinner, Sign } from '../index'
import './index.styl'

/**
 * TimeBox 样式
 * TIME_BOX_CLASS 基本样式
 * TIME_BOX_HORIZONTAL 水平样式
 * TIME_BOX_CLASS_CONTENT 包含样式
 * TIME_BOX_INNER 内容样式
 * TIME_BOX_INNER_LEFT 内容左样式
 * TIME_BOX_INNER_RIGHT 内容右样式
 * TIME_BOX_INNER_TOP 内容上样式
 * TIME_BOX_INNER_BOTTOM 内容下样式
 * TIME_BOX_INNER_HIDDEN 内容隐藏样式
 */
const TIME_BOX_CLASS = CLASS_PREFIX + 'time-box'
const TIME_BOX_HORIZONTAL = TIME_BOX_CLASS + '-horizontal'
const TIME_BOX_CLASS_CONTENT = TIME_BOX_CLASS + '-content'
const TIME_BOX_INNER = TIME_BOX_CLASS + '-inner'
const TIME_BOX_INNER_LEFT = TIME_BOX_INNER + '-left'
const TIME_BOX_INNER_RIGHT = TIME_BOX_INNER + '-right'
const TIME_BOX_INNER_TOP = TIME_BOX_INNER + '-top'
const TIME_BOX_INNER_BOTTOM = TIME_BOX_INNER + '-bottom'
const TIME_BOX_INNER_HIDDEN = TIME_BOX_INNER + '-hidden'

class TimeBox extends Component {
  constructor (props) {
    super(props)

    this.state = {
      show: false
    }
  }

  componentDidMount = () => {
    this.timeInstance = setTimeout(() => {
      this.setState({
        show: true
      })
    }, 1200)
  }

  componentWillUnMount = () => {
    clearTimeout(this.timeInstance)
  }

  render () {
    const { show } = this.state
    const { type, color, children } = this.props

    const { horizontal } = this.context

    const boxClasses = classnames(TIME_BOX_CLASS, {
      [TIME_BOX_HORIZONTAL]: horizontal
    })

    const innerClasses = classnames(TIME_BOX_INNER, {
      [TIME_BOX_INNER_LEFT]: type === 0 && !horizontal,
      [TIME_BOX_INNER_RIGHT]: type === 1 && !horizontal,
      [TIME_BOX_INNER_TOP]: type === 0 && horizontal,
      [TIME_BOX_INNER_BOTTOM]: type === 1 && horizontal,
      [TIME_BOX_INNER_HIDDEN]: !show
    })

    const innerStyles = {
      color: color
    }

    return (
      <div className={boxClasses}>
        <Spinner circleColor={color} backgroudColor={color} />
        <div className={TIME_BOX_CLASS_CONTENT}>
          <Sign type={type} lineColor={color} />
          <div className={innerClasses} style={innerStyles}>{children}</div>
        </div>
      </div>
    )
  }

  static propTypes = {
    type: PropTypes.number,
    color: PropTypes.string,
    children: PropTypes.node
  }

  static defaultProps = {
    type: 1
  }

  static contextTypes = {
    horizontal: PropTypes.bool
  }
}

export default TimeBox
