import gql from "graphql-tag";

export const ADD_TO_CART = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) @client
  }
`;

export const DELETE_FROM_CART = gql`
  mutation deleteFromCart($id: ID!) {
    deleteFromCart(id: $id) @client
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

export const GET_MOVIE = gql`
  query($id: ID!) {
    movie: item(where: { id: $id }) {
      id
      title
      description
      largeImage
      price
    }
  }
`;

export const IS_IN_CART = gql`
  query isInCart($id: ID!) {
    isInCart(id: $id) @client
  }
`;

export const CART_IS_OPEN = gql`
  {
    cartIsOpen @client
    cartItems @client
  }
`;

export const CONFIRM_DELETE = gql`
  {
    dialogDelete @client {
      open
      movie {
        id
        title
        image
      }
    }
  }
`;

export const HANDLE_CONFIRM_DELETE = gql`
  {
    dialogDelete @client {
      open
      Movie
    }
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

export const GET_MOVIES_BY_ID = gql`
  query search($ids: [ID!]) {
    movies: items(where: { id_in: $ids }) {
      id
      title
      image
      price
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
