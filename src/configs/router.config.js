

import App from '../App'
import Demo from '@/page/demo/index'
let pageName = 'kbuild-vue'
const router = {
    routes: [
        {
            path: '/',
            component: App,
            children: [
                 {
                     path:'/',
                     component:Demo
                 }

            ]
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
}

export default router;
