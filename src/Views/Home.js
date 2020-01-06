import React, { useState } from "react";

import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../Components/Header";
import MovieList from "../Components/MoviesList";
import MovieModal from "../Components/MovieModal";
import CartContainer from "../Components/CartContainer";
import DeleteDialog from "../Components/DeleteDialog";

const containerStyles = makeStyles(theme => ({
  root: {
    paddingTop: 45,
    paddingBottom: 45,
    maxWidth: 1480
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
      <MovieModal />
      <CartContainer />
      <DeleteDialog />
    </>
  );
};

export default Home;
