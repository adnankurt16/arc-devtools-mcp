# Troubleshooting

## General tips

- Run `npx arc-devtools-mcp@latest --help` to test if the MCP server runs on your machine.
- Make sure that your MCP client uses the same npm and node version as your terminal.
- When configuring your MCP client, try using the `--yes` argument to `npx` to
  auto-accept installation prompt.
- Find a specific error in the output of the `arc-devtools-mcp` server.
  Usually, if you client is an IDE, logs would be in the Output pane.

## Specific problems

### `Error [ERR_MODULE_NOT_FOUND]: Cannot find module ...`

This usually indicates either a non-supported Node version is in use or that the
`npm`/`npx` cache is corrupted. Try clearing the cache, uninstalling
`arc-devtools-mcp` and installing it again. Clear the cache by running:

```sh
rm -rf ~/.npm/_npx # NOTE: this might remove other installed npx executables.
npm cache clean --force
```

### `Target closed` error

This indicates that the browser could not be started. Make sure that no Arc
instances are running or close them. Make sure you have Arc browser
installed from [arc.net](https://arc.net).

### Arc is not available on my platform

Arc browser is currently only available on macOS. Windows and Linux support
are planned by the Arc team but not yet available. You can track platform
availability at [arc.net](https://arc.net).
