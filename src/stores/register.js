import { defineStore } from "pinia";
import API from "../services/API";

export const useCreateUserStore = defineStore("create-user-store", {
  state: () => ({
    pending: false,
    responseOK: false,
    nonFieldErrors: null,
    fieldErrors: null,
  }),

  actions: {
    async createUser(body) {
      try {
        //reset
        this.pending = true;
        this.nonFieldErrors = null;
        this.fieldErrors = null;
        this.responseOK = false;

        const { data } = await API().post("/register", body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(data);
        this.pending = false;
        this.responseOK = true;
      } catch (error) {
        this.pending = false;
        console.log(error);
        if (error.response.status == 400) {
          this.fieldErrors = error.response.data.errors;
        }
        if (error.response.status == 401) {
          this.nonFieldErrors = "Unauthorised";
        }
        if (error.response.status === 403) {
          this.nonFieldErrors = "Forbidden";
        }
        if (error.response.status == 422) {
          this.fieldErrors = error.response.data;
        }
        if (error.response.status === 500) {
          this.nonFieldErrors = "Internal Error";
        }
      }
    },
  },
});
