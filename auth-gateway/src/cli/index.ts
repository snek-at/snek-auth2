#!/usr/bin/env -S node

import {Command} from 'commander'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

import * as commands from './commands/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const program = new Command()

const psjon = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8')
)

program
  .name('snek-auth2')
  .description('Snek Auth2 CLI')
  .version(psjon.version)

program
  .command('generate')
  .description('Generate token')
  .option('-u, --user <username>', 'Generate token for this user', 'cisco')
  .option('-d, --duration <duration>', 'Generate token with this duration', '3d')
  .option('-s, --scope <scope>', 'Generate token with this scope', '2g')
  .option('--type <type>', 'Generate with this type ', 'type')
  .action(commands.generate)

program
  .command('validate')
  .description('Validate user')
  .option('-u, --user <username>', 'Validate this user', 'cisco')
  .option('-p, --password <password>', 'Validate user with this password', 'ciscocisco')
  .option('-t, --token <token>', 'Validate user via token', 'jwt-ciscocisco')
  .action(commands.validate)

program
  .command('authenticate')
  .description('Validate user')
  .option('-u, --user <username>', 'Validate this user', 'cisco')
  .option('-p, --password <password>', 'Validate user with this password', 'ciscocisco')
  .option('-t, --token <token>', 'Validate user via token', 'jwt-ciscocisco')
  .action(commands.authenticate)

program.parse()
