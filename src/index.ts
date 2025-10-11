import { type Config, setUser, readConfig, validateConfig } from "./config.js";

function main() {
  console.log("Hello, world!");

  console.log("test setUser");

  setUser("ryerye");
  const cfg: Config = readConfig();
  validateConfig(cfg);
  console.log(`Config: ${JSON.stringify(cfg)}`);
}

main();
