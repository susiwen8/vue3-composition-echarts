import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/vue3-echarts.esm.js',
            format: 'es'
        },
        {
            file: 'dist/vue3-echarts.cjs.js',
            format: 'cjs'
        },
        {
            file: 'dist/vue3-echarts.umd.js',
            format: 'umd',
            name: 'vue3-echarts',
            globals: {
                vue: 'vue',
                echarts: 'echarts'
            }
        }
    ],
    external: ['vue', 'echarts'],
    plugins: [
        typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
        commonjs()
    ],
}