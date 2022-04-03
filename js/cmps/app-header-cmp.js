export default {
    template: `
    <header class ="app-header">
        <div class="logo">
            <h1>Apssus</h1> 
        </div>
        <nav class="nav-header" v-if="isNav">
            <router-link to="/">Home</router-link>
            <router-link to="/mail">Mail</router-link>
            <router-link to="/keep">keep</router-link>
        </nav>
        <!-- <button class=no-btn @click="isNav=!isNav">
            <i class="fas fa-bars" ></i>
        </button> -->
    </header>
    `,
    data() {
        return {
            isNav: true,
        }
    }
}