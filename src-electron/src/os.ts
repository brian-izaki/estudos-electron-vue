import os from "os";
import { IOsInfo } from "src-electron/Global";

function getOsInfo(): IOsInfo {
  return {
    platform: os.platform(),
    version: os.version(),
    type: os.type(),
  };
}

export { getOsInfo };
