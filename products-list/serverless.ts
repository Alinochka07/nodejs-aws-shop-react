import type { AWS } from "@serverless/typescript";

// import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: "products-list",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    region: "eu-west-1",
  },
  functions: {
    getProductsList: {
      handler: "./src/functions/getProductsList/index.getProductsList",
      events: [
        {
          http: {
            path: "products",
            method: "get",
            cors: {
              origin: "*",
            },
          },
        },
      ],
    },
    getProductsById: {
      handler: "./src/functions/getProductsById/index.getProductsById",
      events: [
        {
          http: {
            path: "products/{productId}",
            method: "get",
            cors: {
              origin: "*",
            },
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
