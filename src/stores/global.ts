import DataService from "@/services/DataService";
import { Circle, Voucher } from "@/types/Global";
import { defineStore } from "pinia";

export const useGlobal = defineStore("main", {
  state: () => {
    return {
      plans: [],
      circles: undefined as Circle[] | undefined,
      voucherType: [
        { id: 1, name: "Topup" },
        { id: 2, name: "Data" },
        { id: 3, name: "Voice" },
        { id: 4, name: "SMS" },
        { id: 5, name: "ISD" },
        { id: 6, name: "Other Vouchers" },
      ] as Voucher[],
    };
  },
  getters: {
    getAllVouchers(): Voucher[] {
      return this.voucherType;
    },
  },
  actions: {
    async getCircles() {
      const {
        data: {
          ROWSET: { ROW: circles },
        },
      } = await DataService.getCircles();

      this.circles = circles;
    },
  },
});
