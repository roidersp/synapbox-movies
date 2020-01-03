import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../Components/Header";
import MovieList from "../Actions/MoviesList";
import MovieModal from "../Components/MovieModal";

const containerStyles = makeStyles(theme => ({
  root: {
    paddingTop: 45,
    paddingBottom: 45,
    maxWidth: 1480
  }
}));

const Home = () => {
  const [movieId, selectMovie] = useState(null);
  const containerClasses = containerStyles();

  const setMovie = id => selectMovie(id);

  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        classes={{
          root: containerClasses.root
        }}
      >
        <MovieList action={setMovie} />
      </Container>
      <MovieModal movieId={movieId} />
    </>
  );
};

export default Home;
