import fs from "fs";
import os from "os";
import path from "path";
import * as z from "zod";

const configSchema = z.object({
  dbUrl: z.url({ protocol: /^postgres(ql)?/ }),
  userName: z.string(),
});

export type Config = z.infer<typeof configSchema>;

// helper functions
function getConfigFilePath(): string {
  const paths = [os.homedir(), "/.gatorconfig.json"];
  console.log(`paths: ${paths}`);
  const filePath = path.join(...paths);
  return filePath;
}

function writeConfig(cfg: Config): void {
  // write new Config to gatorconfig.json
  // fs.writeFileSync(file, data[, options]) after using JSON.stringify
  const filePath = getConfigFilePath();
  console.log("filePath:", filePath);
  fs.writeFileSync(filePath, JSON.stringify(cfg));
}

function parseRawConfig(rawConfig: string): Config {
  //used by readConfig to validate result of JSON.parse
  const cfg = JSON.parse(rawConfig) as Config;
  return cfg;
}

export function setUser(userName: string) {
  const loadedConfig = readConfig();
  loadedConfig.userName = userName;
  if (!loadedConfig.dbUrl) {
    loadedConfig.dbUrl = "postgres://example";
  }

  // placeholder postgress
  //config.dbUrl = "postgresql://localhost:5432";
  writeConfig(loadedConfig);
}

export function validateConfig(config: Config) {
  // Parse Config and Validate with Zod
  const configResult = configSchema.safeParse(config);
  if (configResult.error) {
    console.log("\x1b[41m Invalid Config Schema \x1b[0m");
    throw new Error("Invalid config setup");
  }
  console.log("\x1b[42m Valid Config Schema \x1b[0m");
}

export function readConfig(): Config {
  // fs.readFileSync(path[,options]) and set the encoding to 'utf-8'.
  const filePath: string = getConfigFilePath();
  const fileContent: string = fs.readFileSync(filePath, "utf-8");
  console.log(`Read file content: ${fileContent}`);
  const fileConfig: Config = parseRawConfig(fileContent);
  console.log(`Type config ${JSON.stringify(fileConfig)}`);
  return fileConfig;
}
