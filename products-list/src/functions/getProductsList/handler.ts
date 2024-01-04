import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support";
import { formatJSONResponse } from "../../libs/api-gateway";

interface Product {
  id: string;
  title: string;
  price: number;
}

const data: Product[] = [
  {
    id: "7567ec4b-b10c-48c5-9355-fc73c48a80a1",
    title: "MacBook Pro",
    price: 1800,
  },
  {
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    title: "Toshiba laptop",
    price: 890,
  },
  {
    id: "7567ec4b-b10c-48c5-9323-fc73c48a80a1",
    title: "Sony Vaio",
    price: 1000,
  },
  { id: "7567ec4b-b10c-48c5-9345-fc73c90a80a1", title: "Lenovo", price: 990 },
  {
    id: "7567ec4b-d10c-49c5-9345-fc73c90brt90",
    title: "HP Ultrabook",
    price: 870,
  },
];

export const getProductsList: APIGatewayProxyHandler = async (event) => {
  try {
    const response = formatJSONResponse(data, 200, {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    });
    console.log("Event:", JSON.stringify(event, null, 2));
    return response;
  } catch (error) {
    console.error("Error:", error);

    const errorResponse = formatJSONResponse(
      { error: "Internal Server Error" },
      500,
      {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      }
    );
    return errorResponse;
  }
};
