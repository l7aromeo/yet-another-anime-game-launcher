import { defineConfig, InlineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import { UserConfig } from "vite";

export default defineConfig ({
  plugins: [tsconfigPaths(), {
    name: "channel-client switcher",
    load:  (id) => {
      if(id.endsWith("/src/clients/index.ts")) {
        const cc = process.env["YAAGL_CHANNEL_CLIENT"] ?? "hk4ecn";
        console.info(`Building channel client ${cc}`);
        return `export * from './${cc}'`;
      }
      return null;
    }
  }, solidPlugin()],
  envPrefix: ["VITE_", "YAAGL_"],
  build: {
    target: "safari13",
    minify: true,
    sourcemap: false,
    outDir: "dist",
  },
  test: {
    include: ["src/**/*.spec.ts"],
    environment: "node",
  },
} as UserConfig & { test?: InlineConfig });