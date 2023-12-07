import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBKEOByRWQyjwViTsuz1AJp-qNgl87MA2c',
  authDomain: 'music-app-4545e.firebaseapp.com',
  projectId: 'music-app-4545e',
  storageBucket: 'music-app-4545e.appspot.com',
  messagingSenderId: '79751405633',
  appId: '1:79751405633:web:01b805bfb06ef291c066c0'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const dataBase = firebase.firestore()
const userCol = dataBase.collection('usersInfo')
const storage = firebase.storage()

export { auth, dataBase, userCol, storage }
