import { selector } from "recoil";
import cartState from "./atom";

const addedItemsState = selector({
    key: 'getCartItems',
    get: ({get}) => {
      return get(cartState).items
    },
  });

export default addedItemsState