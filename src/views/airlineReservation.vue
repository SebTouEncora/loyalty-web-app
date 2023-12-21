<script setup lang="ts">

import TicketReservation from "@/components/ticket-reservation.vue";
import flightsData from '@/models/flightsData.json'
import {onMounted, ref} from "vue";
import type {IFlight} from "@/models/IFlights";
import userController from "@/views/userController";
import {useToast} from "primevue/usetoast";
import router from "@/router";

const flights: Array<IFlight> = ref(flightsData);
const isLoading = ref(false);
const toast = useToast();

const reserveTicket = async (data: any) => {
  console.log(data)
  isLoading.value = true;
  await userController.book(data, false)
  toast.add({
    severity: 'success',
    summary: 'Reservation Confirmed',
    detail: 'Your reservation has been made successfully',
    life: 3000
  });
  isLoading.value = false;
  router.push('/profile')

}

const reserveWithPoints = async (amount: number) => {
  isLoading.value = true;
  await userController.bookwithPoints(amount, false)
  toast.add({
    severity: 'success',
    summary: 'Reservation Confirmed',
    detail: 'Your reservation has been made successfully',
    life: 3000
  });
  isLoading.value = false;
  router.push('/profile')
}

onMounted(() => {
  userController.selectedUserOrg = 'org2'
})
</script>

<template>
  <div>
    <Toast style="margin-top: 100px" ref="toast"/>
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading">Loading...</div>
    </div>
    <div class="gallery">
      <ticket-reservation @reserve="reserveTicket" @reserve-points="reserveWithPoints"
                          v-for="(flight, index) in flights" :key="index" :flight="flight"/>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  gap: 1rem;
  grid-auto-flow: dense;
  grid-auto-rows: 22rem;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  width: min-content;
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