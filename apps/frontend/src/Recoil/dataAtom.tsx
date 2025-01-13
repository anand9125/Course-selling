
import { atom} from "recoil";
import { recoilPersist } from "recoil-persist"; // Default values
const { persistAtom } = recoilPersist();
// Define the type for form data
type FormData = {
  fullName: string;
  username: string;
  password: string;
  createdAt: any;
  profilePic:any;
  updatedAt: any; // Default values
  id:any
};

// Define the Recoil atom with FormData as the type
export const dataAtom = atom<FormData>({
  key: "dataAtom", // Unique key for the atom
  default: {id:"", fullName: "", username: "", password: "", createdAt: "" ,profilePic: "",updatedAt: "" },
  effects_UNSTABLE: [persistAtom],
});

type UploadPicAtom={
  profilePic:any
}
export const uploadPicAtom = atom<UploadPicAtom>({
  key: "uploadPicAtom", // Unique key for the atom
  default: { profilePic: "",},
  effects_UNSTABLE: [persistAtom],
});


