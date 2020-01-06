import gql from "graphql-tag";
import { GET_CART_ITEMS } from "./Actions/queries";

export const resolvers = {
  Mutation: {
    addToCart: (_, { id }, { cache }) => {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });

      const data = {
        cartItems: !cartItems.includes(id) ? [...cartItems, id] : cartItems
      };

      cache.writeQuery({ query: GET_CART_ITEMS, data });
      return data.cartItems;
    },
    deleteFromCart: (_, { id }, { cache }) => {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });

      const data = {
        cartItems: cartItems.includes(id)
          ? cartItems.filter(i => i !== id)
          : cartItems
      };

      cache.writeQuery({ query: GET_CART_ITEMS, data });
      return cartItems.includes(id);
    }
  }
};

export const typeDefs = `
  extend type Mutation {
    addToCart(id: ID!)
    deleteFromCart(id: ID!)
  }
`;
