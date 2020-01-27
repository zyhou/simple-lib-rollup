import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const cjs = [
    {
        input: 'src/index.js',
        output: {
            file: `cjs/${pkg.name}.js`,
            sourcemap: true,
            format: 'cjs',
            esModule: false,
        },
        plugins: [babel({ exclude: /node_modules/, sourceMaps: true })],
    },
    {
        input: 'modules/index.js',
        output: { file: `cjs/${pkg.name}.min.js`, sourcemap: true, format: 'cjs' },
        plugins: [babel({ exclude: /node_modules/, sourceMaps: true }), terser()],
    },
];

const umd = [
    {
        input: 'src/index.js',
        output: {
            name: 'sayHello',
            file: pkg.browser,
            format: 'umd',
        },
        plugins: [resolve(), commonjs()],
    },
];

const esm = [
    {
        input: 'src/index.js',
        output: { file: pkg.module, format: 'es' },
    },
];

export default cjs.concat(esm).concat(umd);
