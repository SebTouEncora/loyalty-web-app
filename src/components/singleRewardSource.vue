<template>
  <div class="transaction-entry">
    <div class="transaction-info">
      <div class="transaction-name">{{ rewardSource.reason }}</div>
      <div v-show="rewardSource.alias" class="transaction-date">{{ rewardSource.alias }}</div>
      <div v-show="date" class="transaction-date">{{ date }}</div>

    </div>
    <div :style="{color: cardColor}" class="transaction-amount">{{ icon + rewardSource.points.toFixed(2) }}</div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import type {IPointSource} from "@/models/IUser";
import {useDateFormat} from '@vueuse/core'


const props = defineProps<{
  rewardSource: IPointSource
}>();

const date = props.rewardSource.date ? useDateFormat(props.rewardSource.date, 'YYYY-MM-DD') : undefined
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-PE', {style: 'currency', currency: 'PEN'}).format(amount);
};

const icon = ref('');


const cardColor = computed(() => {
  switch (props.rewardSource.reason) {
    case 'Joining_Rewards':
    case 'Trasnfer_to':
    case 'Purchase':
    case 'Review':
      icon.value = '+'
      return '#90ee90'; // Green
    case 'Transfer_from':
    case 'Redeem':
      icon.value = '-';
      return '#ffcccb'; // Red
    default:
      return '#ffffff';
  }
});
</script>

<style scoped>


.transaction-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.transaction-info {
  display: flex;
  flex-direction: column;
}

.transaction-name {
  font-weight: bold;
  color: #333;
}

.transaction-date {
  color: #666;
  font-size: 0.8rem;
}

.transaction-amount {
  font-weight: bold;
  color: #333;
}


</style>
