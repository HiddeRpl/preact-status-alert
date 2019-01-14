import * as React from 'react'
import { StatusAlertContainer } from './status-alert-container'
import { Alert } from './status-alert-item'
import statusAlertStore, { Unsubscriber } from './status-alert-store'

export interface StatusAlertState {
  alerts: Alert[]
}

export class StatusAlert extends React.Component<{}, StatusAlertState> {
  // TODO: Unsubscriber
  private unsubscribeStore: any

  public constructor(props: {}) {
    super(props)

    this.state = {
      alerts: [],
    }
  }

  public componentDidMount() {
    this.unsubscribeStore = statusAlertStore.subscribe(this.addToStore)
  }

  public render() {
    return <StatusAlertContainer alerts={this.state.alerts}/>
  }

  public addToStore = () => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const state = statusAlertStore.getState()
      this.setState({ alerts: state })
    }))
  }
}
