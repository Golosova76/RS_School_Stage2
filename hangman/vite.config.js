import Inspect from 'vite-plugin-inspect';
import path from 'path';
// import { resolve } from 'path'; убрать path отсюда path.resolve(__dirname, 'src'),

export default {
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        // Например страница "about.html" в папке "src/html"
        about: path.resolve(__dirname, 'src/html/about.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@images': path.resolve(__dirname, 'src/assets/image'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@public': path.resolve(__dirname, 'public'),
      '@js': path.resolve(__dirname, 'src/js'),
    },
  },
  plugins: [Inspect()],
};
