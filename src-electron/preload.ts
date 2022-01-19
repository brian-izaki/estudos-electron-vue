import { contextBridge, ipcRenderer } from "electron";
import { IApiDesktop, IDialog, IMyErrors, ITerminal } from "./Global";
import { handleErrors } from "./src/handlers/erros";
import { getOsInfo } from "./src/handlers/os";
import { printInTerminal, send2Terminal } from "./src/handlers/shell";

contextBridge.exposeInMainWorld("apiDesktop", {
  desktop: false,
  os: getOsInfo(),
} as IApiDesktop);

contextBridge.exposeInMainWorld("handleTerminal", {
  print: printInTerminal,
  sendMessage: send2Terminal,
} as ITerminal);

contextBridge.exposeInMainWorld("myErrors", {
  makeError: handleErrors,
} as IMyErrors);

contextBridge.exposeInMainWorld("dialog", {
  showDialog: (options) => ipcRenderer.send("dialog-open", options),
  readTextFiles: async (options) =>
    ipcRenderer.invoke("dialog-text-file", options).then((res) => res),
} as IDialog);
