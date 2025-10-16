/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type {Options as YargsOptions} from 'yargs';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';

export const cliOptions = {
  browserUrl: {
    type: 'string',
    description:
      'Connect to a running Arc browser instance using port forwarding. Arc uses Chromium remote debugging protocol.',
    alias: 'u',
    coerce: (url: string | undefined) => {
      if (!url) {
        return;
      }
      try {
        new URL(url);
      } catch {
        throw new Error(`Provided browserUrl ${url} is not valid URL.`);
      }
      return url;
    },
  },
  headless: {
    type: 'boolean',
    description: 'Whether to run in headless (no UI) mode.',
    default: false,
  },
  executablePath: {
    type: 'string',
    description:
      'Path to Arc executable. Default: /Applications/Arc.app/Contents/MacOS/Arc',
    conflicts: 'browserUrl',
    alias: 'e',
  },
  isolated: {
    type: 'boolean',
    description:
      'If specified, creates a temporary user-data-dir that is automatically cleaned up after the browser is closed.',
    default: false,
  },
  channel: {
    type: 'string',
    description:
      'Browser channel to use (Arc only has stable channel, kept for compatibility).',
    choices: ['stable', 'canary', 'beta', 'dev'] as const,
    conflicts: ['browserUrl', 'executablePath'],
  },
  logFile: {
    type: 'string',
    describe:
      'Path to a file to write debug logs to. Set the env variable `DEBUG` to `*` to enable verbose logs. Useful for submitting bug reports.',
  },
  viewport: {
    type: 'string',
    describe:
      'Initial viewport size for the Arc instances started by the server. For example, `1280x720`. In headless mode, max size is 3840x2160px.',
    coerce: (arg: string | undefined) => {
      if (arg === undefined) {
        return;
      }
      const [width, height] = arg.split('x').map(Number);
      if (!width || !height || Number.isNaN(width) || Number.isNaN(height)) {
        throw new Error('Invalid viewport. Expected format is `1280x720`.');
      }
      return {
        width,
        height,
      };
    },
  },
  proxyServer: {
    type: 'string',
    description: `Proxy server configuration for Arc passed as --proxy-server when launching the browser. See https://www.chromium.org/developers/design-documents/network-settings/ for details.`,
  },
  acceptInsecureCerts: {
    type: 'boolean',
    description: `If enabled, ignores errors relative to self-signed and expired certificates. Use with caution.`,
  },
  experimentalDevtools: {
    type: 'boolean',
    describe: 'Whether to enable automation over DevTools targets',
    hidden: true,
  },
  chromeArg: {
    type: 'array',
    describe:
      'Additional arguments for Arc. Only applies when Arc is launched by arc-devtools-mcp.',
  },
} satisfies Record<string, YargsOptions>;

export function parseArguments(version: string, argv = process.argv) {
  const yargsInstance = yargs(hideBin(argv))
    .scriptName('npx arc-devtools-mcp@latest')
    .options(cliOptions)
    .check(args => {
      // We can't set default in the options else
      // Yargs will complain
      if (!args.channel && !args.browserUrl && !args.executablePath) {
        args.channel = 'stable';
      }
      return true;
    })
    .example([
      [
        '$0 --browserUrl http://127.0.0.1:9222',
        'Connect to an existing Arc browser instance',
      ],
      ['$0 --channel stable', 'Use Arc browser installed on this system'],
      ['$0 --logFile /tmp/log.txt', 'Save logs to a file'],
      ['$0 --help', 'Print CLI options'],
      [
        '$0 --viewport 1280x720',
        'Launch Arc with the initial viewport size of 1280x720px',
      ],
      [
        '$0 --executablePath /Applications/Arc.app/Contents/MacOS/Arc',
        'Specify custom Arc executable path',
      ],
    ]);

  return yargsInstance
    .wrap(Math.min(120, yargsInstance.terminalWidth()))
    .help()
    .version(version)
    .parseSync();
}
