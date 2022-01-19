import { IpcMain, dialog } from "electron";
import fs from "fs";
import { ITextFile } from "src-electron/Global";

// são criados eventos aqui que podem interagir com a api do electron e o node.
// eles são chamados no preload.ts
export default (ipcMain: IpcMain) => {
  ipcMain.on(
    "dialog-open",
    async (event, options: Electron.OpenDialogOptions) => {
      const teste = await dialog.showOpenDialog(options);

      console.log(teste);
    }
  );

  ipcMain.handle(
    "dialog-text-file",
    async (e, options: Electron.OpenDialogOptions): Promise<ITextFile> => {
      try {
        const teste = await dialog.showOpenDialog(options);

        if (teste.canceled)
          return { content: "Seleção cancelada", path: "Cancelado" };

        const content = fs.readFileSync(teste.filePaths[0], {
          encoding: "utf-8",
        });
        return { content: content, path: teste.filePaths[0] };
      } catch (err) {
        console.error(err);
        return {
          content: "Ocorreu um erro ao tentar buscar o arquivo.",
          path: "Não encontrado",
        };
      }
    }
  );
};
