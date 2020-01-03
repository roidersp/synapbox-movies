import React, { useState } from "react";

import {
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Paper
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

import SearchList from "./SearchList";

const styles = makeStyles(theme => ({
  mainContainer: {
    maxWidth: 800,
    marginBottom: 20,
    position: "relative"
  },
  listContainer: {
    width: "100%",
    position: "absolute",
    top: "102%",
    left: 0,
    zIndex: 10
  },
  paperList: {
    padding: "20px 10px",
    width: "100%",
    border: `1px solid ${theme.palette.primary.main}`
  }
}));

const SearchBox = () => {
  const [searchValue, setValue] = useState("");

  const handleChange = event => {
    setValue(event.target.value);
  };

  const cleanInput = () => {
    setValue("");
  };

  const classes = styles();

  return (
    <Container className={classes.mainContainer}>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-amount">Buscar</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          onChange={handleChange}
          value={searchValue}
          endAdornment={
            <InputAdornment position="start">
              <IconButton onClick={cleanInput}>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={48}
        />
      </FormControl>
      {searchValue && (
        <Container className={classes.mainContainer} fixed>
          <Paper className={classes.listContainer}>
            <SearchList searchValue={searchValue} />
          </Paper>
        </Container>
      )}
    </Container>
  );
};

export default SearchBox;
