
import { CustomerInfo } from "@/dataStructure/customerInfo";
import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const userInforState = atom({
    key: 'UserInfor',
    default: {
        phoneNumber: '',
        name: '',
        address: '',
        note: '',
    }as CustomerInfo,
    effects_UNSTABLE: [persistAtom]
})

export default userInforState