import { default as React, RefObject } from 'react'
import { StatusAlertService } from './status-alert-service'

export interface Alert {
  id: string
  message: string
}

export interface StatusAlertItemProps {
  alert: Alert
}

export class StatusAlertItem extends React.PureComponent<StatusAlertItemProps, {}> {
  private statusAlert: RefObject<HTMLDivElement>

  public constructor(props: StatusAlertItemProps) {
    super(props)

    this.statusAlert = React.createRef()
  }

  public componentDidMount() {
    this.showAlert()
  }

  public render() {
    return (
      <div className="status-alert is-transparent is-hidden" ref={this.statusAlert}>
        <div className="status-alert__padding-wrapper">
          <div className="status-alert__box is-green-success">
            <div className="status-alert__icon-on-right-holder">
              <div className="status-alert__icon is-close-icon" onClick={this.removeAlert}/>
            </div>
            <div className="status-alert__icon-holder">
              <div className="status-alert__icon is-check"/>
            </div>
            <div className="status-alert__text">{this.props.alert.message}</div>
          </div>
        </div>
      </div>
    )
  }

  private showAlert = (): void => {
    if (this.statusAlert.current) {
      this.statusAlert.current.classList.remove('is-hidden')
      setTimeout(() => (
        this.statusAlert.current && this.statusAlert.current.classList.remove('is-transparent')
      ))
    }
  }

  private removeAlert = (): void => {
    if (this.statusAlert.current) {
      this.statusAlert.current.classList.add('is-transparent')
      this.statusAlert.current.addEventListener('transitionend', this.removeAlertTransitionSubmit)
      setTimeout(this.removeAlertCallbackSubmit, 1000)
    }
  }

  private removeAlertTransitionSubmit = (): void => {
    if (this.statusAlert.current) {
      this.statusAlert.current.removeEventListener('transitionend', this.removeAlertTransitionSubmit)
      this.removeAlertCallbackSubmit()
    }
  }

  private removeAlertCallbackSubmit = () => {
    if (this.statusAlert.current) {
      this.statusAlert.current.classList.remove('is-hidden')
      StatusAlertService.removeAlert(this.props.alert.id)
    }
  }
}
