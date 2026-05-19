import {
  defineConfig
} from "../chunk-RMXLWNCE.mjs";
import "../chunk-RA6RHLTU.mjs";
import {
  init_esm
} from "../chunk-NKKWNCEX.mjs";

// trigger.config.ts
init_esm();
var trigger_config_default = defineConfig({
  project: process.env.TRIGGER_PROJECT_REF || "proj_placeholder",
  runtime: "node",
  dirs: ["trigger"],
  maxDuration: 3600,
  logLevel: "info",
  retries: {
    enabledInDev: false,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1e3,
      maxTimeoutInMs: 1e4,
      factor: 2
    }
  },
  build: {}
});
var resolveEnvVars = void 0;
export {
  trigger_config_default as default,
  resolveEnvVars
};
//# sourceMappingURL=trigger.config.mjs.map
