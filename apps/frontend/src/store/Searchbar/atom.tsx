import {atom} from "recoil"
export const searchQueryState = atom<string>({
    key:"searchQueryState",
    default:""
})

export const sideSearchQuery = atom<string>({
    key:"sideSearchQuery",
    default:""
})