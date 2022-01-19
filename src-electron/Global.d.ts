//#region interfaces return to Dialog
export interface ITextFile {
  path: string;
  content: string;
}
//#endregion

//#region interfaces to global window
export interface IOsInfo {
  platform: string;
  version: string;
  type: string;
}

export interface IApiDesktop {
  desktop: boolean;
  os: IOsInfo;
}

export interface ITerminal {
  print: () => void;
  sendMessage: (msg: string) => void;
}

export interface IMyErrors {
  makeError: (isError: boolean) => Promise<string>;
}

export interface IDialog {
  showDialog: (options: Electron.OpenDialogOptions) => void;
  readTextFiles: (options: Electron.OpenDialogOptions) => Promise<ITextFile>;
}
//#endregion

//#region declare Global window interface
declare global {
  interface Window {
    apiDesktop: IApiDesktop;
    handleTerminal: ITerminal;
    myErrors: IMyErrors;
    dialog: IDialog;
  }
}
//#endregion
