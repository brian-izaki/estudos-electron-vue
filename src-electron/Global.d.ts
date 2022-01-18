//#region declare Global window interface
export interface IApiDesktop {
  desktop: boolean;
}

declare global {
  interface Window {
    apiDesktop: IApiDesktop;
  }
}
//#endregion
