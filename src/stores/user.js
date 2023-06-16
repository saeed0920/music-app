import { defineStore } from 'pinia'
import { auth, userCol } from '@/includes/firebase'
export default defineStore('user', {
  state: () => ({
    userLogIn: false
  }),
  actions: {
    async register(value) {
      const user = await auth.createUserWithEmailAndPassword(value.email, value.password)
      await userCol.doc(user.user.uid).set({
        name: value.name,
        email: value.email,
        password: value.password,
        age: value.age,
        country: value.country,
        TelegramID: value.telegram
      })

      // add profile for user
      await user.user.updateProfile({
        displayName: value.name,
        photoUrl: value.img
      })
      //
      this.userLogIn = true
      console.log('Register the fucking user!')
    },
    async authLogin(value) {
      await auth.signInWithEmailAndPassword(value.email, value.password)
      this.userLogIn = true
    },
    async logOut() {
      await auth.signOut()
      this.userLogIn = false
    }
  }
})
