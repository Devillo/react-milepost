import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { CLASS_PREFIX } from '../../configs'
import './index.styl'

/**
 * AXIS 样式
 * AXIS_CLASS 基本样式
 * AXIS_HORIZONTAL 横向样式
 * AXIS_LINE 增长线容器样式
 */
const AXIS_CLASS = CLASS_PREFIX + 'axis'
const AXIS_HORIZONTAL = AXIS_CLASS + '-horizontal'
const AXIS_LINE = AXIS_CLASS + '-line'

class Axis extends Component {
  constructor (props) {
    super(props)

    this.state = {
      height: 0,
      width: 200
    }
  }

  getChildContext = () => {
    return {
      horizontal: this.props.horizontal
    }
  }

  componentDidUpdate = () => {
    if (this.props.horizontal) return
    const lastHeight = this.refs.axis.querySelector('.et-time-box:last-child').clientHeight
    const defaultHeight = this.state.height
    const height = this.refs.axis.clientHeight - lastHeight
    if (defaultHeight !== height) {
      this.setState({
        height
      })
    }
  }

  render () {
    const { children, horizontal } = this.props
    const { height, width } = this.state

    const len = children.length - 1

    const axisClasses = classnames(AXIS_CLASS, {
      [AXIS_HORIZONTAL]: horizontal
    })

    const lineStyles = horizontal ? { width: `${width * len}px` } : { height: `${height}px` }

    return (
      <div className={axisClasses} ref='axis'>
        <span className={AXIS_LINE} style={lineStyles} />
        {children}
      </div>
    )
  }

  static propTypes = {
    children: PropTypes.node,
    horizontal: PropTypes.bool
  }

  static defaultProps = {
    horizontal: false
  }

  static childContextTypes = {
    horizontal: PropTypes.bool
  }
}

export default Axis
