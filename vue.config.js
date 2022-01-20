module.exports = {
  configureWebpack: {
    // Webpack configuration applied to web builds and the electron renderer process
  },
  pluginOptions: {
    electronBuilder: {
      buildDependenciesFromSource: true,
      npmRebuild: false,
      externals: ["serialport"],
      // Use this to change the entrypoint of your app's main process
      mainProcessFile: "src-electron/background.ts",
      mainProcessWatch: ["src-electron/preload"],
      preload: { preload: "src-electron/preload.ts" },
    },
  },
};
