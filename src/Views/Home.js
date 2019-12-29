import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../Components/Header";
import MovieList from "../Actions/MoviesList";

const containerStyles = makeStyles(theme => ({
  root: {
    paddingTop: 30,
    paddingBottom: 30
  }
}));

const Home = () => {
  const containerClasses = containerStyles();
  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        classes={{
          root: containerClasses.root
        }}
      >
        <MovieList />
      </Container>
    </>
  );
};

export default Home;
