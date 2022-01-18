import { contextBridge } from "electron";
import { IApiDesktop, IMyErrors, ITerminal } from "./Global";
import { handleErrors } from "./src/erros";
import { getOsInfo } from "./src/os";
import { printInTerminal, send2Terminal } from "./src/shell";

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
