import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueMaterial from 'vue-material';
import VueResource from 'vue-resource';
import 'vue-material/dist/vue-material.css';

import Home from './components/page/Home.vue';
import Authenticate from './components/page/Authenticate.vue';

import App from './components/App.vue';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueMaterial);
Vue.use(VueResource);

// router object and configuration
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'start', component: Home },
    { path: '/authenticate', name: 'authenticate', component: Authenticate },
    { path: '/home', name: 'home', component: Home }
  ]
});

// store object and configuration
const store = new Vuex.Store({
  // initial application state
  state: {
    route: 'home',
    group: null,
    landscape: 'Tal',

    objects: {},
    persons: {}
  },

  getters: {
    get: (state, getters) => (name) => {
      return state[name];
    }
  },

  // store mutations which are just available from actions
  mutations: {
    changePage (state, page) {
      state.route = page;
    },

    addGroup (state, group) {
      state.group = Object.assign({}, group);
    },

    removeGroup (state, group) {
      state.group = null;
      state.persons = null;
    },

    changeLandscape (state, landscape) {
      state.landscape = landscape;
    },

    addObject (state, payload) {
      let obj = {};
      obj[payload.id] = payload.data;

      state.objects = Object.assign({}, state.objects, obj);
    },

    changeObject (state, payload) {
      state.objects[payload.id] = Object.assign(state.objects[payload.id], payload.data);
    },

    addPerson (state, payload) {
      let person = {};
      person[payload.id] = payload.data;
      state.persons = Object.assign({}, state.persons, person);
    },

    changePerson (state, payload) {
      state.persons[payload.id] = Object.assign(state.persons[payload.id], payload.data);
    }
  },

  // store actions which are used in UI
  actions: {
    changePage (context, payload) {
      context.commit('changePage', payload);
      router.push({ 
        name: payload
      });
    },

    addGroup (context, payload) {
        context.commit('addGroup', payload);
      
        if (window.localStorage) {
            try {
              // there are few problems in private mode
              window.localStorage.clear();
              window.localStorage.setItem('wedding-page', JSON.stringify(payload));
            }
            catch (e) {
              alert(
                'Achtung: Im privaten Modus kommt es zu Einschränkungen. Bitte starte die Applikation im normalen Browser-Modus.');
            }
        }
    },

    removeGroup (context, payload) {
      context.commit('removeGroup', payload);

      if (window.localStorage) {
            try {
              // there are few problems in private mode
              window.localStorage.clear();
            }
            catch (e) {
              alert(
                'Achtung: Im privaten Modus kommt es zu Einschränkungen. Bitte starte die Applikation im normalen Browser-Modus.');
            }
        }
    },

    addObject (context, payload) {
        context.commit('addObject', payload);
    },

    changeObject(context, payload) {
        context.commit('changeObject', payload);
    },

    changeLandscape (context, landscape) {
      context.commit('changeLandscape', landscape);
    },

    addPerson (context, payload) {
      context.commit('addPerson', payload);
    },

    changePerson (context, payload) {
      context.commit('changePerson', payload);
    }
  }
});

new Vue({
	el: '#app',
  store,
  router,
	render: h => h(App)
});