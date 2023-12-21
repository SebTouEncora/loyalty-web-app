<script setup lang="ts">
import type {IComment} from "@/models/IComment";
import {useTimeAgo} from '@vueuse/core'

const props = defineProps<{
  comment: IComment
}>();

const timeAgo = useTimeAgo(new Date(props.comment.created_at))


</script>

<template>
  <div class="user-card">
    <div class="user-image">
      <img
          src="https://thumbs.dreamstime.com/b/cartoon-avatar-man-front-view-graphic-brown-hair-wearing-eyeglasses-over-isolated-background-illustration-73243082.jpg"
          alt="User's avatar" class="avatar">
    </div>
    <div class="user-details">
      <h3 class="user-name">{{ timeAgo }}</h3>
      <p class="user-role">{{ comment.comment }}</p>
      <blockquote class="user-quote">{{ comment.userId }}</blockquote>
    </div>
  </div>
</template>


<style scoped>
.user-card {
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px; /* o la anchura que prefieras */
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-image {
  margin-bottom: 1rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-name {
  margin: 0;
  font-weight: bold;
}

.user-role {
  margin: 0;
  color: #777;
  font-size: 0.9rem;
}

.user-quote {
  font-size: 0.8rem;
  font-style: italic;
  margin-top: 1rem;
}
</style>
