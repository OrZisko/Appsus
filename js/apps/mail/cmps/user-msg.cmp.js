import { eventBus} from "../../../services/event-bus.cmp.js"

export default {
    template:`
    <transition name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight">
    <div v-if="msg" class="user-msg">
        <h1>{{msg.txt}}</h1>
    </div>
    </transition>
    `,
    data(){
        return{
         msg:null

        }
    },
    created(){
        eventBus.$on('showMsg', this.showMsg )
    },
    methods:{
        showMsg(msg){
            this.msg = msg
            setTimeout(() => {
                this.msg =null
                
            }, 1400);

        }
    },
    
    components:{
        eventBus
    }
}