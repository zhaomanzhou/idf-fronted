// https://umijs.org/config/
import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
    hash: true,
    antd: {
        // dark: true,
    },
    dva: {
        immer: true,
        hmr: true,
    },
    history: {
        type: 'browser',
    },

    dynamicImport: {
        loading: '@/components/PageLoading/index',
    },
    targets: {
        ie: 11,
    },
    // umi routes: https://umijs.org/docs/routing
    routes,
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    // theme: {
    //     'primary-color': defaultSettings.primaryColor,
    // },
    title: 'IDoFast',
    ignoreMomentLocale: true,
    proxy: proxy[REACT_APP_ENV || 'dev'],
    manifest: {
        basePath: '/',
    },

    exportStatic: {},
    esbuild: {},
});
