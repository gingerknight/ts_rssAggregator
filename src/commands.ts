// Command Handler and Commands
import { setUser } from "./config.js";
import chalk from "chalk";

const log = console.log;

export type CommandHandler = (cmdName: string, ...args: string[]) => void;
/*
// CommandHandler takes a cmdName string and variadic string arguments. 
// For example, in the case of the login command handler, the name would be "login" 
// and the handler will expect the first argument after to be one string, the username. 
*/
export type CommandsRegistry = Record<string, CommandHandler>;
// The string command "login": And the handler function
// [cmdName: string]: CommandHandler;

export const handlerLogin: CommandHandler = (cmdName, ...args) => {
  const [username] = args;
  if (!username) {
    throw new Error("Username is required!");
  }
  setUser(username);
  log(chalk.magenta.italic(`Set username ${username}`));
};
/* 
    If the command's args array is empty, throw an error; the login handler expects a single argument, the username.
    Use the setUser function to set the user to the given username.
    Print a message to the terminal that the user has been set.
*/

export function registerCommand(
  registry: CommandsRegistry,
  cmdString: string,
  handlerFunc: CommandHandler
) {
  //This function registers a new handler function for a command name.
  log(chalk.bgYellow.black(`Current Registry: ${registry.keys}`));
  registry[cmdString] = handlerFunc;
}

export function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
) {
  log(chalk.bgWhite.black(`Registry: ${registry.keys}`));
  if (registry[cmdName]) {
    log(chalk.bgGreen("Found cmdName in registry!"));
    const handler = registry[cmdName];
    handler(cmdName, ...args);
  } else {
    throw new Error(chalk.red("NOT A VALID COMMAND!!!"));
  }
}
// This function runs a given command with the provided state if it exists.
