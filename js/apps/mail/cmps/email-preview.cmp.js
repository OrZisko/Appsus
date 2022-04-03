import { eventBus } from "../../../services/event-bus.cmp.js";
import { mailService } from "../services/mail-service.js";

export default {
    props:['email'],
    template: `
    <section @click="changeIsRead(email)"  class="email-preview">
    
     <div v-if="beenRead ===false" class ="email" >
         <div class="email-send">{{email.from}}</div>
         <div class="email-subject">{{email.subject}}</div>
         <div class="email-sent-time">{{email.sentAt}}</div> 
         
         </div>
         <section v-if="beenRead" class ="email-preview-open">
           <section class ="email-open" >
             <h3 class="email-subject" >{{email.subject}}</h3>
             <h1 class ="email-send" >from:{{email.from}}</h1>
             <h1 class="email-sent-time">At:{{email.sentAt}}</h1>
             <p class="email-body">{{email.body}}</p>
           </section>
           <section class="btn-actions">
             <div class="remove-email-btn-open">
            </div>
           </section>

         </section>

        

      
         </section>
       `,
       data(){
           return {
               mail: this.email,
               beenRead:false
           }
       },
      
       methods: {
       
        filterEmails() {
          this.$emit("filtered", { ...this.filterBy });
        },
        changeIsRead(email){
          console.log(this.beenRead);
          this.beenRead = !this.beenRead
            mailService.getEmailById(email.id)
            this.$emit('countUnRead')
            eventBus.$emit('setEmails')

        }
       
    },
    computed:{
    isRead(){
}
},
 
    
    
         
       
}

