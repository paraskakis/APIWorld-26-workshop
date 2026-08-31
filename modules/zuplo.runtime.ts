import { OpenTelemetryPlugin } from "@zuplo/otel";
import { environment, type RuntimeExtensions } from "@zuplo/runtime";
import { McpGatewayPlugin } from "@zuplo/runtime/mcp-gateway";

/**
 * `runtimeInit` runs once when your gateway boots. Use it to register plugins
 * and lifecycle hooks. Docs:
 * https://zuplo.com/docs/programmable-api/runtime-extensions
 */
export function runtimeInit(runtime: RuntimeExtensions) {
  // --- MCP Gateway ---------------------------------------------------------
  // Registers the MCP Gateway, which adds the OAuth and upstream-connection
  // routes used to expose and secure MCP servers through your gateway. It is a
  // no-op until you add an MCP route/policy, so it is safe to leave enabled.
  // Docs: https://zuplo.com/docs/mcp-server/introduction
  //
  // Remove this plugin if you are not using the MCP Gateway features.
  runtime.addPlugin(new McpGatewayPlugin());

  // --- OpenTelemetry tracing (optional) ------------------------------------
  // Send traces to Zuplo's built-in tracing. This can also be configured to
  // send traces to a third-party service such as Honeycomb, Grafana, and
  // others. Docs: https://zuplo.com/docs/articles/opentelemetry
  //
  // `headSampler.ratio` is the share of requests that get traced. Your working
  // copy traces everything so you see every request while you are building;
  // every other stage (production, preview, and local dev) traces 10% to keep
  // trace volume (and cost) down. Raise that ratio to 1 to trace everything.
  //
  // Remove this plugin if you are not using OpenTelemetry tracing.
  const isWorkingCopy = environment.ZUPLO_ENVIRONMENT_STAGE === "working-copy";
  runtime.addPlugin(
    new OpenTelemetryPlugin({
      sampling: {
        headSampler: { ratio: isWorkingCopy ? 1 : 0.1 },
      },
    })
  );

  // --- Logging (optional) --------------------------------------------------
  // Ship request logs to Datadog. Other log integrations (New Relic, Splunk,
  // Loki, Dynatrace, and others) follow the same pattern — see the logging
  // overview at https://zuplo.com/docs/articles/logging.
  // Docs: https://zuplo.com/docs/articles/log-plugin-datadog
  //
  // To enable, import the plugin and `environment` from "@zuplo/runtime":
  // runtime.addPlugin(
  //   new DataDogLoggingPlugin({
  //     apiKey: environment.DATADOG_API_KEY,
  //     source: "my-api",
  //   }),
  // );
}
