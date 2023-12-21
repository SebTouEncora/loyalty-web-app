import {defineStore} from "pinia";
import type {IComment} from "@/models/IComment";
import {ref} from "vue";


export const commentStore = defineStore('comment', () => {
    const comment = ref<Array<IComment>>([]);
    const addComment = (newComment: IComment) => {
        comment.value.push(newComment);
    };

    const setComments = (comments: Array<IComment>) => {
        comment.value = [...comments];
    }

    const getComments = () => {
        return comment.value;
    }
    return {getComments, setComments, addComment}


})