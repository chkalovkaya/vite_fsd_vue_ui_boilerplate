import { createRouter, createWebHistory } from 'vue-router'

import { CONFIG } from '@shared/config'

let routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@pages/home').then(module => module.HomePage),
    },
    {
        path: '/:catchAll(.*)*',
        name: 'Error',
        component: () =>
            import('@pages/error').then(module => module.ErrorPage),
        props: {
            errorCode: 404,
            message: '404 - Страница не найдена',
        },
    },
    {
        path: '/401',
        name: 'Error Access',
        component: () =>
            import('@pages/error').then(module => module.ErrorPage),
        props: {
            errorCode: 401,
            message:
                '401 - Вы не авторизованы! Пожалуйста войдите в свой аккаунт',
        },
    },
]

const envMode = import.meta.env.MODE
if (envMode === 'development') {
    routes = [
        ...routes,
        {
            path: '/uikit',
            name: 'UiKit',
            component: () =>
                import('@pages/uikit').then(module => module.UiKitPage),
        },
    ]
}

export const router = createRouter({
    history: createWebHistory(CONFIG.baseUrl),
    routes,
})
