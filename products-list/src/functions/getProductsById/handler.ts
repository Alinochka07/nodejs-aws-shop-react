import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
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

export const getProductsById: APIGatewayProxyHandler = async (event) => {
  try {
    console.log("Event:", event);
    const productId = event.pathParameters?.productId;

    console.log("Parsed productId:", productId);

    if (!productId) {
      throw new Error("Invalid productId parameter");
    }

    const searchedProduct = data.find((product) => product.id === productId);

    if (!searchedProduct) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    // Define headers for the response
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    };

    return formatJSONResponse(
      {
        product: searchedProduct,
      },
      200,
      headers
    );
  } catch (error) {
    throw error;
  }
  // try {
  //   console.log("Event:", event);
  //   const productId = event.pathParameters?.productId;

  //   console.log("Parsed productId:", productId);

  //   if (!productId) {
  //     throw new Error("Invalid productId parameter");
  //   }

  //   const searchedProduct = data.find((product) => product.id === productId);

  //   if (!searchedProduct) {
  //     return formatJSONResponse(
  //       {
  //         error: `Product with ID ${productId} not found`,
  //       },
  //       404
  //     );
  //   }

  //   return formatJSONResponse({
  //     product: searchedProduct,
  //   });
  // } catch (error) {
  //   const message =
  //     error instanceof Error ? error.message : "An unexpected error occurred";

  //   return formatJSONResponse(
  //     {
  //       error: message,
  //     },
  //     400
  //   );
  // }
};
