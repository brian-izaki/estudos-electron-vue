import { IpcMain } from "electron";
import serialPort from "serialport";

export default (ipcMain: IpcMain) => {
  ipcMain.handle("serial-list", async () => {
    try {
      return await serialPort.list();
    } catch (error) {
      console.error(error);
      return [];
    }
  });
};
