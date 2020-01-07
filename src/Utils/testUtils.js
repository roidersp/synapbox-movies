import wait from "waait";
import { act } from "@testing-library/react";

export const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};
