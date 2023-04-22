<script setup>
import Spin from "./Spin.vue";
import { useCreateUserStore } from "../stores/register";
import { getFormErrorsByField, fieldHasError } from "../utils/errors";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const router = useRouter();

const { createUser } = useCreateUserStore();

const { pending, nonFieldErrors, fieldErrors, responseOK } = storeToRefs(
  useCreateUserStore()
);

const name = ref("");
const email = ref("");
const password = ref("");

const register = async () => {
  const formData = new FormData();

  formData.append("name", name.value);
  formData.append("email", email.value);
  formData.append("password", password.value);
  formData.append("password_confirmation", password.value);

  await createUser(formData);
  if (responseOK.value) {
    router.push("/");
  }
};
</script>
<template>
  <form class="w-full max-w-sm" @submit.prevent="register">
    <div class="mb-6">
      <input
        id="name"
        v-model="name"
        type="text"
        name="name"
        placeholder="Full Names"
        :class="{
          'ring-1 ring-red-500 bg-red-50': fieldHasError(fieldErrors, 'name'),
        }"
        class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 border"
        required
      />
      <p class="text-red-500 mb-6 text-sm">
        {{ getFormErrorsByField(fieldErrors, "Fullnameames") }}
      </p>
    </div>
    <div class="mb-6">
      <input
        id="email"
        v-model="email"
        type="email"
        name="email"
        placeholder="Email"
        :class="{
          'ring-1 ring-red-500 bg-red-50': fieldHasError(fieldErrors, 'email'),
        }"
        class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 border"
        required
      />
      <p class="text-red-500 mb-6 text-sm">
        {{ getFormErrorsByField(fieldErrors, "email") }}
      </p>
    </div>

    <div class="mb-6">
      <input
        id="password"
        v-model="password"
        type="password"
        name="password"
        placeholder="Password"
        :class="{
          'ring-1 ring-red-500 bg-red-50': fieldHasError(
            fieldErrors,
            'Password'
          ),
        }"
        class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 border"
        aria-required
        required
        minlength="6"
      />
      <p class="text-red-500 mb-6 text-sm">
        {{ getFormErrorsByField(fieldErrors, "password") }}
      </p>
    </div>
    <p v-if="nonFieldErrors" class="text-red-500 mb-6">
      {{ nonFieldErrors }}
    </p>
    <button
      type="submit"
      class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-sky-50 bg-sky-500 hover:text-sky-50/80 hover:bg-sky-500 w-full"
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
        <span>Already have an account?</span>
      </p>
      <RouterLink
        :to="{ name: 'login' }"
        class="cursor-pointer inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20"
      >
        <span>
          <span>Login</span>
          <span aria-hidden="true">→</span></span
        >
      </RouterLink>
    </div>
  </footer>
</template>
