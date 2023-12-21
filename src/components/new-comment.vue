<template>
  <div class="block">
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading">Loading...</div>
    </div>
    <div class="block-header">
      <div class="title">
        <h2>Comments</h2>
      </div>
    </div>
    <div class="writing">
      <div contenteditable="true" autofocus spellcheck="false">
        <Textarea class="textarea" v-model="comment" autoResize rows="5" cols="30"/>
      </div>
      <div class="footer">
        <div class="text-format">
          <button class="btn"><i class="ri-bold"></i></button>
          <button class="btn"><i class="ri-italic"></i></button>
          <button class="btn"><i class="ri-underline"></i></button>
          <button class="btn"><i class="ri-list-unordered"></i></button>
        </div>
        <div class="group-button">
          <button class="btn"><i class="ri-at-line"></i></button>
          <button @click="saveComment" class="btn primary">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {ref} from "vue";
import userController from "@/views/userController";

const comment = ref('');
const isLoading = ref(false)
const saveComment = async () => {
  isLoading.value = true;
  const response = await userController.saveComment(comment.value);
  comment.value = '';
  isLoading.value = false;
  emits("save-comment");
  await userController.getAllComments();
}

const emits = defineEmits(['save-comment']);
</script>

<style scooped>

.block {
  background: #fff;
  width: 504px;
  padding: 1rem;
  background: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06), 0px 1px 1px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  display: block;
}

.block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.block-header .title {
  display: flex;
  align-items: flex-start;
}

.block-header .title .tag {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  background: #f7f7f7;
  color: #1c1c1c;
  text-align: center;
  padding: 0 4px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 96px;
}

.writing {
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
  padding: 12px;
}

.writing .textarea {
  width: 100%;
  font-family: "Inter";
  color: #585757;
  height: 50px;
  overflow-y: auto;
  appearance: none;
  border: 0;
  outline: 0;
  resize: none;
  font-size: 16px;
  line-height: 24px;
}

.writing:focus-within {
  border: 1px solid #0085ff;
  box-shadow: 0px 0px 2px 2px rgba(0, 133, 255, 0.15);
}

.writing .footer {
  margin-top: 12px;
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e8e8e8;
}

.writing .footer .text-format {
  display: flex;
  align-items: center;
  gap: 12px;
}


.comment .user-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment .user-banner .user {
  gap: 8px;
  align-items: center;
  display: flex;
}

.comment .user-banner .user .avatar {
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  position: relative;
  border-radius: 100px;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
}

.comment .user-banner .user .avatar img {
  max-width: 100%;
  border-radius: 50%;
}

.comment .user-banner .user .avatar .stat {
  display: flex;
  position: absolute;
  right: -2px;
  bottom: -2px;
  display: block;
  width: 12px;
  height: 12px;
  z-index: 9;
  border: 2px solid #ffffff;
  border-radius: 100px;
}

.comment .user-banner .user .avatar .stat.green {
  background: #00ba34;
}

.comment .user-banner .user .avatar .stat.grey {
  background: #969696;
}

.comment .footer {
  gap: 12px;
  display: flex;
  align-items: center;
}

.comment .footer .reactions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.comment .footer .divider {
  height: 12px;
  width: 1px;
  background: #e8e8e8;
}

.comment:not(.comment:first-child) {
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
}

.comment + .comment {
  padding-top: 12px;
}

.comment.reply .user-banner,
.comment.reply .content,
.comment.reply .footer {
  margin-left: 32px;
}

.group-radio .button-radio {
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.06);
}

.group-radio .button-radio label {
  cursor: pointer;
  padding: 4px 8px;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  height: 28px;
  align-items: center;
  line-height: 28px;
  transition: 0.2s ease;
}

.group-radio .button-radio:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-left: 1px solid #e8e8e8;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
}

.group-radio .button-radio:last-child {
  border-top-right-radius: 8px;
  border-right: 1px solid #e8e8e8;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  border-bottom-right-radius: 8px;
}

.group-radio .button-radio input[type=radio] {
  display: none;
}

.group-radio .button-radio input[type=radio]:checked + label {
  background: #f7f7f7;
}

.group-radio .divider {
  width: 1px;
  background: #e8e8e8;
}

h5 {
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #1c1c1c;
  letter-spacing: 0em;
  text-align: left;
}

.btn {
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;
  display: flex;
  font: inherit;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1c1c1c;
  transition: 0.2s ease;
  outline: none;
}

.btn i {
  color: #969696;
  font-size: 18px;
  transition: 0.15s ease-in-out;
}

.btn.primary {
  min-width: 64px;
  padding: 8px 12px;
  height: 40px;
  color: #fff;
  display: inline-flex;
  background: #0085ff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06), 0px 1px 1px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}

.btn.primary:hover {
  background: #339dff;
}

.btn:hover i {
  opacity: 0.7;
}

.btn img {
  max-width: 18px;
  height: auto;
}

.btn.react {
  padding: 4px 8px 4px 4px;
  background: #f7f7f7;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  gap: 4px;
}

.btn.react:hover {
  background-color: #eee;
}

.btn.dropdown {
  display: flex;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 26px;
  height: 26px;
}

.btn.dropdown:hover {
  background-color: #eee;
}

input-text {
  line-height: 24px;
}

input-text a.tagged-user {
  display: inline-flex;
  padding: 2px 8px;
  background: #e5f3ff;
  border-radius: 256px;
  color: #0085ff;
}

a {
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: #1c1c1c;
  text-decoration: none;
  transition: opacity 0.15s ease-in-out;
}

a:hover {
  opacity: 0.7;
}

h2 {
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #1c1c1c;
}

* {
  box-sizing: border-box;
}

.load span {
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #969696;
}

.load span i {
  margin-right: 6px;
}

.group-button {
  display: flex;
  gap: 16px;
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