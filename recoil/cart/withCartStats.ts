import { selector } from "recoil";
import cartState from "./atom";

const cartStatsState = selector({
    key: 'getCartStats',
    get: ({get}) => {
        const cartStats = get(cartState)
      return {
        total: cartStats.total,
        totalPrice: cartStats.totalPrice
      }
    },
  });

export default cartStatsState