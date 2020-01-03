import React from "react";

import gql from "graphql-tag";
import { Query } from "react-apollo";

import {
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  ListItemText,
  Avatar
} from "@material-ui/core";

const GET_SEARCH_MOVIES = gql`
  query search($searchValue: String!) {
    movies: itemsConnection(
      where: { title_contains: $searchValue }
      first: 5
      after: null
    ) {
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
        endCursor
      }
    }
  }
`;

const SearchItem = ({ title, image, index }) => (
  <>
    {index !== 0 ? <Divider /> : null}
    <ListItem alignItems="center" key={title} button>
      <ListItemAvatar>
        <Avatar alt={title} src={image} />
      </ListItemAvatar>
      <ListItemText>{title}</ListItemText>
    </ListItem>
  </>
);

const SearchList = ({ searchValue }) => (
  <Query query={GET_SEARCH_MOVIES} variables={{ searchValue }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error! ${error}`;

      const { edges: list } = data.movies;

      if (list.length === 0) return <div>Sin resultados</div>;

      return (
        <List>
          {list.map(({ node }, index) => (
            <SearchItem {...node} index={index} key={index} />
          ))}
        </List>
      );
    }}
  </Query>
);

export default SearchList;
