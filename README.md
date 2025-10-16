# Arc DevTools MCP

[![npm arc-devtools-mcp package](https://img.shields.io/npm/v/arc-devtools-mcp.svg)](https://npmjs.org/package/arc-devtools-mcp)

`arc-devtools-mcp` lets your coding agent (such as Gemini, Claude, Cursor or Copilot)
control and inspect a live Arc browser. It acts as a Model-Context-Protocol
(MCP) server, giving your AI coding assistant access to the full power of
DevTools for reliable automation, in-depth debugging, and performance analysis.

Arc browser is built on Chromium, so this server leverages all the power of Chrome DevTools
while providing a native Arc experience.

## [Tool reference](./docs/tool-reference.md) | [Changelog](./CHANGELOG.md) | [Contributing](./CONTRIBUTING.md) | [Troubleshooting](./docs/troubleshooting.md)

## Key features

- **Get performance insights**: Uses [Chrome
  DevTools](https://github.com/ChromeDevTools/devtools-frontend) to record
  traces and extract actionable performance insights.
- **Advanced browser debugging**: Analyze network requests, take screenshots and
  check the browser console.
- **Reliable automation**. Uses
  [puppeteer](https://github.com/puppeteer/puppeteer) to automate actions in
  Arc and automatically wait for action results.

## Disclaimers

`arc-devtools-mcp` exposes content of the browser instance to the MCP clients
allowing them to inspect, debug, and modify any data in the browser or DevTools.
Avoid sharing sensitive or personal information that you don't want to share with
MCP clients.

## Requirements

- [Node.js](https://nodejs.org/) v20.19 or a newer [latest maintenance LTS](https://github.com/nodejs/Release#release-schedule) version.
- [Arc browser](https://arc.net/) current version.
- [npm](https://www.npmjs.com/).

## Getting started

Add the following config to your MCP client:

```json
{
  "mcpServers": {
    "arc-devtools": {
      "command": "npx",
      "args": ["-y", "arc-devtools-mcp@latest"]
    }
  }
}
```

> [!NOTE]
> Using `arc-devtools-mcp@latest` ensures that your MCP client will always use the latest version of the Arc DevTools MCP server.

### MCP Client configuration

<details>
  <summary>Amp</summary>
  Follow https://ampcode.com/manual#mcp and use the config provided above. You can also install the Arc DevTools MCP server using the CLI:

```bash
amp mcp add arc-devtools -- npx arc-devtools-mcp@latest
```

</details>

<details>
  <summary>Claude Code</summary>
    Use the Claude Code CLI to add the Arc DevTools MCP server (<a href="https://docs.anthropic.com/en/docs/claude-code/mcp">guide</a>):

```bash
claude mcp add arc-devtools npx arc-devtools-mcp@latest
```

</details>

<details>
  <summary>Cline</summary>
  Follow https://docs.cline.bot/mcp/configuring-mcp-servers and use the config provided above.
</details>

<details>
  <summary>Codex</summary>
  Follow the <a href="https://github.com/openai/codex/blob/main/docs/advanced.md#model-context-protocol-mcp">configure MCP guide</a>
  using the standard config from above. You can also install the Arc DevTools MCP server using the Codex CLI:

```bash
codex mcp add arc-devtools -- npx arc-devtools-mcp@latest
```

**On Windows 11**

Arc is currently macOS-only. When Arc becomes available on Windows, configure as follows:

```
[mcp_servers.arc-devtools]
command = "cmd"
args = [
    "/c",
    "npx",
    "-y",
    "arc-devtools-mcp@latest",
]
startup_timeout_ms = 20_000
```

</details>

<details>
  <summary>Copilot CLI</summary>

Start Copilot CLI:

```
copilot
```

Start the dialog to add a new MCP server by running:

```
/mcp add
```

Configure the following fields and press `CTRL+S` to save the configuration:

- **Server name:** `arc-devtools`
- **Server Type:** `[1] Local`
- **Command:** `npx`
- **Arguments:** `-y, arc-devtools-mcp@latest`

</details>

<details>
  <summary>Copilot / VS Code</summary>
  Follow the MCP install <a href="https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server">guide</a>,
  with the standard config from above. You can also install the Arc DevTools MCP server using the VS Code CLI:

```bash
code --add-mcp '{"name":"arc-devtools","command":"npx","args":["arc-devtools-mcp@latest"]}'
```

</details>

<details>
  <summary>Cursor</summary>

**Or install manually:**

Go to `Cursor Settings` -> `MCP` -> `New MCP Server`. Use the config provided above.

</details>

<details>
  <summary>Gemini CLI</summary>
Install the Arc DevTools MCP server using the Gemini CLI.

**Project wide:**

```bash
gemini mcp add arc-devtools npx arc-devtools-mcp@latest
```

**Globally:**

```bash
gemini mcp add -s user arc-devtools npx arc-devtools-mcp@latest
```

Alternatively, follow the <a href="https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md#how-to-set-up-your-mcp-server">MCP guide</a> and use the standard config from above.

</details>

<details>
  <summary>Gemini Code Assist</summary>
  Follow the <a href="https://cloud.google.com/gemini/docs/codeassist/use-agentic-chat-pair-programmer#configure-mcp-servers">configure MCP guide</a>
  using the standard config from above.
</details>

<details>
  <summary>JetBrains AI Assistant & Junie</summary>

Go to `Settings | Tools | AI Assistant | Model Context Protocol (MCP)` -> `Add`. Use the config provided above.
The same way arc-devtools-mcp can be configured for JetBrains Junie in `Settings | Tools | Junie | MCP Settings` -> `Add`. Use the config provided above.

</details>

<details>
  <summary>Kiro</summary>

In **Kiro Settings**, go to `Configure MCP` > `Open Workspace or User MCP Config` > Use the configuration snippet provided above.

Or, from the IDE **Activity Bar** > `Kiro` > `MCP Servers` > `Click Open MCP Config`. Use the configuration snippet provided above.

</details>

<details>
  <summary>Qoder</summary>

In **Qoder Settings**, go to `MCP Server` > `+ Add` > Use the configuration snippet provided above.

Alternatively, follow the <a href="https://docs.qoder.com/user-guide/chat/model-context-protocol">MCP guide</a> and use the standard config from above.

</details>

<details>
  <summary>Visual Studio</summary>

**Click the button to install:**

[<img src="https://img.shields.io/badge/Visual_Studio-Install-C16FDE?logo=visualstudio&logoColor=white" alt="Install in Visual Studio">](https://vs-open.link/mcp-install?%7B%22name%22%3A%22arc-devtools%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22arc-devtools-mcp%40latest%22%5D%7D)

</details>

<details>
  <summary>Warp</summary>

Go to `Settings | AI | Manage MCP Servers` -> `+ Add` to [add an MCP Server](https://docs.warp.dev/knowledge-and-collaboration/mcp#adding-an-mcp-server). Use the config provided above.

</details>

### Your first prompt

Enter the following prompt in your MCP Client to check if everything is working:

```
Check the performance of https://developers.chrome.com
```

Your MCP client should open the Arc browser and record a performance trace.

> [!NOTE]
> The MCP server will start the browser automatically once the MCP client uses a tool that requires a running browser instance. Connecting to the Arc DevTools MCP server on its own will not automatically start the browser.

## Tools

If you run into any issues, checkout our [troubleshooting guide](./docs/troubleshooting.md).

<!-- BEGIN AUTO GENERATED TOOLS -->

- **Input automation** (7 tools)
  - [`click`](docs/tool-reference.md#click)
  - [`drag`](docs/tool-reference.md#drag)
  - [`fill`](docs/tool-reference.md#fill)
  - [`fill_form`](docs/tool-reference.md#fill_form)
  - [`handle_dialog`](docs/tool-reference.md#handle_dialog)
  - [`hover`](docs/tool-reference.md#hover)
  - [`upload_file`](docs/tool-reference.md#upload_file)
- **Navigation automation** (7 tools)
  - [`close_page`](docs/tool-reference.md#close_page)
  - [`list_pages`](docs/tool-reference.md#list_pages)
  - [`navigate_page`](docs/tool-reference.md#navigate_page)
  - [`navigate_page_history`](docs/tool-reference.md#navigate_page_history)
  - [`new_page`](docs/tool-reference.md#new_page)
  - [`select_page`](docs/tool-reference.md#select_page)
  - [`wait_for`](docs/tool-reference.md#wait_for)
- **Emulation** (3 tools)
  - [`emulate_cpu`](docs/tool-reference.md#emulate_cpu)
  - [`emulate_network`](docs/tool-reference.md#emulate_network)
  - [`resize_page`](docs/tool-reference.md#resize_page)
- **Performance** (3 tools)
  - [`performance_analyze_insight`](docs/tool-reference.md#performance_analyze_insight)
  - [`performance_start_trace`](docs/tool-reference.md#performance_start_trace)
  - [`performance_stop_trace`](docs/tool-reference.md#performance_stop_trace)
- **Network** (2 tools)
  - [`get_network_request`](docs/tool-reference.md#get_network_request)
  - [`list_network_requests`](docs/tool-reference.md#list_network_requests)
- **Debugging** (4 tools)
  - [`evaluate_script`](docs/tool-reference.md#evaluate_script)
  - [`list_console_messages`](docs/tool-reference.md#list_console_messages)
  - [`take_screenshot`](docs/tool-reference.md#take_screenshot)
  - [`take_snapshot`](docs/tool-reference.md#take_snapshot)

<!-- END AUTO GENERATED TOOLS -->

## Configuration

The Arc DevTools MCP server supports the following configuration options:

<!-- BEGIN AUTO GENERATED OPTIONS -->

- **`--browserUrl`, `-u`**
  Connect to a running Arc browser instance using port forwarding. Arc uses Chromium remote debugging protocol.
  - **Type:** string

- **`--headless`**
  Whether to run in headless (no UI) mode.
  - **Type:** boolean
  - **Default:** `false`

- **`--executablePath`, `-e`**
  Path to Arc executable. Default: /Applications/Arc.app/Contents/MacOS/Arc
  - **Type:** string

- **`--isolated`**
  If specified, creates a temporary user-data-dir that is automatically cleaned up after the browser is closed.
  - **Type:** boolean
  - **Default:** `false`

- **`--channel`**
  Browser channel to use (Arc only has stable channel, kept for compatibility).
  - **Type:** string
  - **Choices:** `stable`, `canary`, `beta`, `dev`

- **`--logFile`**
  Path to a file to write debug logs to. Set the env variable `DEBUG` to `*` to enable verbose logs. Useful for submitting bug reports.
  - **Type:** string

- **`--viewport`**
  Initial viewport size for the Arc instances started by the server. For example, `1280x720`. In headless mode, max size is 3840x2160px.
  - **Type:** string

- **`--proxyServer`**
  Proxy server configuration for Arc passed as --proxy-server when launching the browser. See https://www.chromium.org/developers/design-documents/network-settings/ for details.
  - **Type:** string

- **`--acceptInsecureCerts`**
  If enabled, ignores errors relative to self-signed and expired certificates. Use with caution.
  - **Type:** boolean

- **`--chromeArg`**
  Additional arguments for Arc. Only applies when Arc is launched by arc-devtools-mcp.
  - **Type:** array

<!-- END AUTO GENERATED OPTIONS -->

Pass them via the `args` property in the JSON configuration. For example:

```json
{
  "mcpServers": {
    "arc-devtools": {
      "command": "npx",
      "args": [
        "arc-devtools-mcp@latest",
        "--channel=stable",
        "--headless=true",
        "--isolated=true"
      ]
    }
  }
}
```

You can also run `npx arc-devtools-mcp@latest --help` to see all available configuration options.

## Concepts

### User data directory

`arc-devtools-mcp` starts an Arc browser instance using the following user
data directory:

- macOS: `$HOME/.cache/arc-devtools-mcp/arc-profile`
- Windows: Coming soon (Arc is currently macOS-only)
- Linux: Not available (Arc is currently macOS-only)

The user data directory is not cleared between runs and shared across
all instances of `arc-devtools-mcp`. Set the `isolated` option to `true`
to use a temporary user data dir instead which will be cleared automatically after
the browser is closed.

### Connecting to a running Arc instance

You can connect to a running Arc instance by using the `--browser-url` option. This is useful if you want to use your existing Arc profile or if you are running the MCP server in a sandboxed environment that does not allow starting a new Arc instance.

Here is a step-by-step guide on how to connect to a running Arc instance:

**Step 1: Configure the MCP client**

Add the `--browser-url` option to your MCP client configuration. The value of this option should be the URL of the running Arc instance. `http://127.0.0.1:9222` is a common default.

```json
{
  "mcpServers": {
    "arc-devtools": {
      "command": "npx",
      "args": ["arc-devtools-mcp@latest", "--browser-url=http://127.0.0.1:9222"]
    }
  }
}
```

**Step 2: Start Arc with remote debugging**

> [!WARNING]
> Enabling the remote debugging port opens up a debugging port on the running browser instance. Any application on your machine can connect to this port and control the browser. Make sure that you are not browsing any sensitive websites while the debugging port is open.

Start Arc with the remote debugging port enabled. Make sure to close any running Arc instances before starting a new one with the debugging port enabled. The port number you choose must be the same as the one you specified in the `--browser-url` option in your MCP client configuration.

For security reasons, you need to use a non-default user data directory when enabling the remote debugging port. You can specify a custom directory using the `--user-data-dir` flag. This ensures that your regular browsing profile and data are not exposed to the debugging session.

**macOS**

```bash
/Applications/Arc.app/Contents/MacOS/Arc --remote-debugging-port=9222 --user-data-dir=/tmp/arc-profile-debug
```

**Step 3: Test your setup**

After configuring the MCP client and starting Arc with debugging enabled, you can test your setup by running a simple prompt in your MCP client:

```
Check the performance of https://developers.chrome.com
```

Your MCP client should connect to the running Arc instance and receive a performance report.

## Known limitations

### Operating system sandboxes

Some MCP clients allow sandboxing the MCP server using macOS Seatbelt or Linux
containers. If sandboxes are enabled, `arc-devtools-mcp` is not able to start
Arc that requires permissions to create its own sandboxes. As a workaround,
either disable sandboxing for `arc-devtools-mcp` in your MCP client or use
`--browser-url` to connect to an Arc instance that you start manually outside
of the MCP client sandbox.

### Platform availability

Arc browser is currently only available on macOS. Windows and Linux support is planned by the Arc team but not yet available.
