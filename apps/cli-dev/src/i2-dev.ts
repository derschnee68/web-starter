#!/usr/bin/env node
import { Command } from 'commander';
import jwt from './commands/jwt';
import favicons from './commands/favicons';

const cli = new Command();
cli.addCommand(jwt);
cli.addCommand(favicons);
cli.parse();
