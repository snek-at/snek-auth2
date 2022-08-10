import { fn, sendToProxy } from "./factory";
import { Log } from "./interfaces";

const log = fn<string, Log>(
  async (args) => {
    return sendToProxy("log", args);
  },
  {
    name: "log"
  }
)

export default log;