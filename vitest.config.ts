import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      // `server-only` ships a guard that throws outside an RSC bundler; in the
      // Node test runner we map it to an empty module so server utilities can be
      // imported and unit-tested directly.
      "server-only": path.resolve(__dirname, "test-stubs/server-only.ts"),
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
});
