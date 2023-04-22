import { defineStore } from "pinia";
import API from "../services/API";

export const useStatusStore = defineStore("status-store", {
  state: () => ({
    pending: false,
    fieldErrors: null,
    nonFieldErrors: null,
    responseOK: false,
    statuses: null,
    selectedStatus: null,
  }),

  actions: {
    async addStatus(body, accessToken) {
      try {
        //reset
        this.pending = true;
        this.responseOK = false;
        this.nonFieldErrors = null;
        this.fieldErrors = null;
        const response = await API().post(`/status`, body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.pending = false;
        console.log(response);
        this.responseOK = true;
      } catch (error) {
        console.log(error.response);
        this.pending = false;
        if (error.response.status == 400) {
          this.fieldErrors = error.response.data.errors;
          console.log(this.fieldErrors);
        }
        if (error.response.status == 401) {
          this.nonFieldErrors = "Unauthorised";
        }
        if (error.response.status === 403) {
          this.nonFieldErrors = error.response.data.error;
        }
        if (error.response.status === 404) {
          this.nonFieldErrors = "Not Found";
        }
        if (error.response.status == 422) {
          this.fieldErrors = error.response.data;
          console.log(this.fieldErrors);
        }
        if (error.response.status === 500) {
          this.nonFieldErrors = "Internal Error";
        }
      }
    },
    async updateStatus(body, accessToken) {
      try {
        //reset
        this.pending = true;
        this.responseOK = false;
        this.nonFieldErrors = null;
        this.fieldErrors = null;
        const response = await API().put(`/status/${body.id}`, body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.pending = false;
        this.statuses = response.data.data;
        console.log(this.statuses);
        this.responseOK = true;
      } catch (error) {
        this.pending = false;
        console.log(error);
        if (error.response.status == 400) {
          this.fieldErrors = error.response.data;
          console.log(this.fieldErrors);
        }
        if (error.response.status == 401) {
          this.nonFieldErrors = "Unauthorised";
        }
        if (error.response.status === 403) {
          this.nonFieldErrors = error.response.data;
        }
        if (error.response.status === 404) {
          this.nonFieldErrors = "Not Found";
        }
        if (error.response.status === 500) {
          this.nonFieldErrors = "Internal Error";
        }
      }
    },
    async deleteStatus(id, accessToken) {
      try {
        //reset
        this.pending = true;
        this.responseOK = false;
        this.nonFieldErrors = null;
        this.fieldErrors = null;
        const response = await API().delete(`/status/${id.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.pending = false;
        this.statuses = response.data.data;
        console.log(this.statuses);
        this.responseOK = true;
      } catch (error) {
        this.pending = false;
        console.log(error);
        if (error.response.status == 400) {
          this.fieldErrors = error.response.data;
        }
        if (error.response.status == 401) {
          this.nonFieldErrors = "Unauthorised";
        }
        if (error.response.status === 403) {
          this.nonFieldErrors = error.response.data;
        }
        if (error.response.status === 404) {
          this.nonFieldErrors = "Not Found";
        }
        if (error.response.status === 500) {
          this.nonFieldErrors = "Internal Error";
        }
      }
    },
    async fetchStatuses(token) {
      try {
        this.pending = true;
        this.responseOK = false;
        this.nonFieldErrors = null;
        const response = await API().get(`/status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.pending = false;
        this.nonFieldErrors = null;
        this.statuses = response.data.data;
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
      this.fieldErrors = null;
      this.nonFieldErrors = null;
    },
    setSelectedStatus(status) {
      this.selectedStatus = status;
    },
    resetSelectedStatus() {
      this.selectedStatus = null;
    },
  },
  persist: true,
});
