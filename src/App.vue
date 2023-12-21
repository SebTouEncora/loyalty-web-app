<script lang="ts" setup>
import {RouterLink, RouterView, useRouter} from 'vue-router'
import {userStore} from "@/stores/user";
import {computed, ref, watch} from "vue";
import router from "@/router";


const user = userStore();

const routess = useRouter().getRoutes().filter(e => e.meta.visible);
const isLoggedIn = computed(() => user.getUser() != undefined);
const userData = computed(() => user.getUser()?.name);
const routes = computed(() => {
  if (user.getUser() != undefined) {
    return useRouter().getRoutes().filter(e => e.meta.visible && e.meta.onlyAdmin == user.getUser().isAdmin && e.meta.org == selectedOrg.value.code);
  } else {
    return useRouter().getRoutes().filter(e => e.meta.visible)
  }
})

const topBarColor = ref('transparent')
const topShadow = ref('transparent')

const userOrgs = ref([
  {name: 'Cadena Hotelera', code: 'org1'},
  {name: 'AirLine', code: 'org2'}
]);
const selectedOrg = ref();

watch(
    () => isLoggedIn.value,
    () => {
      if (!isLoggedIn.value) {
        topBarColor.value = 'transparent'
        topShadow.value = 'transparent'
      } else {
        selectedOrg.value = userOrgs.value[0];
      }
      console.log(userOrgs.value)
    },
    {deep: true, immediate: true}
)

watch(
    () => selectedOrg.value,
    async () => {
      if (selectedOrg.value) {
        if (selectedOrg.value.code == 'org1') {
          topBarColor.value = '#4597A1';
          topShadow.value = '#06dcf8'
        } else {
          topBarColor.value = '#BDB75D'
          topShadow.value = '#fdea02'
        }
      }
      console.log(selectedOrg.value)

    },
    {deep: true, immediate: true}
)

watch(
    () => user,
    () => {
      if (user.getUser()) {
        if (user.getUser().isAdmin) {
          topBarColor.value = '#BD5D63'
          topShadow.value = '#FF0010'
        } else {
          topBarColor.value = '#4597A1';
          topShadow.value = '#06dcf8'
        }
      }
    },
    {deep: true, immediate: true}
)


const doLogout = async () => {
  user.noUser();
  await router.push('login');
  window.location.reload()
}


</script>

<template>
  <header class="top-bar-color">
    <div id="header">
      <div v-if="isLoggedIn" class="brand">
        <a class="name">{{ userData || '' }}</a>
      </div>
      <ul v-if="isLoggedIn" class="menu">
        <li v-for="route in routes" :key="route.path">
          <router-link :to="route.path">{{ route.name }}</router-link>
        </li>
        <li v-if="!user.getUser().isAdmin">
          <router-link to="/profile">Profile</router-link>
        </li>
      </ul>

    </div>
    <Dropdown v-show="isLoggedIn && !user.getUser().isAdmin" v-model="selectedOrg"
              :options="userOrgs" class="w-full md:w-14rem" optionLabel="name" placeholder="Select a City"
              style="max-height: 50px; margin-top: 6px; margin-left: 20%"/>
    <Button v-show="isLoggedIn" label="Log out" style="float: inline-end; margin: 10px" @click="doLogout"/>
  </header>
  <RouterView/>
</template>

<style scoped>

html,
body {
  height: 100%
}

* {
  box-sizing: border-box
}

ol,
ul {
  margin-top: 0;
  margin-bottom: 9px
}

a {
  color: #7E57C2;
  text-decoration: none;
  background: transparent;
}

body {
  line-height: 20px;
  font-family: 'Open Sans', helvetica, sans-serif;
  font-size: 13px;
  color: #333;
  background-color: #fff;
}

header {
  line-height: 60px;
  font-weight: 400;
  box-shadow: 0 1px 3px 0 v-bind(topShadow);
  height: 60px;
  background-color: v-bind(topBarColor);
  top: 0;
  left: 0;
  position: fixed;
  right: 0;
  z-index: 10000;
}

#header {
  position: relative;
  width: 970px;
  margin: 0 auto;
  background: red;
}

#header .menu {
  float: left;
  line-height: 60px;
  margin-bottom: 0;
  font-size: 13px;
  list-style: none;
}

#header .menu li {
  display: inline-block;
}

#header .menu li a {
  display: block;
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
  padding: 0 20px;
}

#header .menu li a:hover {
  background: v-bind(topShadow)
}

#header .name {
  color: #fff;
  height: 60px;
  float: left;
  margin-right: 30px;
  margin-top: 0;
  font-size: 24px;
  font-family: 'Coiny', sans-serif;
  font-variant: small-caps;
}


</style>
