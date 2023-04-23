<script setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { UserIcon } from "@heroicons/vue/20/solid";
import { useLoginStore } from "../stores/login";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const router = useRouter();

const { user } = storeToRefs(useLoginStore());

console.log(user.value);
const { logout } = useLoginStore();

const logoutUser = () => {
  logout();
  router.push("/");
};
</script>

<template>
  <div
    v-if="user != null || user != undefined"
    class="fixed top-0 right-2 z-50"
  >
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        :class="open ? '' : 'text-opacity-90'"
        class="group inline-flex items-center rounded-md px-3 py-2 text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <UserIcon class="mr-2 h-5 w-5 text-gray-700" />
        <span>Hi {{ user.user.name }}</span>
        <ChevronDownIcon
          :class="open ? '' : 'text-opacity-70'"
          class="ml-2 h-5 w-5 text-[#37899A] transition duration-150 ease-in-out group-hover:text-opacity-80"
          aria-hidden="true"
        />
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-240"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-240"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute shadow-xl right-0 z-50 mt-3 w-64 max-w-sm transform px-3 sm:px-0"
        >
          <div
            class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div class="bg-gray-50 p-4">
              <div
                class="cursor-pointer flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-240 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                @click="logoutUser"
              >
                <span class="flex items-center">
                  <span class="text-sm font-medium text-gray-900">
                    Log Out
                  </span>
                </span>
                <span class="block text-sm text-gray-500">
                  Sign out from your account
                </span>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>
