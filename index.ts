import { APIGatewayProxyResult } from "aws-lambda";

exports.handler = async (): Promise<APIGatewayProxyResult> => {
  const products = [
    { id: 1, name: "Product 1", price: 20.99 },
    { id: 2, name: "Product 2", price: 15.49 },
  ];

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(products),
  };

  return response;
};
