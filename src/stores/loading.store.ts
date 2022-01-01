import { defineStore } from "pinia";

interface LoadingState {
  loading: any;
}

export const useLoadingState = defineStore("loading", {
  state: () => {
    return {
      loading: true,
    };
  },
  actions: {
    setLoading(state: boolean) {
      this.loading = state;
    },
  },
});
