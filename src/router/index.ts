import { createRouter, createWebHistory } from 'vue-router'
import ViewTeam from '../views/ViewTeam.vue'

const routes = [
    {path:'/', name:'ViewTeam', component: ViewTeam},
    {
        path:'/create/:team?', 
        name:'CreateTeam', 
        component:()=>import(/**webpackChunkName*/'@/views/CreateTeam.vue'),
        children:[
            {
                path:':page?',
                name: 'CreatePickBoard',
                component:()=>import(/**webpackChunkName*/'@/components/PickBoard.vue')
            }
        ]
    },
    {
        path:'/edit/:team?', 
        name:'EditTeam', 
        component:()=>import(/**webpackChunkName*/'@/views/CreateTeam.vue'),
        children:[
            {
                path:':page?',
                name: 'EditPickBoard',
                component:()=>import(/**webpackChunkName*/'@/components/PickBoard.vue'),
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active-status'
})

export default router