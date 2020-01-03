import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import * as serviceWorker from "./serviceWorker";

import theme from "./theme";
import Home from "./Views/Home";
import { GET_CART_ITEMS } from "./Actions/queries";
// import resolvers from './Resolvers';

const apiURL = "https://us1.prisma.sh/john-a-agudelo-e911b8/johnaagudelodb/dev";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: apiURL
});

const client = new ApolloClient({
  cache,
  link,
  resolvers: {
    itemsConnection: {
      isInCart: (Movie, _, { cache }) => {
        console.log("isInCart", Movie);
        const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
        return cartItems.includes(id);
      }
    },
    Mutation: {
      addToCart: (_, { id }, { cache }) => {
        const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });

        const data = {
          cartItems: !cartItems.includes(id) ? [...cartItems, id] : cartItems
        };

        cache.writeQuery({ query: GET_CART_ITEMS, data });
        return data.cartItems;
      }
    }
  },
  typeDefs: `
    type Query {
      cartItems: [ID!]!
    }
    type Mutation {
      addToCart(id: ID!)
    }
    type itemsConnection{
      isInCart: Boolean!
    }
  `
});

cache.writeData({
  data: {
    cartItems: [],
    movieId: null
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
