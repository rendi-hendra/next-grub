import { create } from "zustand";
import { api } from "@/lib/api";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";

interface Store {
  count: number;
  data: [];
  grub: string;
  hello: string;
  session: string;
  errors: string | null;
  members: [];
  increase: () => void;
  decrease: () => void;
  sayHello: () => void;
  fetchGrub: () => void;
  getSession: () => void;
  getAllMembers: (grubId: string) => void;
}

const useStore = create<Store>((set) => ({
  count: 0,
  hello: "Hello",
  data: [],
  session: null,
  errors: null,
  grub: null,
  members: [],

  increase: () =>
    set((state: { count: number }) => ({ count: state.count + 1 })),
  decrease: () =>
    set((state: { count: number }) => ({ count: state.count - 1 })),

  sayHello: () => {
    set((state: { hello: string }) => ({
      hello: state.hello == "Hello" ? "Test" : "Hello",
    }));
  },

  getSession: async () => {
    const token = await auth();
    if (!token.user) return null;
    set((state: { session: string }) => ({
      session: state.session,
    }));
    // console.log(token);

    // set({ session: token.user.token as string})
  },

  fetchGrub: async () => {
    const token = (await getSession()).user.token;
    set({ errors: null });
    try {
      const response = await api.get("/grubs", {
        headers: { Authorization: token },
      });
      // console.log(response.data.data);

      set({ data: response.data.data });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ errors: error.message });
    }
  },

  getAllMembers: async (grubId: string) => {
    const token = (await getSession()).user.token;
    set({ errors: null });
    try {
      const response = await api.get(`/grubs/${grubId}/member`, {
        headers: { Authorization: token },
      });

      // console.log(response.data.data);
      console.log(token);

      set({ members: await response.data.data });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ errors: error.message });
    }
  },
}));

export default useStore;
