import { defineStore } from "pinia";
import API from "../services/API";

export const useLoginStore = defineStore("auth-store", {
  state: () => ({
    pending: false,
    error: null,
    user: null,
    responseOK: false,
  }),
  actions: {
    async login(body) {
      try {
        //reset
        this.pending = true;
        this.responseOK = false;
        this.errors = null;

        const response = await API().post("/login", body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.pending = false;
        this.user = response.data.data;
        this.responseOK = true;
      } catch (error) {
        this.pending = false;
        console.log(error);
        if (error.response.status === 401 || error.response.status == 400) {
          this.error = "Invalid username or password";
        }
        if (error.response.status === 404) {
          this.error = "User does not exist in our records";
        }
        if (error.response.status === 500) {
          this.error = "Internal server error. Contact admin";
        }
      }
    },
    logout() {
      localStorage.removeItem("auth-store");
      this.user = null;
    },
    clearErrors() {
      this.error = "";
    },
  },
  persist: true,
});
