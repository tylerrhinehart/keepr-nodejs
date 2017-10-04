import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import router from '../router'

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//trhinehart-keepr.herokuapp.com/' : '//localhost:3000/';

let auth = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  withCredentials: true
})

let api = axios.create({
  baseURL: baseUrl + 'api/',
  timeout: 10000,
  withCredentials: true
})

vue.use(vuex)

var store = new vuex.Store({
  state: {
    user: {},
    loggedIn: false,
    userVaults: [
      // { id: 1, title: 'Tigers', description: 'cool tiger keeps' },
      // { id: 2, title: 'Bears', description: 'cool bear keeps' }
    ],
    homeKeeps: [
      //   { id: 1, private: false, title: 'Tigers are cool!', description: 'Tigers live in Asia', imgUrl: 'https://static.pexels.com/photos/516541/pexels-photo-516541.jpeg' },
      //   { id: 2, private: false, title: 'Mountains', description: 'Snowy mountains underneath a star-filled night sky', imgUrl: 'https://static.pexels.com/photos/291732/pexels-photo-291732.jpeg' },
      //   { id: 3, private: false, title: 'Tigers are cool!', description: 'Tigers live in Asia', imgUrl: 'https://static.pexels.com/photos/516541/pexels-photo-516541.jpeg' },
      //   { id: 4, private: false, title: 'Mountains', description: 'Snowy mountains underneath a star-filled night sky', imgUrl: 'https://static.pexels.com/photos/291732/pexels-photo-291732.jpeg' },
      //   { id: 5, private: false, title: 'Tigers are cool!', description: 'Tigers live in Asia', imgUrl: 'https://static.pexels.com/photos/516541/pexels-photo-516541.jpeg' },
      //   { id: 6, private: false, title: 'Mountains', description: 'Snowy mountains underneath a star-filled night sky', imgUrl: 'https://static.pexels.com/photos/291732/pexels-photo-291732.jpeg' }
    ],
    activeVault: {},
    activeVaultKeeps: [],
    activeKeep: {},
    showBottomVaultsBar: false,
    selectedKeep: ''
  },

  mutations: {
    login(state, payload) {
      state.user = payload
      state.loggedIn = true
    },
    logout(state) {
      state.user = {}
      state.loggedIn = false
    },
    addVault(state, payload) {
      state.userVaults.push(payload)
    },
    findKeep(state, payload) {
      state.activeKeep = state.homeKeeps.find(k => k._id == payload)
    },
    clearActiveKeep(state) {
      state.activeKeep = {}
    },
    addKeep(state, payload) {
      state.homeKeeps.push(payload)
    },
    addToVault(state, payload) {

    },
    showBottomVaultsBar(state) {
      state.showBottomVaultsBar = !state.showBottomVaultsBar
    },
    findVault(state, payload) {
      state.activeVault = state.userVaults.find(v => v.id == payload)
    },
    updateKeeps(state, payload) {
      state.homeKeeps = payload
    },
    updateVaults(state, payload) {
      state.userVaults = payload
    },
    selectKeep(state, payload) {
      state.selectedKeep = payload
    },
    setActiveVault(state, payload) {
      state.activeVault = payload
    },
    setVaultKeeps(state, payload) {
      state.activeVaultKeeps = payload
    }
  },

  actions: {
    login({ commit, dispatch }, payload) {
      auth.post('login', payload).then((res) => {
        commit('login', res.data.data)
      })
        .then(() => {
          dispatch('getUserVaults')
        })
        .catch((err) => console.error(err))
    },
    signup({ commit, dispath }, payload) {
      auth.post('register', payload).then((res) => {
        commit('login', res.data.data)
      })
        .catch((err) => console.error(err))
    },
    logout({ commit, dispatch }) {
      auth.delete('logout').then(() => {
        commit('logout')
        router.push('/')
      })
    },
    getAuth({ commit, dispatch }) {
      auth('authenticate').then(res => {
        if (!res.data.data) {
          return router.push('/')
        }
        // var user = {
        //   id: res.data.id,
        //   email: res.data.email,
        //   userName: res.data.userName,
        //   profileImgUrl: res.data.profileImgUrl
        // }
        commit('login', res.data.data)
      })
        .then(() => {
          dispatch('getUserVaults')
        })
        .catch((err) => console.error(err))
    },
    addVault({ commit, dispatch }, payload) {
      api.post('vaults', payload).then((res) => {
        // commit('addVault', res)
        dispatch('getUserVaults')
      })
    },
    findKeep({ commit, dispatch }, payload) {
      commit('findKeep', payload)
    },
    clearActiveKeep({ commit, dispatch }) {
      commit(clearActiveKeep)
    },
    addKeep({ commit, dispatch }, payload) {
      api.post('keeps', payload).then((res) => {
        dispatch('getKeeps')
      })
    },
    incrementKeep({ commit, dispatch }) {
      api.post('keeps/increment/' + this.state.selectedKeep).then((res) => {
        // console.log(res)
      })
    },
    addToVault({ commit, dispatch }, payload) {
      api.put('vaults/' + payload.vaultId + '/addkeep/' + this.state.selectedKeep).then((res) => {
        // commit('addToVault', payload)
        dispatch('incrementKeep')
      })
    },
    showBottomVaultsBar({ commit, dispatch }) {
      commit('showBottomVaultsBar')
    },
    getVaultKeeps({ commit, dispatch }, payload) {
      api('vaults/' + payload + '/keeps').then((res) => {
        commit('setVaultKeeps', res.data.data)
      })
        .catch((err) => console.error(err))
    },
    getKeeps({ commit, dispatch }) {
      api('keeps/public/get').then((res) => {
        commit('updateKeeps', res.data.data)
      })
        .catch((err) => console.error(err))
    },
    getUserVaults({ commit, dispatch }) {
      api('uservaults').then((res) => {
        commit('updateVaults', res.data.data)
      })
        .catch((err) => console.error(err))
    },
    selectKeep({ commit, dispatch }, payload) {
      commit('selectKeep', payload)
    },
    setActiveVault({ commit, dispatch }, payload) {
      commit('setActiveVault', payload)
    }
  }
})

export default store