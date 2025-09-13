import { type Config, setUser, readConfig } from "./config";

function main() {
  console.log("Hello, world!");

  console.log("test setUser");

  setUser("ryerye");
  const cfg: Config = readConfig();
  console.log(`Config: ${JSON.stringify(cfg)}`);
}

main();
