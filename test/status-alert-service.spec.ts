import { StatusAlertService } from '../lib'
import { AlertOptions, defaultAlertOptions } from '../lib/status-alert-item'
import statusAlertStore from '../lib/status-alert-store'

describe('status-alert-store', () => {
  it('should showSuccess trigger showAlert', () => {
    const showAlertSpy = jest.spyOn(StatusAlertService, 'showAlert')

    const message = 'test message'
    const options: AlertOptions = { autoHide: true }
    StatusAlertService.showSuccess(message)

    expect(showAlertSpy).toHaveBeenCalled()
    expect(showAlertSpy).toHaveBeenCalledWith(message, 'success', defaultAlertOptions)

    showAlertSpy.mockReset()

    StatusAlertService.showSuccess(message, options)

    expect(showAlertSpy).toHaveBeenCalled()
    expect(showAlertSpy).toHaveBeenCalledWith(message, 'success', {
      ...defaultAlertOptions,
      ...options,
    })

    showAlertSpy.mockRestore()
  })

  it('should showError trigger showAlert', () => {
    const showAlertSpy = jest.spyOn(StatusAlertService, 'showAlert')

    const message = 'test message'
    const options: AlertOptions = { autoHide: true }
    StatusAlertService.showError(message)

    expect(showAlertSpy).toHaveBeenCalled()
    expect(showAlertSpy).toHaveBeenCalledWith(message, 'error', defaultAlertOptions)

    showAlertSpy.mockReset()

    StatusAlertService.showError(message, options)

    expect(showAlertSpy).toHaveBeenCalled()
    expect(showAlertSpy).toHaveBeenCalledWith(message, 'error', {
      ...defaultAlertOptions,
      ...options,
    })

    showAlertSpy.mockRestore()
  })

  it('should showInfo trigger showAlert', () => {
    const showAlertSpy = jest.spyOn(StatusAlertService, 'showAlert')

    const message = 'test message'
    const options: AlertOptions = { autoHide: true }
    StatusAlertService.showInfo(message)

    expect(showAlertSpy).toHaveBeenCalled()
    expect(showAlertSpy).toHaveBeenCalledWith(message, 'info', defaultAlertOptions)

    showAlertSpy.mockReset()

    StatusAlertService.showInfo(message, options)

    expect(showAlertSpy).toHaveBeenCalled()
    expect(showAlertSpy).toHaveBeenCalledWith(message, 'info', {
      ...defaultAlertOptions,
      ...options,
    })

    showAlertSpy.mockRestore()
  })

  it('should showWarning trigger showAlert', () => {
    const showAlertSpy = jest.spyOn(StatusAlertService, 'showAlert')

    const message = 'test message'
    const options: AlertOptions = { autoHide: true }
    StatusAlertService.showWarning(message)

    expect(showAlertSpy).toHaveBeenCalled()
    expect(showAlertSpy).toHaveBeenCalledWith(message, 'warning', defaultAlertOptions)

    showAlertSpy.mockReset()

    StatusAlertService.showWarning(message, options)

    expect(showAlertSpy).toHaveBeenCalled()
    expect(showAlertSpy).toHaveBeenCalledWith(message, 'warning', {
      ...defaultAlertOptions,
      ...options,
    })

    showAlertSpy.mockRestore()
  })

  it('should removeAlert', () => {
    const alertId = StatusAlertService.showWarning('message')

    const dispatchSpy = jest.spyOn(statusAlertStore, 'dispatch')

    StatusAlertService.removeAlert(alertId)

    expect(dispatchSpy).toHaveBeenCalled()
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: expect.any(String),
      payload: alertId,
    })

    dispatchSpy.mockRestore()
  })
})
