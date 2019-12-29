import React from "react";
import ReactDOM from "react-dom";

import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import * as serviceWorker from "./serviceWorker";

import theme from "./theme";
import Home from "./Views/Home";
// import resolvers from './Resolvers';

const apiURL = "https://us1.prisma.sh/john-a-agudelo-e911b8/johnaagudelodb/dev";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: apiURL
});

const client = new ApolloClient({
  cache,
  link
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
