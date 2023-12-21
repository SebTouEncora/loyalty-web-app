<template>
  <div class="main-container">
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading">Loading...</div>
    </div>
    <Toast style="margin-top: 10vh"/>
    <profile-resume :user="user" :points-to-dollar="pointsEquivalency" class="profile-resume"/>
    <br>
    <TabView>
      <TabPanel header="Global points">
        <div class="transaction-list">
          <single-reward-source
              v-for="rewardSource in user.rewardSources.reverse()"
              :key="rewardSource.id"
              :reward-source="rewardSource"
              class="transaction-item"/>
        </div>
      </TabPanel>
      <TabPanel header="Local points">
        <div class="transaction-list">
          <single-reward-source
              v-for="rewardLocalSource in localPointsHistory"
              :key="rewardLocalSource.id"
              :reward-source="rewardLocalSource"
              class="transaction-item"/>
        </div>
      </TabPanel>
<!--      <TabPanel header="Total points">-->
<!--        <div class="transaction-list">-->
<!--          <single-reward-source-->
<!--              v-for="rewardSource in user.rewardSources"-->
<!--              :key="rewardSource.id"-->
<!--              :reward-source="rewardSource"-->
<!--              class="transaction-item"/>-->
<!--        </div>-->
<!--      </TabPanel>-->
    </TabView>
    <div class="transfer-container">
      <Button label="Transfer points" icon="pi pi-arrow-right-arrow-left" @click="visible = true"/>
      <Dialog v-model:visible="visible" modal header="Transfer" :style="{ width: '35rem' }"
              :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <InputText class="mb-5" placeholder="Amount to transfer" type="number" v-model="transferMoneyPoint"/>
        <InputText class="mb-5" placeholder="User id to transfer" v-model="userIdToTransfer"/>
        <Button class="mb-5" @click="doTransfer" label="Transfer" icon="pi pi-send"/>
      </Dialog>
    </div>
  </div>
</template>
<script lang="ts" setup>

import {userStore} from "@/stores/user";
import {computed, onMounted, ref} from "vue";
import type {IUser} from "@/models/IUser";
import SingleRewardSource from "@/components/singleRewardSource.vue";
import ProfileResume from "@/components/profileResume.vue";
import userController from "@/views/userController";
import {useToast} from "primevue/usetoast";
import axios from "axios";

const visible = ref(false);
const transferMoneyPoint = ref(0);
const userIdToTransfer = ref('')
const userST = userStore();
const user: IUser | any = computed(() => userST.getUser());
const toast = useToast();
const isLoading = ref(false);
const localPointsHistory = ref()

const doTransfer = async () => {
  const pointsAsString = transferMoneyPoint.value.toString();
  isLoading.value = true;
  await userController.transferPoints(userIdToTransfer.value, pointsAsString);
  visible.value = false;
  isLoading.value = false;
  toast.add({severity: 'success', summary: 'Transfer done', detail: 'Transfer was done successfully', life: 3000});
  userIdToTransfer.value = '';
  transferMoneyPoint.value = 0;
}
const pointsEquivalency = computed(() => userController.getpointsEquivalency())

onMounted(async () => {
  isLoading.value = true;
  await userController.updatePointsEquivalency();
  await fetchIngestionRecords();
  isLoading.value = false
})

async function fetchIngestionRecords() {
  try {
    const response = await axios.get(`http://localhost:3005/get-ingestions-by-user/${userST.getUser().id}`);
    localPointsHistory.value = response.data.reverse();
    console.log(localPointsHistory.value)
  } catch (error) {
    console.error('Error fetching ingestion records:', error);
  }
}
</script>


<style scoped>


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

.transfer-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.main-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-resume {
  margin-bottom: 2rem;
}

.points-title {
  text-align: center;
  margin-bottom: 1rem;
}

.transaction-list {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 650px;
  margin: 1rem;
  overflow-y: auto;
  max-height: 400px;
}

.transaction-container {
  display: flex;
  justify-content: space-between; /* Opcional: ajusta según tus necesidades */
  width: 60vw;
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


.transaction-list::-webkit-scrollbar {
  width: 5px;
}

.transaction-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.transaction-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.transaction-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}


.transaction-list {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

</style>