import React from "react";

import gql from "graphql-tag";
import { Query } from "react-apollo";

import Grid from "@material-ui/core/Grid";

import MovieCard from "../Components/MovieCard";
import SearchBox from "../Components/SearchBox";

const GET_MOVIES = gql`
  {
    movies: itemsConnection(where: null, first: 24, after: null) {
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

const MoviesList = ({ action }) => (
  <Query query={GET_MOVIES}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      const { edges: movies } = data.movies;

      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SearchBox action={action} />
          </Grid>
          {movies.map(({ node: movie }, index) => (
            <MovieCard {...movie} key={index} action={action} />
          ))}
        </Grid>
      );
    }}
  </Query>
);

export default MoviesList;
