<template>
  <div class="room-detail">
    <img class="room-image" :src="roomData.image" alt="Room Image"/>
    <div class="room-info">
      <h3>{{ roomData.name }}</h3>
      <p>{{ roomData.description }}</p>
      <div class="room-price">$ {{ roomData.price }}</div>
      <Button label="Book" @click="bookRoom" class="book-button"/>
    </div>
  </div>
</template>

<script setup lang="ts">


const props = defineProps({
  roomData: {
    type: Object,
    required: true
  }
});

const emits = defineEmits(['book-room']);

function bookRoom() {
  emits('book-room', props.roomData);
}

</script>

<style scoped>
.room-detail {
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.room-detail img {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.room-detail:hover img {
  transform: scale(1.10);
}

.room-info {
  padding: 1rem;
}

.room-price {
  color: #4CAF50;
  font-weight: bold;
}

.book-button {
  background-color: #4CAF50;
  border: none;
  color: white;
}

.room-card:hover .room-card-image {
  opacity: 0.9;
}
</style>
