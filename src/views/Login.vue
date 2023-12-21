<template>

  <div class="container" id="container" ref="container">
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading">Loading...</div>
    </div>
    <div class="form-container sign-up">
      <form @submit.prevent="dialogForOrg = true">
        <h1>Create Account</h1>
        <span>or use your email to registration</span>
        <input type="text" placeholder="N° Passport" v-model="registerData.id">
        <input type="text" placeholder="Name" v-model="registerData.name">
        <div class="flex align-items-center">
          <InputSwitch v-model="isAdmin"/>
          <label for="admin" class="ml-2"> is Admin? </label>
        </div>
        <button>Sign Up</button>
      </form>
    </div>
    <div class="form-container sign-in">
      <form @submit.prevent="doLogin">
        <h1>Sign In</h1>
        <input type="text" placeholder="N° Passport" v-model="passportNumber">
        <button>Sign In</button>
      </form>
    </div>
    <div class="toggle-container">
      <div class="toggle">
        <div class="toggle-panel toggle-left">
          <h1>Welcome Back!</h1>
          <p>Enter your Personal details to use all of site features</p>
          <button ref="signInBtn" class="hidden" @click="login">Sign In</button>
        </div>
        <div class="toggle-panel toggle-right">
          <h1>Hello, Traveler!</h1>
          <p>Register with your Personal details to use all of site features</p>
          <button ref="signUpBtn" class="active" @click="register">Sign Up</button>
        </div>
      </div>
    </div>

    <Dialog v-model:visible="dialogForOrg" modal header="Select company" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <choose-org @org1="doRegister('org1')" @org2="doRegister('org2')"/>
    </Dialog>

    <Dialog v-model:visible="showDialos" modal header="Welcome" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <template #header>
        <div class="inline-flex align-items-center justify-content-center gap-2">
          <span class="font-bold white-space-nowrap">Welcome to</span>
        </div>
      </template>
      <p class="m-0">
        Thanks for register. We have a reward of some points for joining us.
      </p>
      <template #footer>
        <Button label="Ok" icon="pi pi-check" @click="claimRewards" autofocus/>
      </template>
    </Dialog>
    <div class="confetti" ref="confettiContainer">
      <div
          v-for="i in 100"
          :key="i"
          class="confetti-piece"
          :style="{
        left: Math.random() * 100 + 'vw',
        animationDelay: Math.random() * 5 + 's',
        background: randomColor(),
      }"
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import axios from "axios";
import {userStore} from "@/stores/user";
import router from "@/router";
import userController from "@/views/userController";
import ChooseOrg from "@/components/chooseOrg.vue";

const BASE_URL = 'http://localhost:3005';
const ORG_HEADER = {'org': import.meta.env.VITE_ORG_HEADER};

const container = ref();
const signUpBtn = ref();
const signInBtn = ref();
const confettiContainer = ref();
const isLoading = ref(false);
const isAdmin = ref(false);
const userST = userStore();
const dialogForOrg = ref(false)
const registerData = ref({id: '', name: ''});
const passportNumber = ref('');
const orgSelectedInDialog = ref('');
const showDialos = ref(false);

const randomColor = () => {
  const colors = ['#FFC312', '#C4E538', '#12CBC4', '#FDA7DF', '#ED4C67'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const register = () => {
  container.value?.classList.add('active');
  signInBtn.value?.classList.add('active');
  signInBtn.value?.classList.remove('hidden');
  signUpBtn.value?.classList.add('active');
};

const login = () => {
  container.value?.classList.remove('active');
};

const doLogin = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`${BASE_URL}/read-user`, {
      headers: ORG_HEADER,
      params: {userId: passportNumber.value.toString()}
    });
    userST.setUser(response.data.response);
    console.log(response.data.response.companies)
    userController.setuserOrgs(response.data.response.companies);
    userController.selectedUserOrg = response.data.response.companies[0].substring(0, 4).toLowerCase();
    await userController.updatePointsEquivalency();

  } catch (e) {
    console.error("Error al hacer login:", e);
  } finally {
    isLoading.value = false;
    if (userST.getUser().isAdmin) {
      userController.selectedUserOrg = 'org1'
      router.push('/dashboard')
    } else {
      router.push('profile');
    }
  }
};

const doRegister = async (org: string) => {
  // orgST.setOrg(org);
  orgSelectedInDialog.value = org;
  userController.selectedUserOrg = org;
  console.log(isAdmin.value)
  // console.log(orgST.getOrg())
  isLoading.value = true;
  try {
    const response = await axios.post(`${BASE_URL}/create-user`, {
      userId: registerData.value.id,
      name: registerData.value.name,
      isAdmin: isAdmin.value
    }, {headers: {'org': orgSelectedInDialog.value}});
    userST.setUser(response.data.response);

    if (response.data.response.isAdmin){
      await userController.updatePointsEquivalency();
      userController.setuserOrgs(response.data.response.companies);
    }

  } catch (e) {
    console.log("Error al hacer register:", e);
  } finally {
    dialogForOrg.value = false;
    isLoading.value = false;
    if (isAdmin.value) {
      await router.push('/dashboard')
    } else {
      showDialos.value = true;
    }
  }
};

const claimRewards = async () => {
  isLoading.value = true;
  // console.log(orgST.getOrg())
  console.log(orgSelectedInDialog.value)
  try {
    await axios.post(`${BASE_URL}/joining-rewards`, {
      userId: registerData.value.id,
    }, {headers: {'org': userController.selectedUserOrg}});

    confettiContainer.value!.style.display = 'block';
    setTimeout(() => {
      confettiContainer.value!.style.display = 'none';
    }, 4000);

    isLoading.value = false;
    await userController.updateUser(registerData.value.id);
    await router.push('profile');
  } catch (e) {
    console.log({e})
  } finally {
    isLoading.value = false;
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

body {

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

.container {
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.container p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  margin: 20px 0;
}

.container span {
  font-size: 12px;
}

.container a {
  color: #333;
  font-size: 13px;
  text-decoration: none;
  margin: 15px 0 10px;
}

.container button {
  background-color: #512da8;
  color: #fff;
  font-size: 12px;
  padding: 10px 45px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
}

.container button.hidden {
  background-color: transparent;
  border-color: #fff;
}

.container form {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
}

.container input {
  background-color: #eee;
  border: none;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 8px;
  width: 100%;
  outline: none;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in {
  left: 0;
  width: 50%;
  z-index: 1;
}

.container.active .sign-in {
  transform: translateX(100%);
}

.sign-up {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.active .sign-up {
  transform: translateX(100%);
  opacity: 1;
  z-index: 2;
  animation: move 0.6s;
}

@keyframes move {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.social-icons {
  margin: 20px 0;
}

.social-icons a {
  border: 1px solid #ccc;
  border-radius: 20%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 3px;
  width: 40px;
  height: 40px;
}

.toggle-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  border-radius: 150px 0 0 100px;
  z-index: 1000;
}

.container.active .toggle-container {
  transform: translateX(-100%);
  border-radius: 0 150px 100px 0;
}

.toggle {
  height: 100%;
  background: #512da8 linear-gradient(to right, #5c6bc0, #512da8);
  color: #fff;
  position: relative;
  left: -100%;
  width: 200%;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.container.active .toggle {
  transform: translateX(50%);
}

.toggle-panel {
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.toggle-left {
  transform: translateX(-200%);
}

.container.active .toggle-left {
  transform: translateX(0);
}

.toggle-right {
  right: 0;
  transform: translateX(0);
}

.container.active .toggle-right {
  transform: translateX(200%);
}

.confetti {
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 9999;
}

.confetti-piece {
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.6);
  animation: fall 4s linear infinite;
  bottom: 100%;
  will-change: transform;
}

@keyframes fall {
  to {
    transform: translateY(100vh);
  }
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.loading {
  padding: 20px;
  border-radius: 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.85);
}

</style>