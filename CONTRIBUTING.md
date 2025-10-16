# How to contribute

We'd love to accept your patches and contributions to this project.

## Before you begin

This project is a fork of [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)
adapted for Arc browser. Contributions should focus on Arc-specific features and improvements.

### Review our community guidelines

Please be respectful and constructive in all interactions. Follow standard
open source etiquette and best practices.

## Contribution process

### Code reviews

All submissions, including submissions by project members, require review. We
use GitHub pull requests for this purpose. Consult
[GitHub Help](https://help.github.com/articles/about-pull-requests/) for more
information on using pull requests.

### Conventional commits

Please follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
for PR and commit titles.

## Installation

Check that you are using node version specified in .nvmrc, then run following commands:

```sh
git clone https://github.com/adnankurt16/arc-devtools-mcp.git
cd arc-devtools-mcp
npm ci
npm run build
```

### Testing with @modelcontextprotocol/inspector

```sh
npx @modelcontextprotocol/inspector node build/src/index.js
```

### Testing with an MCP client

Add the MCP server to your client's config.

```json
{
  "mcpServers": {
    "arc-devtools": {
      "command": "node",
      "args": ["/path-to/build/src/index.js"]
    }
  }
}
```

#### Using with VS Code SSH

When running the `@modelcontextprotocol/inspector` it spawns 2 services - one on port `6274` and one on `6277`.
Usually VS Code automatically detects and forwards `6274` but fails to detect `6277` so you need to manually forward it.

### Debugging

To write debug logs to `log.txt` in the working directory, run with the following commands:

```sh
npx @modelcontextprotocol/inspector node build/src/index.js --log-file=/your/desired/path/log.txt
```

You can use the `DEBUG` environment variable as usual to control categories that are logged.

### Updating documentation

When adding a new tool or updating a tool name or description, make sure to run `npm run docs` to generate the tool reference documentation.

## Testing with Arc Browser

Make sure you have Arc installed on macOS before testing. The server will attempt
to locate Arc at `/Applications/Arc.app/Contents/MacOS/Arc` by default.
