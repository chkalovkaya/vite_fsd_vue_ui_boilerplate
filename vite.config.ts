import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [vue({ script: { defineModel: true } })],
        base: env.VITE_BASE_URL,
        resolve: {
            alias: [
                { find: '@app', replacement: '/src/app' },
                { find: '@entities', replacement: '/src/entities' },
                { find: '@features', replacement: '/src/features' },
                { find: '@pages', replacement: '/src/pages' },
                { find: '@processes', replacement: '/src/processes' },
                { find: '@widgets', replacement: '/src/widgets' },
                { find: '@shared', replacement: '/src/shared' },
            ],
        },
        build: {
            target: 'esnext',
            outDir: 'dist',
            sourcemap: false,
            minify: 'terser',
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: [
                            'ky',
                            'vue',
                            'vue-router',
                            'pinia',
                            '@kyvg/vue3-notification',
                        ],
                        sharedConfig: ['/src/shared/config'],
                        sharedApi: ['/src/shared/api'],
                        sharedUi: ['/src/shared/ui'],
                    },
                },
            },
        },
        server: {
            host: true,
            port: 80,
            proxy: {
                [env.VITE_API_URL]: {
                    target: env.VITE_BACKEND_URL,
                    changeOrigin: true,
                    secure: true,
                    rewrite: path => path.replace(env.VITE_API_URL, ''),
                },
            },
        },
        css: {
            preprocessorOptions: {
                sass: {
                    additionalData: `
                        @import "@app/styles/vars.sass"
                    `,
                },
            },
        },
    }
})
