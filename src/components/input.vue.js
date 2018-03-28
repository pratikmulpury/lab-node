// only need to import bootstrap here for all components to have access to it
import 'bootstrap/dist/css/bootstrap.css'
// import site specific global styles AFTER bootstrap
import './assets/css/style.css'

import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App.vue'

// turn off the console note about switching to production mode
Vue.config.productionTip = false

// explicit installation required in module environments
Vue.use(VueFire)

// simply creating the Vue instance does all the necessary set up, so no need to name it
new Vue({
    // HTML element to attach Vue app
    el: '#input',
    // components (HTML, CSS, and JS) used by this app
    components: {
        App
        Input  
    },
    // simply render the app component as this app
    template: '<input/>'
})
