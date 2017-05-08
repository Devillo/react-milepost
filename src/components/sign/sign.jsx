import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { CLASS_PREFIX, setStyles, setAttributes, createElementNS } from '../../configs'
import './index.styl'

/**
 * Sign 样式
 * SIGN_CLASS 基本样式
 * SIGN_HORIZONTAL 水平样式
 */
const SIGN_CLASS = CLASS_PREFIX + 'sign'
const SIGN_HORIZONTAL = SIGN_CLASS + '-horizontal'

class Sign extends Component {
  constructor (props, context) {
    super(props, context)

    const { horizontal } = context

    if (horizontal) {
      this.state = {
        width: 20,
        height: 400
      }
    } else {
      this.state = {
        width: 400,
        height: 20
      }
    }
  }

  componentDidMount = () => {
    this.draw()
  }

  render () {
    const { horizontal } = this.context

    const signClasses = classnames(SIGN_CLASS, {
      [SIGN_HORIZONTAL]: horizontal
    })
    return (
      <div className={signClasses} ref='svg' />
    )
  }

  draw = () => {
    const { lineColor, lineWidth, delay, type } = this.props
    const { width, height } = this.state

    const { horizontal } = this.context
    console.log(horizontal)

    let svgEl = createElementNS('svg')
    let lineEl = createElementNS('path')

    // 设置svg属性
    setAttributes(svgEl, { width, height, viewbox: `0, 0, ${width}, ${height}` })

    // 设置直线属性
    let d
    if (!horizontal) {
      d = type === 0 ? 'M200 8 L100 8 T 70 8 20 20' : 'M200 8 L300 8 T 330 8 380 20'
    } else {
      d = type === 0 ? 'M8 200 L8 100 T 8 70 20 20' : 'M8 200 L8 300 T 8 330 20 380'
    }
    setAttributes(lineEl, {
      d: d,
      stroke: lineColor,
      'stroke-width': lineWidth,
      fill: 'none'
    })

    setStyles(lineEl, {
      strokeDasharray: 200,
      strokeDashoffset: 200,
      transition: `all .45s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
      transformOrigin: '50% 50%'
    })

    setTimeout(() => {
      setStyles(lineEl, {
        strokeDashoffset: 0
      })
    })

    svgEl.appendChild(lineEl)
    this.refs.svg.appendChild(svgEl)

  }

  static propTypes = {
    lineColor: PropTypes.string,
    lineWidth: PropTypes.number,
    delay: PropTypes.number,
    type: PropTypes.number
  }

  static defaultProps = {
    lineColor: '#f2913f',
    lineWidth: 2,
    delay: 800,
    type: 1
  }

  static contextTypes = {
    horizontal: PropTypes.bool
  }
}

export default Sign
