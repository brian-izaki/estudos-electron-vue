module.exports = {
  configureWebpack: {
    // Webpack configuration applied to web builds and the electron renderer process
  },
  pluginOptions: {
    electronBuilder: {
      // Use this to change the entrypoint of your app's main process
      mainProcessFile: "src-electron/background.ts",
      // Use this to change the entry point of your app's render process. default src/[main|index].[js|ts]
      // rendererProcessFile: "src/main.js",
      // Provide an array of files that, when changed, will recompile the main process and restart Electron
      // Your main process file will be added by default
      // mainProcessWatch: ["src/myFile1", "src/myFile2"],
    },
  },
};
