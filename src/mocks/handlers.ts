import { rest } from "msw";
import API_PATHS from "../constants/apiPaths";
import { availableProducts, orders, products, cart } from "../mocks/data";

export const handlers = [
  rest.get(`${API_PATHS.bff}/product`, () => {
    console.log('Captured a "GET /products" request');
  }),
];

// export const handlers = [
//   http.get(`${API_PATHS.bff}/product`, ({ res, ctx }) => {
//     return res(ctx.status(200), ctx.delay(), ctx.json(products));
//   }),
//   http.put(`${API_PATHS.bff}/product`, ({ res, ctx }) => {
//     return res(ctx.status(200));
//   }),
//   http.delete(`${API_PATHS.bff}/product/:id`, ({ res, ctx }) => {
//     return res(ctx.status(200));
//   }),
//   http.get(`${API_PATHS.bff}/product/available`, ({ res, ctx }) => {
//     return res(ctx.status(200), ctx.delay(), ctx.json(availableProducts));
//   }),
//   http.get(`${API_PATHS.bff}/product/:id`, ({ req, res, ctx }) => {
//     const product = availableProducts.find((p) => p.id === req.params.id);
//     if (!product) {
//       return res(ctx.status(404));
//     }
//     return res(ctx.status(200), ctx.delay(), ctx.json(product));
//   }),
//   http.get(`${API_PATHS.cart}/profile/cart`, ({ res, ctx }) => {
//     return res(ctx.status(200), ctx.delay(), ctx.json(cart));
//   }),
//   http.put(`${API_PATHS.cart}/profile/cart`, ({ res, ctx }) => {
//     return res(ctx.status(200));
//   }),
//   http.get(`${API_PATHS.order}/order`, ({ res, ctx }) => {
//     return res(ctx.status(200), ctx.delay(), ctx.json(orders));
//   }),
//   http.put(`${API_PATHS.order}/order`, ({ res, ctx }) => {
//     return res(ctx.status(200));
//   }),
//   http.get(`${API_PATHS.order}/order/:id`, ({ req, res, ctx }) => {
//     const order = orders.find((p) => p.id === req.params.id);
//     if (!order) {
//       return res(ctx.status(404));
//     }
//     return res(ctx.status(200), ctx.delay(), ctx.json(order));
//   }),
//   http.delete(`${API_PATHS.order}/order/:id`, ({ res, ctx }) => {
//     return res(ctx.status(200));
//   }),
//   http.put(`${API_PATHS.order}/order/:id/status`, ({ res, ctx }) => {
//     return res(ctx.status(200));
//   }),
// ];
