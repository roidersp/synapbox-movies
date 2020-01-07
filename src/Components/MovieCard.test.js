import React from "react";
// import {shallow,mount,render} from 'enzyme';
import { MockedProvider } from "@apollo/react-testing";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { actWait } from "../Utils/testUtils";
import { ADD_TO_CART, GET_CART_ITEMS, GET_MOVIE_ID } from "../Actions/queries";
import MovieCard from "./MovieCard";
import { InMemoryCache } from "apollo-cache-inmemory";
import { resolvers } from "../Resolvers";

const mocks = [
  {
    request: {
      query: ADD_TO_CART,
      variables: { id: "ck49086bqsnup0b09d14atpb2" }
    },
    newData: jest.fn(() => ({
      data: {
        cartItems: ["ck49086bqsnup0b09d14atpb2"]
      }
    }))
  }
];

const mockError = [
  {
    request: {
      query: ADD_TO_CART,
      variables: { id: "ck49086bqsnup0b09d14atpb2" }
    },
    result: {
      errors: [new Error("error occurred")]
    }
  }
];

const data = {
  image: "http://static.tvmaze.com/uploads/images/medium_landscape/1/4388.jpg",
  description:
    "When the residents of Chester's Mill find themselves trapped under a massive transparent dome with no way out, they struggle to survive as resources rapidly dwindle and panic quickly escalates.",
  price: 500,
  id: "ck49086bqsnup0b09d14atpb2",
  title: "Pilot"
};

afterEach(cleanup);

describe("<MovieCard>", () => {
  it("snapshot MovieCard", async () => {
    const Wrapper = render(
      <MockedProvider mocks={mocks} addTypename={false} resolvers={{}}>
        <MovieCard {...data} />
      </MockedProvider>
    );
    await actWait();
    expect(Wrapper).toMatchSnapshot();
  });

  it("Expect GridContainer and Card", async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false} resolvers={{}}>
        <MovieCard {...data} />
      </MockedProvider>
    );

    await actWait();

    const Grid = getByTestId("GridCard");
    expect(Grid).toBeInTheDocument();

    const Card = getByTestId("Card");
    expect(Card).toBeInTheDocument();
  });

  it("Add Movie to cart success", async () => {
    const cache = new InMemoryCache();

    cache.writeData({
      data: {
        cartItems: []
      }
    });

    const { getByTestId } = render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        resolvers={resolvers}
        cache={cache}
      >
        <MovieCard {...data} />
      </MockedProvider>
    );

    fireEvent.click(getByTestId("addCartButton"));

    await actWait();

    const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
    expect(cartItems).toContain("ck49086bqsnup0b09d14atpb2");
    expect(cartItems).toHaveLength(1);
  });

  it("Click View movie deatils", async () => {
    const cache = new InMemoryCache();

    const { getByTestId } = render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        resolvers={{}}
        cache={cache}
      >
        <MovieCard {...data} />
      </MockedProvider>
    );

    fireEvent.click(getByTestId("ViewDetails"));

    await actWait();

    const { movieId } = cache.readQuery({ query: GET_MOVIE_ID });

    expect(movieId).toBe("ck49086bqsnup0b09d14atpb2");
  });

  it("Get Loading text", async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false} resolvers={{}}>
        <MovieCard {...data} />
      </MockedProvider>
    );

    fireEvent.click(getByTestId("addCartButton"));

    const loading = getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });
});
