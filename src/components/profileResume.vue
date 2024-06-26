<script setup lang="ts">
import type {IUser} from "@/models/IUser";
import {computed, ref} from "vue";

const props = defineProps<{
  user: IUser,
  pointsToDollar: string | number
}>()

const totalPoints = computed(() => (Math.round(props.user.points + props.user.localPoints)));
const isHovering = ref(false);
</script>

<template>

  <!-- Based on: https://dribbble.com/shots/4883028-Profile-Stats-->
  <div class="layout">
    <div class="profile">
      <div class="profile__picture"><img src="http://i.pravatar.cc/250?img=58" alt="ananddavis"/></div>
      <div class="profile__header">
        <div class="profile__account">
          <h4 class="profile__username">{{ user.name }}</h4>
        </div>
      </div>
      <div class="profile__stats">
        <div class="profile__stat">
          <div class="profile__icon profile__icon--gold"><i class="fas fa-wallet"></i></div>
          <div class="profile__value">{{ totalPoints }}
            <div class="profile__key">Total points</div>
          </div>
        </div>
        <div class="profile__stat">
          <div class="profile__icon profile__icon--blue"><i class="fas fa-signal"></i></div>
          <div class="profile__value">{{ Math.round(user.localPoints) }}
            <div class="profile__key">Local points</div>
          </div>
        </div>
        <div v-if="props.pointsToDollar" class="profile__stat" v-tooltip="'Equivalency: '+ props.pointsToDollar.toFixed(2) + ' $'">
          <div class="profile__icon profile__icon--pink"><i class="fas fa-heart"></i></div>
          <div class="profile__value">{{ Math.round(user.points) }}
            <div class="profile__key">Global points</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,600,700");

* {
  box-sizing: border-box;
}

html, body {
  background: #f9fafb;
  height: 100vh;
  position: relative;
  z-index: -2;
}

.layout {
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 70px
}

@-webkit-keyframes popUp {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes popUp {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@-webkit-keyframes slideUp {
  from {
    transform: translateY(5px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(5px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}

.profile {
  -webkit-animation: popUp ease-in-out 350ms;
  animation: popUp ease-in-out 350ms;
  background: #ffffff;
  border-radius: 25px;
  box-shadow: 0 0 40px 0px rgba(0, 0, 0, 0.17);
  margin-top: 40px;
  padding: 28px 30px 30px 35px;
  position: relative;
  width: 500px;
}

.profile__account {
  align-self: center;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding-left: 135px;
}

.profile__button {
  border-radius: 50px;
  border: 1px solid #000000;
  color: #000000;
  display: block;
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  transition: ease-in-out 250ms background, ease-in-out 250ms color;
}

.profile__button:hover {
  background: #000000;
  color: #ffffff;
}

.profile__edit {
  flex: none;
  margin-left: 30px;
  width: 140px;
}

.profile__header {
  display: flex;
  margin-bottom: 20px;
}

.profile__icon {
  flex: none;
  font-size: 1.5em;
  margin-right: 10px;
  padding-top: 3px;
}

.profile__icon--gold {
  color: #eab100;
}

.profile__icon--blue {
  color: #8faae8;
}

.profile__icon--pink {
  color: #ff86af;
}

.profile__key {
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  font-weight: 400;
  text-align: center;
}

.profile__picture {
  background: #ffffff;
  border-radius: 100px;
  border: 10px solid #ffffff;
  height: 125px;
  position: absolute;
  top: -40px;
  width: 125px;
}

.profile__picture:before {
  border-radius: 100px;
  box-shadow: 0 0 40px 0px rgba(0, 0, 0, 0.17);
  content: "";
  height: calc(100% + 20px);
  left: -10px;
  position: absolute;
  top: -10px;
  width: calc(100% + 20px);
  z-index: -1;
}

.profile__picture img {
  border-radius: 100px;
  height: 100%;
  width: 100%;
}

.profile__stat {
  -webkit-animation: slideUp ease-in-out 350ms forwards;
  animation: slideUp ease-in-out 350ms forwards;
  border-right: 1px solid #e9e9e9;
  display: flex;
  flex: 1;
  justify-content: center;
  opacity: 0;
  padding: 10px 4px;
  transform: translateY(5px);
}

.profile__stat:last-of-type {
  border-right: none;
}

.profile__stat:nth-child(1) {
  -webkit-animation-delay: 400ms;
  animation-delay: 400ms;
}

.profile__stat:nth-child(2) {
  -webkit-animation-delay: 500ms;
  animation-delay: 500ms;
}

.profile__stat:nth-child(3) {
  -webkit-animation-delay: 600ms;
  animation-delay: 600ms;
}

.profile__stats {
  display: flex;
}

.profile__username {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  margin: 0;
  text-align: right;
}

.profile__value {
  font-family: "Montserrat", sans-serif;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
}
</style>



