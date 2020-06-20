import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const env = process.env.NODE_ENV;

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/vue3-composition-echarts.esm.js',
            format: 'es'
        },
        {
            file: 'dist/vue3-composition-echarts.cjs.js',
            format: 'cjs'
        },
        {
            file: 'dist/vue3-composition-echarts.umd.js',
            format: 'umd',
            name: 'vue3-composition-echarts',
            globals: {
                vue: 'vue',
                echarts: 'echarts'
            }
        }
    ],
    external: ['vue', 'echarts'],
    plugins: [
        typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
        commonjs(),
        env === 'production' && terser()
    ]
}