import gql from "graphql-tag";

export const ADD_TO_CART = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) @client
  }
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export const GET_MOVIE_ID = gql`
  {
    movieId @client
  }
`;

export const IS_IN_CART = gql`
  query isInCart($id: ID!) {
    isInCart(id: $id) @client
  }
`;

export const GET_MOVIES = gql`
  {
    movies: itemsConnection(where: null, first: 16, after: null) {
      aggregate {
        count
      }
      edges {
        node {
          id
          title
          description
          image
          price
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_SEARCH_MOVIES = gql`
  query search($searchValue: String!) {
    movies: itemsConnection(
      where: { title_contains: $searchValue }
      first: 5
      after: null
    ) {
      edges {
        node {
          id
          title
          description
          image
          price
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
