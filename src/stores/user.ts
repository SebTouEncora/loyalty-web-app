import {defineStore} from "pinia";
import type {IUser} from "@/models/IUser";
import {ref} from "vue";

export const userStore = defineStore('user', () => {
    const user = ref<IUser | undefined>(undefined);

    function getUser(): IUser | any {
        return user.value;
    }

    function setUser(_user: IUser) {
        user.value = _user;
    }

    function noUser() {
        user.value = undefined;
    }

    return {getUser, setUser, noUser}
});
