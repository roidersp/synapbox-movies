import React from "react";

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { GET_SEARCH_MOVIES } from "../Actions/queries";

import {
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  ListItemText,
  Avatar
} from "@material-ui/core";

const SearchItem = ({ id, title, image, index, client }) => (
  <>
    {index !== 0 ? <Divider /> : null}
    <ListItem
      alignItems="center"
      key={title}
      button
      onClick={() => client.writeData({ data: { movieId: id } })}
    >
      <ListItemAvatar>
        <Avatar alt={title} src={image} />
      </ListItemAvatar>
      <ListItemText>{title}</ListItemText>
    </ListItem>
  </>
);

const SearchList = ({ searchValue }) => (
  <Query query={GET_SEARCH_MOVIES} variables={{ searchValue }}>
    {({ loading, error, data, client }) => {
      if (loading) return null;
      if (error) return `Error! ${error}`;

      const { edges: list } = data.movies;

      if (list.length === 0) return <div>Sin resultados</div>;

      return (
        <List>
          {list.map(({ node }, index) => (
            <SearchItem {...node} index={index} key={index} client={client} />
          ))}
        </List>
      );
    }}
  </Query>
);

export default SearchList;
