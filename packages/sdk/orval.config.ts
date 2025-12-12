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
      client: "axios",
      mock: false,
      override: {
        mutator: {
          path: undefined,
        },
        operations: {
          operationName: (operation, route, method) => {
            return `${method}${route
              .split("/")
              .map((segment) =>
                segment
                  .replace(/[{}]/g, "")
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join("")
              )
              .join("")}`;
          },
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
});




