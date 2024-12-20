import { Component, h, VNode } from 'preact'
import { alertIcon, boxClassName } from './status-alert-item-helpers'
import { StatusAlertService } from './status-alert-service'

export type AlertType = 'success' | 'error' | 'info' | 'warning'

export interface AlertOptions {
  autoHide?: boolean
  autoHideTime?: number
  withIcon?: boolean
  withCloseIcon?: boolean
  color?: string
  backgroundColor?: string
  removeAllBeforeShow?: boolean
}

export const defaultAlertOptions: AlertOptions = {
  autoHide: true,
  autoHideTime: 3500,
  withIcon: true,
  withCloseIcon: true,
  removeAllBeforeShow: true,
}

export type AlertMessage = JSX.Element | string | object | VNode

export interface Alert {
  id: string
  message: AlertMessage
  type: AlertType
  options: AlertOptions
}

export interface StatusAlertItemProps {
  alert: Alert
}

export class StatusAlertItem extends Component<StatusAlertItemProps, {}> {
  public statusAlert: any

  public componentDidMount() {
    this.showAlert()

    if (this.alertOptions.autoHide) {
      setTimeout(this.removeAlert, this.alertOptions.autoHideTime)
    }
  }

  public render() {
    return (
      <div className="status-alert is-transparent" ref={(statusAlert) => (this.statusAlert = statusAlert)}>
        <div className="status-alert__padding-wrapper">
          <div className={`status-alert__box ${this.boxClassName}`}>
            {this.alertOptions.withCloseIcon && (
              <div className="status-alert__icon-on-right-holder">
                <div
                  className={`status-alert__icon is-close-icon ${this.props.alert.type === 'warning' ? 'is-dark' : ''}`}
                  onClick={this.removeAlert}
                />
              </div>
            )}
            {this.alertOptions.withIcon && (
              <div className="status-alert__icon-holder">
                <div className={`status-alert__icon ${this.alertIcon}`} />
              </div>
            )}
            <div className="status-alert__text">{this.alertText}</div>
          </div>
        </div>
      </div>
    )
  }

  public showAlert = (): void => {
    if (this.statusAlert) {
      this.statusAlert.classList.add('is-transparent')
    }
    setTimeout(() => {
      if (this.statusAlert) {
        this.statusAlert.classList.remove('is-transparent')
      }
    })
  }

  public removeAlert = async (): Promise<void> => {
    if (this.statusAlert) {
      this.statusAlert.classList.add('is-transparent')
      await setTimeout(this.removeAlertCallbackSubmit, 800)
    }
  }

  public removeAlertCallbackSubmit = (): void => StatusAlertService.removeAlert(this.props.alert.id)

  get boxClassName(): string {
    return boxClassName(this.props.alert.type)
  }

  get alertOptions(): AlertOptions {
    return { ...defaultAlertOptions, ...this.props.alert.options }
  }

  get alertIcon(): string {
    return alertIcon(this.props.alert.type)
  }

  get alertText(): AlertMessage {
    if (typeof this.props.alert.message === 'object' && !(this.props.alert.message as VNode).nodeName) {
      return JSON.stringify(this.props.alert.message)
    }
    return this.props.alert.message
  }
}
