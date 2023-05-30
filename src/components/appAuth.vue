<template>
  <!-- Auth Modal -->
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" @click="close">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click="close">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center" @click.prevent="defaultForm = true">
              <a
                class="block rounded py-3 px-4 transition-all"
                href="#"
                :class="{
                  'bg-blue-600 text-white hover:text-white': defaultForm,
                  'hover:text-blue-600': !defaultForm
                }"
                >Login</a
              >
            </li>
            <li class="flex-auto text-center" @click.prevent="defaultForm = false">
              <a
                class="block rounded py-3 px-4 transition-all"
                href="#"
                :class="{
                  'bg-blue-600 text-white hover:text-white': !defaultForm,
                  'hover:text-blue-600': defaultForm
                }"
                >Register</a
              >
            </li>
          </ul>

          <div
            v-if="reg.showAlert"
            class="alert-pop-reg rounded-md text-2xl text-white font-bold text-center px-4 py-3"
            :class="reg.bgAlert"
          >
            {{ reg.textalert }}
          </div>
          <div
            v-if="log.showAlert"
            class="alert-pop-login rounded-md text-2xl text-white font-bold text-center px-4 py-3"
            :class="log.bgAlert"
          >
            {{ log.textalert }}
          </div>
          <!-- Login Form -->
          <vee-Form v-if="defaultForm" @submit="login" :validation-schema="loginRules">
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <veeField
                name="email"
                type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
              />
              <ErrorMessage class="text-red-500" name="email" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <veeField
                name="password"
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password"
              />
              <ErrorMessage class="text-red-600" name="password" />
            </div>
            <button
              type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
              :disabled="log.disableBtnSub"
            >
              Submit
            </button>
          </vee-Form>
          <!-- Registration Form -->

          <vee-Form v-else :validation-schema="rules" @submit="register" :initial-values="userData">
            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2">Name</label>
              <veeField
                name="name"
                type="text"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name"
              />
              <ErrorMessage class="text-red-500" name="name" />
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <veeField
                name="email"
                type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
              />
              <ErrorMessage class="text-red-500" name="email" />
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2">Age</label>
              <veeField
                name="age"
                type="type"
                placeholder="Enter Age"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              />
              <ErrorMessage name="age" class="text-red-500" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <veeField name="password" :bails="false" v-slot="pass">
                <input
                  type="password"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Password"
                  v-bind="pass.field"
                />
                <p class="text-red-700" v-for="items of pass.errors" :key="items">
                  {{ items }}
                </p>
              </veeField>

              <ErrorMessage name="password" class="text-red-700" />
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Confirm Password</label>
              <veeField
                name="confirm_password"
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password"
              />
              <ErrorMessage name="confirm_password" class="text-red-500" />
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2">Country</label>
              <veeField
                as="select"
                name="country"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              >
                <option value="USA" default>USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Iran">Iran</option>
              </veeField>
              <ErrorMessage name="country" class="text-red-500" />
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6 grid justify-items-start">
              <veeField
                type="checkbox"
                name="tos"
                value="1"
                class="w-4 h-4 float-left -ml-6 mt-1 row-start-1 col-start-1"
                id="check"
              />
              <label for="check" class="inline-block row-start-1 col-start-1"
                >Accept terms of service</label
              >
              <ErrorMessage name="tos" class="text-red-600 row-start-2 col-start-1" />
            </div>
            <button
              type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
              :disabled="reg.disableBtnSub"
            >
              Submit
            </button>
          </vee-Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores, mapState } from 'pinia'
import useModalStore from '../stores/modal'
import { ErrorMessage } from 'vee-validate'
import firebase from '@/includes/firebase'

export default {
  name: 'appAuth',
  data() {
    return {
      defaultForm: true,
      rules: {
        name: {
          requiredValue: true,
          min: 2,
          max: 100,
          alphaSpaces: true
        },
        email: 'requiredValue|email|max:100',
        age: {
          requiredValue: true,
          numeric: true,
          alphaNum: true,
          minValue: 16,
          maxValue: 30
        },
        password: {
          requiredValue: true,
          min: 8,
          max: 100,
          nof: ['password', 12345678, 11111111, 'Password']
        },
        confirm_password: {
          confirmed: '@password',
          requiredValue: true
        },
        country: {
          requiredValue: true,
          'nof-country': 'Iran'
        },
        tos: 'tosreq'
      },
      userData: {
        country: 'Iran'
      },
      loginRules: {
        password: {
          requiredValue: true,
          min: 8,
          max: 100
        },
        email: {
          requiredValue: true,
          email: true,
          max: 100
        }
      },

      reg: {
        showAlert: false,
        disableBtnSub: false,
        bgGreen: 'bg-green-500',
        bgBlue: 'bg-blue-500',
        textAlertProcess: 'Pls wait!',
        textAlertSucess: 'Succsess! GG.',
        textalert: ' ',
        bgAlert: ''
      },
      log: {
        showAlert: false,
        disableBtnSub: false,
        bgGreen: 'bg-green-500',
        bgBlue: 'bg-blue-500',
        textAlertProcess: 'Pls wait! we are logging you in.',
        textAlertSucess: 'Now you are in!',
        textalert: ' ',
        bgAlert: ''
      }
    }
  },
  computed: {
    ...mapStores(useModalStore),
    ...mapState(useModalStore, ['isOpen'])
  },
  methods: {
    close() {
      this.modalStore.isOpen = false
    },
    closeE(event) {
      if (event.key === 'Escape') this.modalStore.isOpen = false
    },
    async register(value) {
      console.log('test')
      // prc
      this.reg.bgAlert = this.reg.bgBlue
      this.reg.showAlert = true
      this.reg.disableBtnSub = true
      this.reg.textalert = this.reg.textAlertProcess

      // firebase
      const userCard = await firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)

      // succsess
      this.reg.bgAlert = this.reg.bgGreen
      this.reg.textalert = this.reg.textAlertSucess

      // show result in console
      console.log(value)
    },
    login(value) {
      console.log('test')
      // prc
      this.log.bgAlert = this.log.bgBlue
      this.log.showAlert = true
      this.log.disableBtnSub = true
      this.log.textalert = this.log.textAlertProcess

      // succsess
      this.log.bgAlert = this.log.bgGreen
      this.log.textalert = this.log.textAlertSucess

      // show result in console
      console.log(value)
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener('keydown', this.closeE)
    })
  },
  components: { ErrorMessage }
}
</script>
<style scoped lang="scss"></style>
