import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import { InMemoryCache } from "apollo-cache-inmemory";
import { actWait } from "../Utils/testUtils";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { GET_CART_ITEMS, CART_IS_OPEN } from "../Actions/queries";
import { resolvers, typeDefs } from "../Resolvers";

import Header from "./Header";

afterEach(cleanup);

const mocks = [
  {
    request: { query: GET_CART_ITEMS },
    result: {
      data: {
        cartItems: ["ck49086bqsnup0b09d14atpb2", "ck4909pm29tze0b00xnb2nr6p"]
      }
    }
  }
];

describe("Header testing", () => {
  it("snapshot", async () => {
    const cache = new InMemoryCache();

    cache.writeData({
      data: {
        cartItems: [],
        cartIsOpen: false
      }
    });

    const Wrapper = render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        resolvers={{}}
        cache={cache}
      >
        <Header />
      </MockedProvider>
    );
    await actWait();
    expect(Wrapper).toMatchSnapshot();
  });
  it("Should show title", async () => {
    const cache = new InMemoryCache();

    cache.writeData({
      data: {
        cartItems: [],
        cartIsOpen: false
      }
    });

    const { queryByText } = render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        resolvers={{}}
        cache={cache}
      >
        <Header />
      </MockedProvider>
    );

    await actWait();

    expect(queryByText("Synapbox Movies")).toBeTruthy();
  });

  it("Click open cart", async () => {
    const cache = new InMemoryCache();

    cache.writeData({
      data: {
        cartItems: [],
        cartIsOpen: false
      }
    });

    const { getByTestId } = render(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        resolvers={{}}
        cache={cache}
      >
        <Header />
      </MockedProvider>
    );

    fireEvent.click(getByTestId("openCart"));

    await actWait();

    const { cartIsOpen } = cache.readQuery({ query: CART_IS_OPEN });

    expect(cartIsOpen).toBeTruthy();
  });
});
