import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onClickDecrementInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onClickIncrementInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onClickStartOrPause = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {
      timeElapsedInSeconds,
      timerLimitInMinutes,
      isTimerRunning,
    } = this.state

    const isButtonDisabled = timeElapsedInSeconds > 0

    const timerStatus = isTimerRunning ? 'Running' : 'Paused'
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="responsive-container">
          <div className="time-container">
            <div className="timer-container">
              <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="timer-status">{timerStatus}</p>
            </div>
          </div>
          <div className="timer-controls-container">
            <div className="start-reset-container">
              <button
                className="button"
                type="button"
                onClick={this.onClickStartOrPause}
              >
                <img
                  src={startOrPauseImgUrl}
                  alt={startOrPauseAltText}
                  className="icon"
                />
                <p className="controls-text">
                  {isTimerRunning ? 'Pause' : 'Start'}
                </p>
              </button>

              <button
                className="button"
                type="button"
                onClick={this.onResetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  className="icon"
                  alt="reset icon"
                />
                <p className="controls-text">Reset</p>
              </button>
            </div>
            <p className="instruction">Set Timer Limit</p>
            <div className="buttons-container">
              <button
                className="decrement-button"
                type="button"
                disabled={isButtonDisabled}
                onClick={this.onClickDecrementInMinutes}
              >
                -
              </button>
              <p className="timer-count">{timerLimitInMinutes}</p>
              <button
                className="increment-button"
                type="button"
                disabled={isButtonDisabled}
                onClick={this.onClickIncrementInMinutes}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
