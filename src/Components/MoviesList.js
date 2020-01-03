import React from "react";

import { Query } from "react-apollo";

import Grid from "@material-ui/core/Grid";

import MovieCard from "./MovieCard";
import SearchBox from "./SearchBox";

import { GET_MOVIES } from "../Actions/queries";

const MoviesList = () => (
  <Query query={GET_MOVIES}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      const { edges: movies } = data.movies;

      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SearchBox />
          </Grid>
          {movies.map(({ node: movie }, index) => (
            <MovieCard {...movie} key={index} />
          ))}
        </Grid>
      );
    }}
  </Query>
);

export default MoviesList;
