import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { actWait } from "../Utils/testUtils";
import {
  GET_SEARCH_MOVIES,
  GET_CART_ITEMS,
  GET_MOVIE_ID
} from "../Actions/queries";
import MovieCard from "./MovieCard";
import { InMemoryCache } from "apollo-cache-inmemory";
import { resolvers } from "../Resolvers";
import { renderHook, act } from "@testing-library/react-hooks";

import SearchBox from "./SearchBox";

const mocks = [
  {
    request: { query: GET_SEARCH_MOVIES, variables: { searchValue: "the" } },
    result: {
      data: {
        movies: {
          aggregate: {
            count: 0
          },
          edges: [],
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: false,
            startCursor: "ck49086bqsnup0b09d14atpb2",
            endCursor: "ck490n16isok60b090jqnbv20"
          }
        }
      }
    }
  }
];

describe("<SearchBox />", () => {
  it("snapshot SearchBox", () => {
    const Wrapper = render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        resolvers={{}}
        cache={{}}
      >
        <SearchBox />
      </MockedProvider>
    );
    expect(Wrapper).toMatchSnapshot();
  });

  it("Input onChange", async () => {
    const { getByTestId, getByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false} resolvers={{}}>
        <SearchBox />
      </MockedProvider>
    );

    const Input = getByLabelText("Buscar");

    fireEvent.change(Input, { target: { value: "the" } });
    await actWait();

    expect(getByTestId("SearchContainer")).toBeTruthy();
  });

  it("Clean input", async () => {
    const { getByTestId, getByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false} resolvers={{}}>
        <SearchBox />
      </MockedProvider>
    );

    fireEvent.click(getByTestId("cleanInput"));
    await actWait();

    expect(getByLabelText("Buscar").value).toBe("");
  });
});
