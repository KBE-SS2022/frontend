import Vue from 'vue'
//import App from './components/App.vue'
import App from './App.vue'
import Keycloak from "keycloak-js";
import axios from "axios";

Vue.component("")
let initOptions = {
  url: 'http://localhost:8080/auth/', realm: 'kbe-api', clientId: 'app-vue', onLoad: 'login-required'
}
let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    console.log("Authenticated");

    new Vue({
      el: '#app',
      render: h => h(App, {props: { keycloak: keycloak } })
    }).$mount("#app")
    localStorage.setItem("vue-token",keycloak.token);
    localStorage.setItem("vue-refresh-token",keycloak.refreshToken);
 }


//Token Refresh
  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.log('Token refreshed' + refreshed);
        localStorage.setItem("vue-token",keycloak.token);
      } else {
        console.log('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      console.log('Failed to refresh token');
    });
  }, 6000)

}).catch(() => {
  console.log("Authenticated Failed");
});
