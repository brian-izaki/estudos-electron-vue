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
//#endregion

//#region declare Global window interface
declare global {
  interface Window {
    apiDesktop: IApiDesktop;
    handleTerminal: ITerminal;
    myErrors: IMyErrors;
  }
}
//#endregion
