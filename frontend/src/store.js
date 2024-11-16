import { setAutoFreeze } from "immer";

import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { API_URL } from "./constants";
import { type } from "@testing-library/user-event/dist/type";

setAutoFreeze(true);

export const useStore = create(
  immer((set) => ({
    isAuthorized: false,
    user: undefined,

    async checkState() {
      const token = localStorage.getItem("token");

      if (token !== null && typeof token !== "undefined") {
        // TODO: validate token
        // TODO: get user
        set((state) => {
          state.isAuthorized = true;
          state.user = { id: 0, name: "HR User" };
        });
      }
    },

    async signIn({ login, password }) {
      // axios.post(`${API_URL}/user/signin`, { login, password });

      localStorage.setItem("token", "test-token");

      set((state) => {
        state.isAuthorized = true;
        state.user = { id: 0, name: "HR User" };
      });
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
