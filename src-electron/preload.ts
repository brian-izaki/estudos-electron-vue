import { contextBridge } from "electron";
import { IApiDesktop } from "./Global";

contextBridge.exposeInMainWorld("apiDesktop", {
  desktop: false,
} as IApiDesktop);
