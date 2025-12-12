import { defineConfig } from "@orval/core";

export default defineConfig({
  api: {
    input: {
      target: "../../docs/openapi/openapi.yaml",
    },
    output: {
      mode: "tags-split",
      target: "./src",
      schemas: "./src/schemas",
      client: "none",
      mock: false,
      override: {
        mutator: {
          path: undefined,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
});





