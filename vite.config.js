const { resolve } = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  root: resolve(__dirname, 'src/'),
  build: {
    outDir: '../build',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        form: resolve(__dirname, 'src/form.html'),
        about: resolve(__dirname, 'src/about.html'),
      }
    }
  }
})

