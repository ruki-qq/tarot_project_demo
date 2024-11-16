import { setAutoFreeze } from "immer";

import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { getUser, signIn, singUp } from "./business/auth";
import { isEmpty } from "./utils";

setAutoFreeze(true);

export const useStore = create(
  immer((set) => ({
    isAuthorized: false,
    user: undefined,

    async checkState() {
      const token = localStorage.getItem("token");

      if (!isEmpty(token)) {
        getUser().then((user) => {
          set((state) => {
            state.isAuthorized = true;
            state.user = user;
          });
        });
      }
    },

    async signIn({ login, password }) {
      return signIn({ login, password }).then(({ access_token: token }) => {
        localStorage.setItem("token", token);

        set((state) => {
          state.isAuthorized = true;
          state.user = { id: 0, name: "HR User" };
        });
      });
    },

    async signUp({ login, password }) {
      return singUp({ login, password }).then(() =>
        this.signIn({ login, password })
      );
    },

    async signOut() {
      localStorage.removeItem("token");

      set((state) => {
        state.isAuthorized = false;
      });
    },
  }))
);

export const StoreProvider = ({ children }) => {
  const data = {};

  //   return <Context.Provider value={data}>{children}</Context.Provider>;
  return <>{children}</>;
};
