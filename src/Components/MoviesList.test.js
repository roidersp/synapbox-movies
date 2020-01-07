import React from "react";
// import {shallow,mount,render} from 'enzyme';
import { MockedProvider } from "@apollo/react-testing";
import { render, cleanup } from "@testing-library/react";

import { actWait } from "../Utils/testUtils";
import MovieList from "./MoviesList";
import { GET_MOVIES } from "../Actions/queries";

afterEach(cleanup);

const mocks = [
  {
    request: { query: GET_MOVIES },
    result: {
      data: {
        movies: {
          aggregate: {
            count: 16
          },
          edges: [
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/1/4388.jpg",
                description:
                  "When the residents of Chester's Mill find themselves trapped under a massive transparent dome with no way out, they struggle to survive as resources rapidly dwindle and panic quickly escalates.",
                price: 500,
                id: "ck49086bqsnup0b09d14atpb2",
                title: "Pilot"
              }
            },
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/1/4389.jpg",
                description:
                  "While the residents of Chester's Mill face the uncertainty of life in the dome, panic is heightened when a house goes up in flames and their fire department is outside of the dome.",
                price: 450,
                id: "ck4909pm29tze0b00xnb2nr6p",
                title: "The Fire"
              }
            },
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/1/4390.jpg",
                description:
                  "When a former deputy goes rogue, Big Jim recruits Barbie to join the manhunt to keep the town safe. Meanwhile, Junior is determined to escape the dome by going underground.",
                price: 480,
                id: "ck490aldm9u1p0b00rjizzams",
                title: "Manhunt"
              }
            },
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/1/4391.jpg",
                description:
                  "The people of Chester's Mill fall into a state of panic as an outbreak of meningitis strikes their community, threatening their already depleted medical supplies. Meanwhile, Julia continues to search for answers into her husband's disappearance.",
                price: 550,
                id: "ck490c9os9u7c0b00d1k7fhfj",
                title: "Outbreak"
              }
            },
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/1/4392.jpg",
                description:
                  "The Chester's Mill residents receive an unexpected visit from their loved ones on the other side. Meanwhile, the community braces for a threat from outside the Dome.",
                price: 600,
                id: "ck490czn49u8x0b00ef9jnvmj",
                title: "Blue on Blue"
              }
            },
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/1/4393.jpg",
                description:
                  "When the town begins to run low on water, the residents of Chester's Mill begin to fight for the remaining resources. Meanwhile, Julia discovers a strange connection that two of the town's residents have with the Dome.",
                price: 300,
                id: "ck490dnd79ub10b001t4iqhsu",
                title: "The Endless Thirst"
              }
            },
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/1/4394.jpg",
                description:
                  "Big Jim takes matters into his own hands when he feels his authority slipping away, and the dome displays its power when a life is taken just as a newborn arrives.",
                price: 550,
                id: "ck490efie9ucv0b00q3r241yn",
                title: "Imperfect Circles"
              }
            },
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/1/4395.jpg",
                description:
                  'Junior stands up to his father and is shattered when he discovers the truth about his mother\'s past. Meanwhile, Julia learns firsthand the powers of the "mini dome".',
                price: 600,
                id: "ck490f56b9uev0b00affam3nv",
                title: "Thicker Than Water"
              }
            },
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/1/4396.jpg",
                description:
                  "Big Jim and Barbie discover their lives are more intertwined than they knew when a mysterious woman, Maxine, shows up unexpectedly in Chester's Mill.",
                price: 800,
                id: "ck490fyp09uhh0b004xgp9rfp",
                title: "The Fourth Hand"
              }
            },
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/1/4397.jpg",
                description:
                  "Julia uncovers the truth about her husband's disappearance and unravels some of Chester's Mill's darkest secrets. Meanwhile, Maxine shows Barbie how she plans to take control of the town.",
                price: 400,
                id: "ck490gr3f9uj10b00rzp1gl4g",
                title: "Let the Games Begin"
              }
            },
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/1/4398.jpg",
                description:
                  "Big Jim turns the town against Barbie when the truth about his past is revealed. Meanwhile, Maxine makes it personal when she confronts Barbie's closest ally.",
                price: 300,
                id: "ck490hg3x9ule0b00bfqqkpii",
                title: "Speak of the Devil"
              }
            },
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/1/4399.jpg",
                description:
                  "While the manhunt for Barbie continues, Big Jim gets the residents of Chester's Mill riled up and the town demands justice for all of Barbie's supposed crimes. Meanwhile, Joe and Norrie must find a new hiding place for the mini dome.",
                price: 350,
                id: "ck490i7lp9unb0b00lawa8vc2",
                title: "Exigent Circumstances"
              }
            },
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/1/4400.jpg",
                description:
                  "Secrets of the Dome are revealed and Big Jim is determined to put an end to Barbie once and for all. Meanwhile, Junior, Angie, Joe and Norrie discover who the Monarch is after receiving a shocking visit from a familiar face.",
                price: 440,
                id: "ck490k65m9utl0b007tb6o02f",
                title: "Curtains"
              }
            },
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/4/10446.jpg",
                description:
                  "Barbie's fate lies in Big Jim's hands, and the Dome presents a new threat when it becomes magnetized. Meanwhile, Julia seeks out the help of a stranger to save the life of a mysterious girl who may hold clues to origin of the Dome.",
                price: 550,
                id: "ck490ldqrsoh40b095sctiuig",
                title: "Heads Will Roll"
              }
            },
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/4/10447.jpg",
                description:
                  "Barbie risks his life to help Rebecca save the Chester's Mill food supply when she discovers an infestation of butterfly eggs on the town's crops.",
                price: 1000,
                id: "ck490m89s9v0p0b00q7c5k0ew",
                title: "Infestation"
              }
            },
            {
              node: {
                image:
                  "http://static.tvmaze.com/uploads/images/medium_landscape/4/10448.jpg",
                description:
                  "When tensions in Chester's Mill continue to rise as resources dwindle, Big Jim holds a census in order to forecast how long the town can continue to exist under the dire conditions. Meanwhile, a rainstorm brings much-needed water until it changes to acid rain, threatening the lives of everyone it touches. Also, Rebecca and Lyle butt heads over the reasons for the dome's existence.",
                price: 200,
                id: "ck490n16isok60b090jqnbv20",
                title: "Force Majeure"
              }
            }
          ],
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

const mockError = [
  {
    request: { query: GET_MOVIES },
    result: {
      errors: [new Error("fake error")]
    }
  }
];

describe("<MovieList />", () => {
  it("snapshot", async () => {
    const Wrapper = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MovieList />
      </MockedProvider>
    );
    await actWait();
    expect(Wrapper).toMatchSnapshot();
  });

  it("expected title on items", async () => {
    const { queryByText, container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MovieList />
      </MockedProvider>
    );
    await actWait();
    expect(queryByText(/Pilot/)).toBeTruthy();
    expect(queryByText(/Force Majeure/)).toBeTruthy();
  });

  it("Expect GridContainer", async () => {
    const { getByTestId, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MovieList />
      </MockedProvider>
    );

    await actWait();

    const Grid = getByTestId("GridContainer");

    expect(Grid).toBeInTheDocument();
  });

  it("Get query error", async () => {
    const { getByTestId, queryByText } = render(
      <MockedProvider mocks={mockError} addTypename={false}>
        <MovieList />
      </MockedProvider>
    );

    await actWait();

    expect(queryByText("Error! GraphQL error: fake error")).toBeTruthy();
  });
});
