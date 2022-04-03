import homePage from './pages/home-page.cmp.js'
import keepMain from './apps/keep/pages/keep-home.js'
import mailApp from './apps/mail/pages/mail-app.js'
import mailCompose from './apps/mail/cmps/mail-compose.cmp.js'
import emailToNote from './apps/keep/cmps/email-to-note.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/keep',
        component: keepMain
    },
    {
        path: '/keep/:emailSubject/:emailBody',
        component:emailToNote

    },
    {
        path: '/mail',
        component: mailApp,
       
    }

];

export const router = new VueRouter({ routes })