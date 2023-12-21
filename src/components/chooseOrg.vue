<script lang="ts" setup>
const emits = defineEmits<{
  (e: 'org1'): void;
  (e: 'org2'): void
}>();

const selectHotel = () => {
  emits('org1')
}
const selectAirline = () => {
  emits('org2')
}
</script>

<template>
  <Card style="width: 25em">
    <template #header>
      <img style="max-width:25em; max-height: 450px " alt="user header"
           src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/1a/ea/54/hotel-presidente-4s.jpg?w=1200&h=-1&s=1"/>
    </template>
    <template #title>Cadena Hotelera</template>
    <template #content>
      <p class="m-0">
        Stay in a beautiful place
      </p>
    </template>
    <template #footer>
      <Button icon="pi pi-check" @click="selectHotel" label="Select"/>
    </template>
  </Card>
  <Card style="width: 25em">
    <template #header>
      <img style="max-width:25em; max-height: 450px " alt="user header"
           src="https://elcomercio.pe/resizer/5_uv8PtIiMUTGD8gwRpoDigu040=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/GVPSFSAJPNG2PAKXDUWS7HZOCA.jpg"/>
    </template>
    <template #title> Airline</template>
    <template #content>
      <p class="m-0">
        Travel with us
      </p>
    </template>
    <template #footer>
      <Button icon="pi pi-check" @click="selectAirline" label="Select"/>
    </template>
  </Card>
</template>

<style scoped>

</style>