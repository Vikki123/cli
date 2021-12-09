#!/usr/bin/env node

import * as commander from "commander/esm.mjs";
import commands from "./commands/index.js";

const program = new commander.Command();

program
  .version("1.0.0")
  .command("demo").action(() => {
    commands.demo();
  });

program
  .command("create-project")
  .addArgument(new commander.Argument("<type>", "which project type to create").choices(["api", "storefront", "admin"]))
  .argument("<name>", "what to name the project")
  .option("--populate")
  .action((type, name, options) => {
    commands.createProject(type, name, options);
  });

program
  .command("develop")
  .addArgument(new commander.Argument("[type]", "which project type to develop on").choices(["api", "storefront", "admin"]).default("api"))
  .option("--debug")
  .action((type, options) => {
    commands.develop(type, options);
  });

program.parse(process.argv);