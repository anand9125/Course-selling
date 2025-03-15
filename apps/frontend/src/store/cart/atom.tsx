import {atom} from "recoil"
interface Courses {
    id: string;
    title: string;
    courseId: string;
    price: number;
    actualPrice: number;
    description: string;
    categoryId: string;
    mentorId: string;
    image: string;
    index: number;
}

export const  cartState = atom<Courses[]>({
    key:"cartAtom",
    default:[],

})
