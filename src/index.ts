// Dependency Imports
import { argv } from "process";
import chalk from "chalk";

// App Imports
import { type Config, readConfig, validateConfig } from "./config.js";
import {
  type CommandsRegistry,
  registerCommand,
  handlerLogin,
  runCommand,
} from "./commands.js";

function main() {
  console.log("Hello, world!");

  // Object containing the string command passed as argument and the handlerFunc
  // "login" -> handlerLogin
  const registry: CommandsRegistry = {};

  // register the login command in the registry
  registerCommand(registry, "login", handlerLogin);
  console.log(chalk.bgYellow(`New Registry cmds: ${Object.keys(registry)}`));

  //catch args
  console.log(chalk.magenta(`Getting args... ${argv}`));
  const args: string[] = argv.slice(2, 4);
  const [cmdName, argument] = args;
  if (!cmdName) {
    throw new Error(
      chalk.bgRed("Missing command. Not enough arguments were provided.")
    );
  } else if (!argument) {
    throw new Error(chalk.bgRed("Missing username"));
  } else if (cmdName && argument) {
    console.log(chalk.cyan(`Cmd Name: ${cmdName} --- Arg: ${argument}`));
    runCommand(registry, cmdName, argument);
  } else {
    throw new Error("Something else went wrong...halp");
  }

  // load config file and validate
  const cfg: Config = readConfig();
  validateConfig(cfg);

  console.log(`Config: ${JSON.stringify(cfg)}`);
}

main();
