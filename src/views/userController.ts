import axios from "axios";
import {reactive, watch} from "vue";
import {userStore} from "@/stores/user";
import type {IComment} from "@/models/IComment";
import {commentStore} from "@/stores/comment";


class UserController {

    private BASE_URL = 'http://localhost:3005';
    private ORG_HEADER = {'org': import.meta.env.VITE_ORG_HEADER};
    private ORG_HEADER2 = {'org': import.meta.env.VITE_ORG_HEADER2};
    private userST = userStore();
    private comentST = commentStore();
    private _userOrgs: Array<string> | undefined = undefined;
    private _pointsEquivalency: string | number | undefined = undefined;
    private _selectedUserOrg: string | undefined = undefined;


    get selectedUserOrg(): string | undefined {
        return this._selectedUserOrg;
    }

    set selectedUserOrg(value: string | undefined) {
        this._selectedUserOrg = value;
    }

    setuserOrgs(value: Array<string> | undefined) {
        console.log(this._userOrgs)
        this._userOrgs = value;
    }

    getpointsEquivalency(): string | number | undefined {
        return this._pointsEquivalency;
    }

    async updateUser(id: string) {
        try {
            const response = await axios.get(`${this.BASE_URL}/read-user`, {
                headers: this.ORG_HEADER,
                params: {userId: id}
            });
            this.userST.setUser(response.data.response);
            this._userOrgs = this.userST.getUser().companies;
            console.log(this._userOrgs)
            // await this.updatePointsEquivalency(); REVIEW: GUESS THIS IS NOT MANDATORY
        } catch (e) {
            console.error("Error al hacer login:", e);
        }
    }

    async updatePointsEquivalency() {
        const header = {'org': this._selectedUserOrg}
        console.log({header})
        this._pointsEquivalency = (await axios.get(`${this.BASE_URL}/convert-points-to-dollars`, {
            params: {
                points: this.userST.getUser().points
            },
            headers: header
        })).data.response;
    }

    async transferPoints(userdToId: string, points: string): Promise<any> {
        const userFromId = this.userST.getUser()?.id;
        try {
            const response = await axios.post(`${this.BASE_URL}/transfer-points`, {
                userIdFrom: userFromId,
                userIdTo: userdToId,
                points: points
            }, {
                headers: this.ORG_HEADER
            });
            await this.updateUser(userFromId!);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response);
                return error.response?.data;
            } else {
                console.error('Unexpected error:', error);
                throw error;
            }
        }
    }

    async book(amountSpent: number, org1: boolean) {
        const userFromId = this.userST.getUser()?.id;
        try {
            const response = await axios.post(`${this.BASE_URL}/earn-points`, {
                userId: userFromId,
                amountSpent: amountSpent
            }, {
                headers: org1 ? this.ORG_HEADER : this.ORG_HEADER2
            });
            await this.updateUser(userFromId!);
            return response;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response);
                return error.response?.data;
            } else {
                console.error('Unexpected error:', error);
                throw error;
            }
        }
    }

    async bookwithPoints(amountSpent: number, org1: boolean) {
        const userFromId = this.userST.getUser()?.id;
        try {
            const response = await axios.post(`${this.BASE_URL}/redeem-points`, {
                userId: userFromId,
                amountSpent: amountSpent
            }, {
                headers: org1 ? this.ORG_HEADER : this.ORG_HEADER2
            });
            await this.updateUser(userFromId!);
            return response;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response);
                return error.response?.data;
            } else {
                console.error('Unexpected error:', error);
                throw error;
            }
        }
    }

    async saveComment(comment: string) {
        const header = {'org': this._selectedUserOrg}
        const userFromId = this.userST.getUser()?.id;
        try {
            const response = await axios.post(`${this.BASE_URL}/register-comment`, {
                userId: userFromId,
                comment: comment
            }, {
                headers: header
            });

            await this.updateUser(userFromId!);
            await this.getAllComments();
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response);
                return error.response?.data;
            } else {
                console.error('Unexpected error:', error);
                throw error;
            }
        }
    }

    async getAllComments(): Promise<IComment> {
        let response;
        try {
            response = await axios.get(`${this.BASE_URL}/get-comments`, {
                headers: this.ORG_HEADER,
            });
        } catch (e) {
            console.error("Error al hacer login:", e);
        }

        this.comentST.setComments(response?.data)
        return response?.data;
    }

    //TODO: admin methods


    async getConversionRules(): Promise<any> {
        let response;
        try {
            response = await axios.get(`${this.BASE_URL}/get-conversion`, {
                headers: {'org': this._selectedUserOrg},
            });
        } catch (e) {
            console.error("Error al hacer login:", e);
        }
        return response?.data;
    }

    async updateJoiningRewards(newData: string): Promise<boolean> {
        console.log(this.BASE_URL)
        let response;
        try {
            response = await axios.post(`${this.BASE_URL}/set-joining-reward`, {
                points: newData
            }, {
                headers: {'org': this._selectedUserOrg},
            });
        } catch (e) {
            console.error("Error al hacer login:", e);
        }
        return response?.status.toString().startsWith('2')!;
    }

    async updateReviewPoints(newData: string): Promise<boolean> {
        let response;
        try {
            response = await axios.post(`${this.BASE_URL}/set-review-reward`, {points: newData}, {
                headers: {'org': this._selectedUserOrg},
            });
        } catch (e) {
            console.error("Error al hacer login:", e);
        }
        return response?.status.toString().startsWith('2')!;
    }

    async updatePointsToFiat(newData: string): Promise<boolean> {
        let response;
        try {
            response = await axios.post(`${this.BASE_URL}/set-conversion-rule`, {points: newData}, {
                headers: {'org': this._selectedUserOrg},
            });
        } catch (e) {
            console.error("Error al hacer login:", e);
        }
        return response?.status.toString().startsWith('2')!;
    }

}

const userController = reactive(new UserController());
export default userController;

watch(
    () => userController.selectedUserOrg,
    () => {
        console.warn('User org changed', userController.selectedUserOrg)
    },
    {deep: true, immediate: true}
)