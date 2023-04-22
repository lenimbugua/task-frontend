import { defineStore } from "pinia";
import API from "../services/API";

export const useTaskStore = defineStore("task-store", {
  state: () => ({
    pending: false,
    fieldErrors: null,
    nonFieldErrors: null,
    responseOK: false,
    tasks: null,
    selectedTask: null,
  }),

  actions: {
    async addTask(body, accessToken) {
      try {
        //reset
        this.pending = true;
        this.responseOK = false;
        this.nonFieldErrors = null;
        this.fieldErrors = null;
        const response = await API().post(`/task`, body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.pending = false;
        console.log(response);
        this.responseOK = true;
      } catch (error) {
        this.pending = false;
        if (error.response.status == 400) {
          this.fieldErrors = error.response.data;
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
        if (error.response.status === 422) {
          this.fieldErrors = error.response.data;
        }
        if (error.response.status === 500) {
          this.nonFieldErrors = "Internal Error";
        }
      }
    },
    async updateTask(body, accessToken) {
      try {
        //reset
        this.pending = true;
        this.responseOK = false;
        this.nonFieldErrors = null;
        this.fieldErrors = null;
        const response = await API().put(
          `/task/${body.id}`,
          { body },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        this.pending = false;
        this.tasks = response.data.data;
        console.log(this.tasks);
        this.responseOK = true;
      } catch (error) {
        this.pending = false;
        if (error.response.status == 400) {
          this.fieldErrors = error.response.data;
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
        if (error.response.status === 500) {
          this.nonFieldErrors = "Internal Error";
        }
      }
    },
    async fetchTasks(token) {
      try {
        this.pending = true;
        this.responseOK = false;
        this.nonFieldErrors = null;
        const response = await API().get(`/task`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.pending = false;
        this.nonFieldErrors = null;
        this.tasks = response.data.data;
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
    setSelectedTask(task) {
      this.selectedTask = task;
    },
    resetSelectedTask() {
      this.selectedTask = null;
    },
  },
  persist: true,
});
