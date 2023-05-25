import { selector } from "recoil";
import cartState from "./atom";

const preBookingState = selector({
    key: 'getPreBookingData',
    get: ({get}) => {
      return get(cartState).preBookingData
    },
  });

export default preBookingState