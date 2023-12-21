<template>
  <div class="full-page-container">
    <Button class="add-comment" icon="pi pi-plus" rounded aria-label="Filter" @click="showDialog = true"/>
    <Dialog v-model:visible="showDialog" modal header="New comment" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <new-comment @save-comment="handleSaveComment"/>
    </Dialog>

    <div class="comments-carousel">
      <single-comment class="s-comment" v-for="(comment, index) in comments" :key="index" :comment="comment"/>
    </div>
  </div>
</template>


<script setup lang="ts">
import NewComment from "@/components/new-comment.vue";
import {onMounted, ref} from "vue";
import userController from "@/views/userController";
import SingleComment from "@/components/single-comment.vue";
import {commentStore} from "@/stores/comment";
import {userStore} from "@/stores/user";

const showDialog = ref(false)
const commentST = commentStore();
const comments = ref(commentST.getComments());
const userST = userStore();

onMounted(async () => {
  await loadComments();
  userController.selectedUserOrg = 'org1'
})

const handleSaveComment = async () => {
  showDialog.value = false;
  await loadComments();
  await userController.updateUser(userST.getUser().id);
};

const loadComments = async () => {
  await userController.getAllComments();
  comments.value = commentST.getComments().reverse();
};

</script>

<style scoped>
.full-page-container {
  width: 80vw;
  padding: 2rem;
  box-sizing: border-box;
  margin-top: 50px
}


.comments-carousel {
  display: grid;
  gap: 1rem;
  grid-auto-rows: 15rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr))
}

.comments-carousel::-webkit-scrollbar {
  display: none;
}

.comments-carousel {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

</style>

