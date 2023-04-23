import { defineStore } from "pinia";
import API from "../services/API";

export const useStatsStore = defineStore("stats-store", {
  state: () => ({
    pending: false,
    fieldErrors: null,
    nonFieldErrors: null,
    responseOK: false,
    totalUsers: null,
    totalUserTasks: null,
    totalInProgressTasks: null,
    totalCompletedTasks: null,
    totalExpiredTasks: null,
    selectedStatus: null,
  }),

  actions: {
    async getTotalUsers(accessToken) {
      try {
        //reset
        this.pending = true;
        this.responseOK = false;
        this.nonFieldErrors = null;
        this.fieldErrors = null;
        const response = await API().get(`/count-users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.pending = false;
        this.totalUsers = response.data.count;
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
    async getTotalUserTasks(accessToken) {
      try {
        //reset
        this.pending = true;
        this.responseOK = false;
        this.nonFieldErrors = null;
        this.fieldErrors = null;
        const response = await API().get(`/count-user-tasks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.pending = false;
        this.totalUserTasks = response.data.count;
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

    async getTotalDoneTasks(accessToken) {
      try {
        //reset
        this.pending = true;
        this.responseOK = false;
        this.nonFieldErrors = null;
        this.fieldErrors = null;
        const response = await API().get(`/count-user-tasks/done`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.pending = false;
        this.totalCompletedTasks = response.data.count;
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
    async getTotalInProgressTasks(accessToken) {
      try {
        //reset
        this.pending = true;
        this.responseOK = false;
        this.nonFieldErrors = null;
        this.fieldErrors = null;
        const response = await API().get(`/count-user-tasks/In-Progress`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.pending = false;
        this.totalInProgressTasks = response.data.count;
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

    async getTotalExpiredTasks(accessToken) {
      try {
        //reset
        this.pending = true;
        this.responseOK = false;
        this.nonFieldErrors = null;
        this.fieldErrors = null;
        const response = await API().get(`count-expired-user-tasks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.pending = false;
        this.totalExpiredTasks = response.data.count;
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
