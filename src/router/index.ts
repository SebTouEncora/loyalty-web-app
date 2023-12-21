import {createRouter, createWebHistory} from 'vue-router'
import {userStore} from "@/stores/user";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/Profile.vue'),
            meta: {
                requiresAuth: true,
                visible: true,
                onlyAdmin: false
            }
        },
        {
            path: '/rooms',
            name: 'rooms',
            component: () => import('../views/HotelsRoom.vue'),
            meta: {
                requiresAuth: true,
                visible: true,
                onlyAdmin: false,
                org: 'org1'
            }
        },
        {
            path: '/comments',
            name: 'Comments',
            component: () => import('../views/comments.vue'),
            meta: {
                requiresAuth: true,
                visible: true,
                onlyAdmin: false,
                org: 'org1'
            }
        },
        {
            path: '/dashboard',
            name: 'Admin Dashboard',
            component: () => import('../views/adminDashboard.vue'),
            meta: {
                requiresAuth: true,
                visible: true,
                onlyAdmin: true
            }
        },
        {
            path: '/airline',
            name: 'Airline Reservation',
            component: () => import('../views/airlineReservation.vue'),
            meta: {
                requiresAuth: true,
                visible: true,
                onlyAdmin: false,
                org: 'org2'
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue'),
            meta: {
                requiresAuth: false,
                visible: false
            }
        }
    ]
})


// Guardia de navegación
router.beforeEach((to, from, next) => {
    const user = userStore().getUser();

    if (to.meta.requiresAuth && !user) {
        next({name: 'login'});
    } else if (to.name === 'login' && user) {
        next({name: 'home'});
    } else if (user) {
        if (to.meta.onlyAdmin && !user.isAdmin) {
            next({name: 'profile'});
        } else if (to.meta.onlyAdmin && user.isAdmin) {
            next();
        } else {
            if (to.path === '/airline') {
                console.log('jejejejeje')
            }
            next();
        }
    } else {
        next();
    }
});
export default router
