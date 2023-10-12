import { type HTTPError } from 'ky'

import { ERROR_MESSAGES } from '@shared/api'

import { type NotificationsOptions, notify } from '@kyvg/vue3-notification'

export class Notify {
    static success(notification: NotificationsOptions): void {
        notify({ type: 'success', ...notification })
    }
    static warn(notification: NotificationsOptions): void {
        notify({ type: 'warn', ...notification })
    }
    static error(notification: NotificationsOptions): void {
        notify({ type: 'error', ...notification })
    }
    static httpError(error: HTTPError): void {
        notify({
            type: 'error',
            title: error.name,
            text: ERROR_MESSAGES[error.response?.status],
        })
    }
}
