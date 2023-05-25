import { ItemModel, PreBookingJobModel } from "@/dataStructure";
import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const cartState = atom({
    key: 'cartState',
    default: {
        items: [] as ItemModel[],
        preBookingData: {} as PreBookingJobModel,
        total: 0,
        totalPrice: 0
    },
    effects_UNSTABLE: [persistAtom]
})

export default cartState