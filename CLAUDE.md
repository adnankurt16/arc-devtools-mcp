# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Model Context Protocol (MCP)** server that enables AI coding assistants to control and inspect live Arc browsers with full DevTools integration. Arc is built on Chromium, allowing this server to leverage the full power of Chrome DevTools while providing a native Arc experience. It provides 26 tools across 6 categories for browser automation, performance analysis, debugging, and network inspection.

**Key Technologies:**

- TypeScript ESM modules (Node.js 20.19+ / 22.12+ / 23+)
- MCP SDK (@modelcontextprotocol/sdk)
- puppeteer-core for browser automation
- chrome-devtools-frontend for performance trace parsing
- Zod for runtime schema validation

## Development Commands

### Build & Development

```bash
npm run build           # TypeScript compilation + post-build hook
npm run typecheck       # Type checking without emission
npm run start           # Build and run MCP server locally
npm start-debug         # Enable DEBUG=mcp:* logging
```

### Testing

```bash
npm test                        # Build + run all tests (Node.js test runner)
npm run test:only              # Run only .only marked tests
npm run test:update-snapshots  # Update test snapshots
npm run test:node20            # Node 20 compatibility test harness
```

### Code Quality

```bash
npm run format          # ESLint fix + Prettier write (auto-fix code style)
npm run check-format    # Validate formatting (CI check)
```

### Documentation

```bash
npm run docs            # Build + generate tool reference docs + format
npm run docs:generate   # Generate docs from ToolDefinition schemas
```

### Version Management

```bash
npm run verify-server-json-version  # Ensure version consistency across files
```

## Architecture

### Entry Point Flow

```
index.ts (shebang + Node version check)
  ↓
main.ts (MCP server initialization, tool registration)
  ↓
cli.ts (yargs argument parsing)
  ↓
browser.ts (Puppeteer browser lifecycle)
  ↓
McpContext.ts (tool execution context)
```

### Core Components

**main.ts** - MCP server orchestration:

- Registers all 26 tools via `registerTool()`
- Implements tool mutex (serializes concurrent tool calls to prevent race conditions)
- Establishes stdio transport for MCP communication
- Lazy browser initialization (browser starts on first tool call, not on connection)

**browser.ts** - Browser lifecycle:

- Two modes: **launched** (creates new Arc instance) or **connected** (attaches to existing via WebSocket)
- User data directory: `~/.cache/arc-devtools-mcp/arc-profile`
- Target filtering (excludes chrome://, devtools://, extensions://)
- Supports headless, viewport, proxy, insecure certs, custom executable

**McpContext.ts** - Unified context for tools:

- Page management (getSelectedPage, newPage, closePage)
- Network/console collection (listNetworkRequests, listConsoleMessages)
- DOM snapshots (accessibility tree via getAXNodeByUid)
- Performance traces (recordedTraces, storeTraceRecording)
- Emulation (setNetworkConditions, setCpuThrottlingRate)
- Dialog handling, WaitForHelper integration

**McpResponse.ts** - Response aggregator:

- Accumulates text responses, images (PNG/JPEG/WebP), pages list
- Collects network requests, console messages, DOM snapshots
- Supports filtering and pagination
- Formats as MCP content array via `handle()`

**ToolDefinition pattern** - All tools follow this structure:

```typescript
defineTool({
  name: string,
  description: string,
  annotations: {category, readOnlyHint},
  schema: ZodRawShape, // Runtime input validation
  handler: async (request, response, context) => {},
});
```

### Tool Categories (6 total)

- **Input Automation** (7): click, fill, hover, drag, upload, fill_form, handle_dialog
- **Navigation** (7): new_page, close_page, navigate_page, navigate_page_history, list_pages, select_page, wait_for
- **Emulation** (3): emulate_cpu, emulate_network, resize_page
- **Performance** (3): performance_start_trace, performance_stop_trace, performance_analyze_insight
- **Network** (2): list_network_requests, get_network_request
- **Debugging** (4): take_screenshot, take_snapshot, evaluate_script, list_console_messages

### Key Patterns

**1. Tool Mutex** - All tool execution is serialized:

```typescript
const guard = await toolMutex.acquire();
try {
  // Execute tool
} finally {
  guard.dispose(); // Release for next tool
}
```

**2. PageCollector Pattern** - Generalized event collection:

- WeakMap storage per page
- Auto-attaches listeners on page creation
- Used for network requests, console messages

**3. Performance Trace Processing** (trace-processing/parse.ts):

- Uses chrome-devtools-frontend DevTools trace engine
- Parses raw trace buffer → structured data
- Generates AI-powered performance insights
- Extracts Core Web Vitals (CWV) scores

## Testing

**Test Framework:** Node.js built-in test runner (no Jest/Vitest)

- Setup file: `tests/setup.ts` (loaded via `--require`)
- Test pattern: `build/tests/**/*.test.js` (compiled TypeScript)
- Snapshot testing: `--test-update-snapshots` flag
- Reporter: `spec` format

**Run single test:**

```bash
# Mark test with .only in source
npm run test:only
```

**CI Matrix:**

- 3 operating systems: Ubuntu, Windows (when Arc is available), macOS
- 5 Node.js versions: 20.19, 22.12, 23, 24, latest

## Code Style

- **ESLint** with flat config (eslint.config.mjs)
- **Prettier** for formatting
- **TypeScript strict mode** enabled
- **Conventional Commits** required (feat:, fix:, docs:, chore:, etc.)

## Release Process

- **release-please** creates automated release PRs
- Version bumped in: package.json, src/main.ts, server.json
- Published to npm on git tag via GitHub Actions
- Changelog automatically generated

## CLI Configuration

Server supports command-line arguments (cli.ts with yargs):

```bash
npx arc-devtools-mcp@latest [OPTIONS]

--browserUrl <url>          # Connect to existing Arc (e.g., http://127.0.0.1:9222)
--headless                  # Run Arc without UI
--executablePath <path>     # Custom Arc path (default: /Applications/Arc.app/Contents/MacOS/Arc)
--channel <stable>          # Browser channel (Arc only has stable, kept for compatibility)
--isolated                  # Use temporary profile (auto-cleaned)
--viewport <WIDTHxHEIGHT>  # Initial viewport size (e.g., 1280x720)
--logFile <path>           # Write debug logs (use DEBUG=* for verbose)
--acceptInsecureCerts      # Ignore cert errors (use with caution)
--proxyServer <config>     # Proxy configuration
--chromeArg <arg>          # Additional Arc arguments (repeatable)
```

## Testing with MCP Clients

**MCP Inspector:**

```bash
npx @modelcontextprotocol/inspector node build/src/index.js
```

**VS Code / Cursor / Claude Code config:**

```json
{
  "mcpServers": {
    "arc-devtools": {
      "command": "node",
      "args": ["/absolute/path/to/build/src/index.js"]
    }
  }
}
```

## Arc Browser Specifics

### Platform Availability

- **macOS**: Fully supported (`/Applications/Arc.app/Contents/MacOS/Arc`)
- **Windows**: Coming soon (Arc team is working on it)
- **Linux**: Not planned yet

### Differences from Chrome

- **No multiple channels**: Arc doesn't have beta/canary/dev versions like Chrome
- **Remote debugging**: Works the same way as Chrome (Chromium-based)
- **DevTools**: Full Chrome DevTools compatibility
- **User Data Dir**: Uses `~/.cache/arc-devtools-mcp/arc-profile` instead of chrome-profile

### Connecting to Running Arc Instance

```bash
# Start Arc with remote debugging port
/Applications/Arc.app/Contents/MacOS/Arc \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/arc-profile-debug

# Configure MCP client
{
  "mcpServers": {
    "arc-devtools": {
      "command": "npx",
      "args": ["arc-devtools-mcp@latest", "--browserUrl", "http://127.0.0.1:9222"]
    }
  }
}
```

## Security Considerations

1. **Data exposure:** All browser content is exposed to MCP clients (avoid sensitive sites)
2. **Remote debugging:** Requires non-default user-data-dir (security requirement)
3. **Sandboxing:** Cannot launch browser in sandboxed MCP clients (workaround: use --browserUrl)
4. **Certificate validation:** Disabled via --acceptInsecureCerts (use cautiously)

## File Locations

**Source code:** `src/` (3,549 LOC)

- `tools/` - Tool implementations organized by category
- `formatters/` - Response formatting (network, console, snapshot)
- `trace-processing/` - Performance trace analysis
- `utils/` - Shared utilities

**Tests:** `tests/` (mirrors src/ structure)
**Documentation:** `docs/` (auto-generated tool reference)
**Scripts:** `scripts/` (build, docs, version verification)
**Config:** Root level (tsconfig.json, eslint.config.mjs, .prettierrc.cjs)

## Important Notes

- **Node version:** Minimum 20.19.0 (no Node 18 support)
- **ESM only:** No CommonJS support (package.json has `"type": "module"`)
- **No bundled Chromium:** Uses puppeteer-core (requires system Arc)
- **Lazy initialization:** Browser doesn't start until first tool call requiring it
- **Tool serialization:** Only one tool executes at a time (mutex-protected)
- **Auto-generated docs:** Never manually edit docs/tool-reference.md (regenerated from schemas)
- **Chrome DevTools Frontend:** Still uses chrome-devtools-frontend package (Arc is Chromium-based, same DevTools)
- **chrome:// URLs:** Arc still uses chrome:// internal URLs (Chromium legacy)

## Common Development Tasks

### Adding a new tool

1. Create tool definition in `src/tools/{category}.ts`
2. Follow ToolDefinition interface with Zod schema
3. Add to appropriate category (ToolCategories enum)
4. Register in main.ts via `registerTool()`
5. Run `npm run docs` to regenerate documentation
6. Add tests in `tests/tools/{category}.test.ts`

### Debugging MCP communication

```bash
# Enable verbose logging
DEBUG=mcp:* npm run start-debug

# Write logs to file
npm run start -- --logFile /tmp/mcp-debug.log
```

### Testing browser automation locally

```bash
# Start Arc manually with debugging port
/Applications/Arc.app/Contents/MacOS/Arc \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/arc-profile-test

# Connect MCP server to running Arc
npm run start -- --browserUrl http://127.0.0.1:9222
```

## Türkçe Commit Mesajları

Bu projede commit mesajları İngilizce olarak yapılmaktadır (Conventional Commits standardı). Issue ve PR açıklamalarında Türkçe kullanılabilir, ancak commit mesajları İngilizce olmalıdır.

## Fork Information

Bu proje [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) projesinden fork edilmiştir ve Arc browser için uyarlanmıştır. Repository: [adnankurt16/arc-devtools-mcp](https://github.com/adnankurt16/arc-devtools-mcp). Chromium tabanlı olması sayesinde tüm Chrome DevTools özellikleri Arc'ta da çalışmaktadır.
