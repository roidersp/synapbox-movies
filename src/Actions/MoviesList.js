import React from "react";

import gql from "graphql-tag";
import { Query } from "react-apollo";

import Grid from "@material-ui/core/Grid";

import MovieCard from "../Components/MovieCard";

const GET_MOVIES = gql`
  {
    movies: itemsConnection(where: null, first: 12, after: null) {
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

const MoviesList = () => (
  <Query query={GET_MOVIES}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      const { edges: movies } = data.movies;

      return (
        <Grid container spacing={2}>
          {movies.map(({ node: movie }) => (
            <MovieCard {...movie} />
          ))}
        </Grid>
      );
    }}
  </Query>
);

export default MoviesList;
