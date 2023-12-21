<template>
  <div>
    <Toast style="margin-top: 50px"/>
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading">Loading...</div>
    </div>
    <div v-if="!isLoading && conversionRule">

      <div>
        <label class="block text-900 font-medium mb-2" for="joiningRewards">Joining Rewards</label>
        <InputText id="joiningRewards" v-model="conversionRule.joiningRewards" class="w-full mb-3"/>
        <Button class="mb-3" label="Update Joining Rewards" @click="updateJoiningRewards"></Button>
      </div>

      <div>
        <label class="block text-900 font-medium mb-2" for="pointsToFiat">Points to Fiat</label>
        <InputText id="pointsToFiat" v-model="conversionRule.pointsToFiat" class="w-full mb-3"/>
        <Button class="mb-3" label="Update Points to Fiat" @click="updatePointsToFiat"></Button>
      </div>

      <div>
        <label class="block text-900 font-medium mb-2" for="review">Review Points</label>
        <InputText id="review" v-model="conversionRule.review" class="w-full mb-3"/>
        <Button class="mb-3" label="Update Review Points" @click="updateReviewPoints"></Button>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import userController from "@/views/userController";
import {useToast} from "primevue/usetoast";

const conversionRule = ref();
const isLoading = ref(false)
const toast = useToast();
onMounted(async () => {
  console.log('aaaaa')
  isLoading.value = true;
  conversionRule.value = (await userController.getConversionRules()).response;
  isLoading.value = false;
});


const updateJoiningRewards = async () => {
  isLoading.value = true;
  const r = await userController.updateJoiningRewards(conversionRule.value.joiningRewards);
  if (r) {
    toast.add({severity: 'success', summary: 'Updated', detail: 'Joining rewards updated ', life: 5000});
  } else {
    toast.add({severity: 'error', summary: 'Error', detail: 'There was an error', life: 3000});
  }
  conversionRule.value = (await userController.getConversionRules()).response;
  isLoading.value = false;
};

const updatePointsToFiat = async () => {
  isLoading.value = true;
  console.log(conversionRule.value.pointsToFiat)
  const r = await userController.updatePointsToFiat(conversionRule.value.pointsToFiat);
  if (r) {
    toast.add({severity: 'success', summary: 'Updated', detail: 'Conversion rule updated ', life: 5000});
  } else {
    toast.add({severity: 'error', summary: 'Error', detail: 'There was an error', life: 3000});
  }
  conversionRule.value = (await userController.getConversionRules()).response;
  isLoading.value = false;
};

const updateReviewPoints = async () => {
  isLoading.value = true;
  const r = await userController.updateReviewPoints(conversionRule.value.review);
  if (r) {
    toast.add({severity: 'success', summary: 'Updated', detail: 'Review points updated ', life: 5000});
  } else {
    toast.add({severity: 'error', summary: 'Error', detail: 'There was an error', life: 3000});
  }
  conversionRule.value = (await userController.getConversionRules()).response;
  isLoading.value = false;
};
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

</style>
