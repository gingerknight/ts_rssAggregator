import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string;
  currentUserName: string;
};

// helper functions
function getConfigFilePath(): string {
  const paths = [os.homedir(), "/.gatorconfig.json"];
  // console.log(`paths: ${paths}`);
  const filePath = path.join(...paths);
  return filePath;
}

function writeConfig(cfg: Config): void {
  // write new Config to gatorconfig.json
  // fs.writeFileSync(file, data[, options]) after using JSON.stringify
  const filePath = getConfigFilePath();
  // console.log("filePath:", filePath);
  fs.writeFileSync(filePath, JSON.stringify(cfg));
}

function validateConfig(rawConfig: any): Config {
  //used by readConfig to validate result of JSON.parse
  const cfg = JSON.parse(rawConfig) as Config;
  return cfg;
}

export function setUser(userName: string) {
  const config = {} as Config;
  config.currentUserName = userName;
  // placeholder postgress
  // config.dbUrl = "postgresql://localhost:5432";
  config.dbUrl = "postgres://example";
  writeConfig(config);
}

export function readConfig(): Config {
  // fs.readFileSync(path[,options]) and set the encoding to 'utf-8'.
  const filePath: string = getConfigFilePath();
  const fileContent: string = fs.readFileSync(filePath, "utf-8");
  // console.log(fileContent);
  const fileConfig: Config = validateConfig(fileContent);
  // console.log(`Type config ${fileConfig}`);
  return fileConfig;
}
