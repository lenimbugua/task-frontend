<script setup>
import Spin from "./Spin.vue";

import { useLoginStore } from "../stores/login";
import { storeToRefs } from "pinia";
import { onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const { login: loginUser, clearErrors } = useLoginStore();

const { pending, error, responseOK } = storeToRefs(useLoginStore());
const email = ref("");
const password = ref("");

const login = async () => {
  const formData = new FormData();
  formData.append("email", email.value);
  formData.append("password", password.value);

  await loginUser(formData);
  if (responseOK.value) {
    router.push({ name: "dashboard" });
  }
};

onUnmounted(() => {
  clearErrors();
});
</script>
<template>
  <form class="w-full max-w-sm" @submit.prevent="login">
    <div class="mb-6">
      <label
        for="email"
        class="block text-sm font-semibold leading-6 text-gray-900"
        >Email</label
      >
      <input
        id="email"
        v-model="email"
        type="text"
        placeholder="user@xyz.com"
        name="email"
        class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
        required
      />
    </div>
    <div class="mb-6">
      <label
        for="password"
        class="block text-sm font-semibold leading-6 text-gray-900"
        >Password</label
      ><input
        id="password"
        v-model="password"
        type="password"
        name="password"
        placeholder="XXXXXXX"
        class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
        aria-required
        required
        minlength="6"
      />
    </div>
    <p class="text-red-500 mb-6 text-sm">{{ error }}</p>
    <button
      type="submit"
      class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-sky-50 bg-sky-500 hover:text-sky-50/80 hover:bg-sky-400 w-full"
    >
      <Spin v-if="pending" />
      <span v-else>Sign in to account</span>
    </button>
  </form>
  <footer class="relative shrink-0 mt-6">
    <div
      class="space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4"
    >
      <p class="text-center sm:text-left">
        <span>Don't have an account?</span>
      </p>
      <RouterLink
        :to="{ name: 'register' }"
        class="cursor-pointer inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20"
      >
        <span>
          <span>Register</span>
          <span aria-hidden="true">→</span></span
        >
      </RouterLink>
    </div>
  </footer>
</template>
