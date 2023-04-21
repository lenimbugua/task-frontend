import { defineStore } from "pinia";
import API from "../services/API";

export const useUserStore = defineStore("users-store", {
  state: () => ({
    pending: false,
    error: null,
    fieldErrors: null,
    nonFieldErrors: null,
    responseOK: false,
    users: null,
    selectedUser: null,
  }),

  actions: {
    async updateUser(body, accessToken) {
      try {
        //reset
        this.pending = true;
        this.responseOK = false;
        this.nonFieldErrors = null;
        this.fieldErrors = null;
        const response = await API().put(
          `/users/update-status/${body.userID}`,
          { status: body.status },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        this.pending = false;
        this.results = response.data;
        console.log(this.results);
        this.responseOK = true;
      } catch (error) {
        this.pending = false;
        if (error.response.status == 400) {
          this.fieldErrors = error.response.data.errors;
          console.log(this.fieldErrors);
        }
        if (error.response.status == 401) {
          this.nonFieldErrors = "Unauthorised";
        }
        if (error.response.status === 403) {
          error.nonFieldErrors = error.response.data.error;
        }
        if (error.response.status === 500) {
          this.nonFieldErrors = "Internal Error";
        }
      }
    },
    async fetchUsers(token) {
      try {
        this.pending = true;
        this.responseOK = false;
        this.error = null;
        const response = await API().get(`/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.pending = false;
        this.error = "";
        this.users = response.data.data;
      } catch (error) {
        this.pending = false;
        console.log(error);
        if (error?.response?.status === 400) {
          this.error = "There was an error";
        }
        if (error?.response?.status === 401) {
          this.error = "Unauthorised";
        }
      }
    },
    clearErrors() {
      this.error = "";
      this.results = null;
    },
    setSelectedUser(user) {
      this.selectedUser = user;
    },
  },
  persist: true,
});
