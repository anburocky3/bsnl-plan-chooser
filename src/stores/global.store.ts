import DataService from "@/services/DataService";
import PrepaidDataService from "@/services/PrepaidDataService";
import { Circle, VoucherPrice, VoucherTypes } from "@/types/Global.types";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useGlobal = defineStore("main", {
  state: () => {
    return {
      plans: [] as VoucherPrice[],
      circles: undefined as Circle[] | undefined,
      voucherTypes: [
        {
          id: 1,
          category: "TOPUP",
          name: "Topup",
          color: `hsla(${~~(360 * Math.random())},70%,20%,1)`,
          icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
        },
        {
          id: 2,
          category: "STV",
          name: "Voice",
          color: `hsla(${~~(360 * Math.random())},70%,30%,1)`,
          icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
        },
        {
          id: 3,
          category: "STV",
          name: "Data",
          color: `hsla(${~~(360 * Math.random())},70%,20%,1)`,
          icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
        },
        {
          id: 4,
          category: "STV",
          name: "SMS",
          color: `hsla(${~~(360 * Math.random())},70%,12%,1)`,
          icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
        },
        {
          id: 5,
          category: "STV",
          name: "ISD",
          color: `hsla(${~~(360 * Math.random())},70%,16%,1)`,
          icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
        },
        {
          id: 6,
          category: "STV",
          name: "Other",
          color: `hsla(${~~(360 * Math.random())},70%,18%,1)`,
          icon: `M7 20l4-16m2 16l4-16M6 9h14M4 15h14`,
        },
        {
          id: 7,
          category: "PLAN",
          name: "Extension",
          color: `hsla(${~~(360 * Math.random())},70%,18%,1)`,
          icon: `M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4`,
        },
        {
          id: 8,
          category: "PLAN",
          name: "Migration",
          color: `hsla(${~~(360 * Math.random())},70%,18%,1)`,
          icon: `M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z`,
        },
      ] as VoucherTypes[],
      sortFilters: [
        {
          name: "By Low",
        },
        {
          name: "Value for Money",
        },
        {
          name: "By Validity",
        },
        {
          name: "By High",
        },
      ],
      modal: reactive({
        state: false,
        title: "Getting latest plans",
        description:
          "Kindly wait, We are fetching the data from BSNL Servers. This will take few moments based on your internet connection.",
      }),
    };
  },
  getters: {
    getAllVouchers(): VoucherTypes[] {
      return this.voucherTypes;
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

      return circles;
    },
    async getAllPackages() {
      const {
        data: { data: topupPlans },
      } = await PrepaidDataService.getPlans("TOPUP", "TOPUP", "3", "S");
      const {
        data: { data: voicePlans },
      } = await PrepaidDataService.getPlans("STV", "VOICE", "3", "S");
      const {
        data: { data: dataPlans },
      } = await PrepaidDataService.getPlans("STV", "DATA", "3", "S");
      const {
        data: { data: smsPlans },
      } = await PrepaidDataService.getPlans("STV", "SMS", "3", "S");
      const {
        data: { data: isdPlans },
      } = await PrepaidDataService.getPlans("STV", "ISD", "3", "S");
      const {
        data: { data: otherPlans },
      } = await PrepaidDataService.getPlans("STV", "OTHER", "3", "S");
      const {
        data: { data: planExtensionPlans },
      } = await PrepaidDataService.getPlans("PLAN", "EXTENSION", "3", "S");
      const {
        data: { data: planMigrationPlans },
      } = await PrepaidDataService.getPlans("PLAN", "MIGRATION", "3", "S");

      const bundlePackages = [
        ...topupPlans.map((plans: object) => ({
          ...plans,
          voucherType: "TOPUP",
        })),
        ...voicePlans.map((plans: object) => ({
          ...plans,
          voucherType: "VOICE",
        })),
        ...dataPlans.map((plans: object) => ({
          ...plans,
          voucherType: "DATA",
        })),
        ...smsPlans.map((plans: object) => ({
          ...plans,
          voucherType: "SMS",
        })),
        ...isdPlans.map((plans: object) => ({
          ...plans,
          voucherType: "ISD",
        })),
        ...otherPlans.map((plans: object) => ({
          ...plans,
          voucherType: "OTHER",
        })),
        ...planExtensionPlans.map((plans: object) => ({
          ...plans,
          voucherType: "EXTENSION",
        })),
        ...planMigrationPlans.map((plans: object) => ({
          ...plans,
          voucherType: "MIGRATION",
        })),
      ];
      this.plans = bundlePackages;

      return bundlePackages;
    },
    async getInitialAllDatas() {
      let mins = 30; // Reset when storage is more than 30mins
      let now: any = Date.now();

      const setupTimeStorage: any = localStorage.getItem("setupTimeStorage");

      if (setupTimeStorage == null) {
        // console.log('setupTime is null');
        this.modal.state = true;
        // Fetch data from bsnl apis.
        const allPlansData = await this.getAllPackages();
        const allCirclesData = await this.getCircles();

        localStorage.setItem("plansData", JSON.stringify(allPlansData));
        localStorage.setItem("circlesData", JSON.stringify(allCirclesData));
        localStorage.setItem("setupTimeStorage", now); // setting up the fresh time

        this.modal.state = false; // done downloading, now hide modal
        // } else if (now - setupTime > hours * 60 * 60 * 1000) {
      } else if (now - setupTimeStorage > mins * 60 * 1000) {
        console.log("Time exceeded, setting new data");
        localStorage.clear();

        this.modal.state = true;
        // Fetch data from bsnl apis.
        const allPlansData = await this.getAllPackages(); //get all plans
        const allCirclesData = await this.getCircles(); //get all circles

        localStorage.setItem("plansData", JSON.stringify(allPlansData));
        localStorage.setItem("circlesData", JSON.stringify(allCirclesData));
        localStorage.setItem("setupTimeStorage", now); // setting up the fresh time

        this.modal.state = false;
      }
      // Probably data exist. So fetch it and save to store.
      else {
        this.modal.state = false;

        const existedPlansData = localStorage.getItem("plansData");
        const existedCirclesData = localStorage.getItem("circlesData");
        const parsedPlansData = JSON.parse(existedPlansData!);
        const parsedCirclesData = JSON.parse(existedCirclesData!);

        this.$patch({ plans: parsedPlansData, circles: parsedCirclesData });
        console.log(
          "data exist from the localstorage, so patching it with store."
        );
      }
    },
    filteredPlans(voucherType: string, cost: string): VoucherPrice[] {
      // voice
      const result = this.plans
        .filter((plan) => plan.voucherType === voucherType.toUpperCase())
        .sort((a, b) => {
          if (cost === "By Low") {
            // if (10 > 20) {
            if (Number(a.denom) < Number(b.denom)) {
              return 1;
            }
          }
          if (cost === "By High") {
            if (Number(a.denom) > Number(b.denom)) {
              return -1;
            }
          }
          if (cost === "By Validity") {
            if (Number(a.validity) > Number(b.validity)) {
              return -1;
            }
          }
          return 0;
        });

      return result;
    },
    filteredPlansByTaste(tastes: string[], cost: string): VoucherPrice[] {
      return this.plans
        .filter((plan) => tastes.includes(plan.voucherType!))
        .sort((a, b) => {
          if (cost === "By Low") {
            // if (10 > 20) {
            if (Number(a.denom) < Number(b.denom)) {
              return 1;
            }
          }
          if (cost === "By High") {
            if (Number(a.denom) > Number(b.denom)) {
              return -1;
            }
          }
          if (cost === "By Validity") {
            if (Number(a.validity) > Number(b.validity)) {
              return -1;
            }
          }
          return 0;
        });
    },
    setPlans(plans: VoucherPrice[]) {
      this.plans = plans;
      return plans;
    },
  },
  // persist: {
  //   key: "plansData",
  //   paths: ["plans"],
  //   overwrite: true,
  // },
});
