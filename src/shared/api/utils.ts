import { type HTTPError, type ResponsePromise } from 'ky'

import { Notify } from '@shared/ui'

export const useApi = async (request: () => ResponsePromise) => {
    try {
        const response = await request()
        return response
    } catch (error) {
        Notify.httpError(error as HTTPError)
        throw error
    }
}
