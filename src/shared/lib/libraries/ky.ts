import ky from 'ky'

import { CONFIG } from '@shared/config'

const instance = ky.extend({
    prefixUrl: CONFIG.apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    hooks: {
        beforeRequest: [
            request => {
                const accessToken = localStorage.getItem('accessToken')
                request.headers.set('Authorization', `Bearer ${accessToken}`)
            },
        ],
        afterResponse: [
            async (request, _, response) => {
                if (
                    response.status === 401 &&
                    request &&
                    localStorage.getItem('refreshToken')
                ) {
                    // const isRefreshed = await refreshToken()
                    // if (isRefreshed) {
                    //     return ky(request)
                    // }
                }

                return response
            },
        ],
    },
})

export const HTTP = instance
