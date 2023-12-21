<template>
  <div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading">Loading...</div>
    </div>
    <div class="gallery">
      <room-detail
          class="room-card"
          v-for="room in rooms"
          :key="room.id"
          :roomData="room"
          @book-room="openBookingDialog"
      />
      <Dialog style="margin-top: 50px" v-model:visible="bookingDialogVisible" :modal="true" :style="{ width: 'auto' }"
              :closable="false" class="booking-dialog">
        <div class="dialog-header">
          <h2>Book a Room</h2>
          <Button icon="pi pi-times" class="close-button" @click="bookingDialogVisible = false"/>
        </div>
        <div class="booking-form">
          <div class="p-field">
            <label for="name">Full Name</label>
            <InputText id="name" v-model="bookingForm.name" required/>
          </div>
          <div class="p-field">
            <label for="email">Email</label>
            <InputText id="email" type="email" v-model="bookingForm.email" required/>
          </div>
          <div class="p-field">
            <label for="dates">Reservation Dates</label>
            <Calendar id="dates" v-model="bookingForm.dates" selectionMode="range" required/>
            <label for="dates">Total nights: {{ days }}</label>
          </div>
          <div class="p-field">
            <label for="guests">Number of Guests</label>
            <InputText type="number" id="guests" v-model="bookingForm.guests" min="1" required/>
          </div>
          <div class="total-amount">
            <span>Total amount to pay:</span>
            <span class="total-price">$ {{ bookingForm.totalPrice }}</span>
          </div>
          <Button @click="completeBooking(false)" label="Reserve" type="submit" class="reserve-button"/>
          <Button @click="completeBooking(true)" label="Reserve with points" type="submit" class="reserve-button"/>
        </div>
      </Dialog>

      <Toast style="margin-top: 100px" ref="toast"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import RoomDetail from "@/components/RoomDetail.vue";
import moment from 'moment'
import {useToast} from 'primevue/usetoast';

import roomsData from '../models/roomsData.json';
import userController from "@/views/userController";

const rooms = ref(roomsData);
const bookingDialogVisible = ref(false);
const toast = useToast();
const isLoading = ref(false);
const bookingForm = ref({
  name: '',
  email: '',
  dates: [],
  guests: 1,
  days: 0,
  totalPrice: 0
});

const days = computed(() => {
  var a = moment(bookingForm.value.dates[1]);
  var b = moment(bookingForm.value.dates[0]);
  return (a.diff(b, 'days'));
})
const totalAmountToPay = ref(0);

function openBookingDialog(room: any) {
  console.log(room)
  totalAmountToPay.value = room.price
  bookingDialogVisible.value = true;
}

async function completeBooking(withPoints: boolean) {
  isLoading.value = true;
  console.log('Reservation details:', bookingForm.value);
  bookingDialogVisible.value = false;
  bookingForm.value.days = days.value;
  if (withPoints) {
    await userController.bookwithPoints((bookingForm.value.totalPrice), true)
  } else {
    await userController.book(bookingForm.value.totalPrice, true);
  }
  isLoading.value = false;
  toast.add({
    severity: 'success',
    summary: 'Booking Confirmed',
    detail: 'Your reservation has been made successfully',
    life: 3000
  });
}

watch(
    () => bookingForm.value,
    () => {
      console.log(bookingForm.value)
      bookingForm.value.totalPrice = totalAmountToPay.value * days.value;
      console.log(bookingForm.value.totalPrice)
    },
    {immediate: true, deep: true}
)

onMounted(() => {
  userController.selectedUserOrg = 'org1'
})

</script>

<style scoped>
.gallery {
  margin-top: 100px;
  display: grid;
  gap: 2rem; /* Espacio aumentado */
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 25rem), 1fr));
  justify-content: center;
}

.room-card {
  transition: transform 0.3s ease;
  cursor: pointer;
}

.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.p-dialog .p-dialog-content {
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.95);
}


.p-button {
  width: auto;
  margin: 1rem 0;
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


.booking-dialog {
  margin-top: 100px;
  padding: 2rem;
  background: #f0f0f0;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.close-button {
  background: none;
  color: #333;
  border: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.booking-form {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

.reserve-button {
  background-color: #0052cc;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reserve-button:hover {
  background-color: #003d99;
}

/* Styles for form elements */
.p-field label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 0.9rem;
}

.p-inputtext {
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
}
</style>
