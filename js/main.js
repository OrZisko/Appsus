import { router } from './routes.js';
import appHeader from './cmps/app-header-cmp.js'
import appFooter from './cmps/app-footer-cmp.js'
import userMsg from '../js/apps/mail/cmps/user-msg.cmp.js'



const options = {
    el: '#app',
    router,
    template: ` 
    <section class="app-main">
        <user-msg></user-msg>
        <app-header />
        <router-view />
        <app-footer />
    </section>
    `,
    components: {
        appFooter,
        appHeader,
        userMsg

    }
}

new Vue(options)