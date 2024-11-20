import { create } from "zustand";
// import axios from 'axios';

type UserStore = {
  email: string;
  setUseremail: (email: string) => void;

  // username: string;
  // setUsernameAsync: () => Promise<void>;
  username :string;
  setUsername: (username: string) => void;

  publicKey: string;
  setPublicKey: (publicKey: string) => void;

  isAuth : boolean;
  setAuth :(isAuth : boolean)=> void;
};

export const useUserStore = create<UserStore>((set) => ({
  email: "",
  setUseremail: (email: string) => set({ email }),

  // username: "",
  // setUsernameAsync: async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3600/api/v1/tnx/getUser', {
  //       params: { email: get().email },
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     const username = response.data.username;
  //     set({ username });
  //   } catch (error) {
  //     console.error("Error fetching username:", error);
  //   }
  // },
  username: "",
  setUsername: (username: string) => set({ username }),
  publicKey: "",
  setPublicKey: (publicKey: string) => set({ publicKey }),

  isAuth : false,

  setAuth : (isAuth : boolean) => set({isAuth})
}));




