import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CLASS_PREFIX, setStyles, setAttributes, createElementNS } from '../../configs'
import classnames from 'classnames'
import './index.styl'

/**
 * Spinner 样式
 * SPINNER_CLASS 基本样式
 * SPINNER_ROTATE 旋转样式
 * SPINNER_ENLARGE 放大样式
 */
const SPINNER_CLASS = CLASS_PREFIX + 'spinner'
const SPINNER_ROTATE = SPINNER_CLASS + '-rotate'
const SPINNER_ENLARGE = SPINNER_CLASS + '-enlarge'

class Spinner extends Component {
  constructor (props) {
    super(props)

    this.state = {
      width: null,
      height: null
    }
  }

  componentWillMount = () => {
    this.setRange()
  }

  componentDidMount = () => {
    this.draw()
  }

  componentWillReceiveProps = () => {
    this.setRange()
  }

  render () {
    const { rotate, enlarge } = this.props
    const { width, height } = this.state

    const styles = {
      width: `${width}px`,
      height: `${height}px`
    }

    const classes = classnames(SPINNER_CLASS, {
      [SPINNER_ROTATE]: rotate,
      [SPINNER_ENLARGE]: enlarge
    })
    return (
      <div className={classes} style={styles} ref='svg' />
    )
  }

  setRange = () => {
    let { width, height, radius, circleWidth } = this.props

    // 如果width和height 小于svg内容大小则自动修改
    const minLength = radius * 2 + circleWidth
    width = width < minLength ? minLength : width
    height = height < minLength ? minLength : height

    this.setState({
      width,
      height
    })
  }

  // 绘画
  draw = () => {
    let {
      radius,
      circleColor,
      circleWidth,
      backgroudColor,
      delay,
      value
    } = this.props

    const { width, height } = this.state

    // 指定cx,cy，默认居中
    const cx = width / 2
    const cy = height / 2

    let svgEl = createElementNS('svg')
    let upCircleEl = createElementNS('circle')

    // 设置svg属性
    setAttributes(svgEl, { width, height, viewbox: `0, 0, ${width}, ${height}` })

    // 设置显示圆属性
    setAttributes(upCircleEl, {
      r: radius,
      cx,
      cy,
      stroke: circleColor,
      'stroke-width': circleWidth,
      fill: 'transparent'
    })

    let PI = Math.PI
    let circumference = PI * radius * 2
    let offset = circumference * (1 - parseFloat(value))
    setStyles(upCircleEl, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
      transition: `all .45s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
      transform: 'rotate(-90deg)',
      transformOrigin: '50% 50%'
    })

    setTimeout(() => {
      setStyles(upCircleEl, {
        strokeDashoffset: offset,
        fill: backgroudColor
      })
    })

    svgEl.appendChild(upCircleEl)
    this.refs.svg.appendChild(svgEl)
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    radius: PropTypes.number,
    circleColor: PropTypes.string,
    circleWidth: PropTypes.number,
    backgroudColor: PropTypes.string,
    delay: PropTypes.number,
    value: PropTypes.number,
    rotate: PropTypes.bool,
    enlarge: PropTypes.bool
  }

  static defaultProps = {
    width: 18,
    height: 18,
    radius: 8,
    circleColor: '#f2913f',
    circleWidth: 2,
    backgroudColor: '#f2913f',
    delay: 375,
    value: 1,
    rotate: false,
    enlarge: false
  }
}

export default Spinner
