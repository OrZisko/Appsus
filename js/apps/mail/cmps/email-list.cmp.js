import { mailService } from "../services/mail-service.js";
import emailPreview from "./email-preview.cmp.js"
import emailFolders from "./email-folders.cmp.js";
import { eventBus } from "../../../services/event-bus.cmp.js";

export default {
  props: ["emails"],
  template: `
    <section class ="mail-list">
        <div class="mail-filter">
                <input @input="filterEmails" v-model="criteria.txt" type="text" placeholder="Search Mail..." >
                <select @change="filterEmails" v-model="criteria.readOption" name="" id="">
                    <option value="All">All</option>
                    <option value="read">Read</option>
                    <option value="unRead">Unread</option>
                </select>
        </div>
        <div  class="email-count">You Have {{unReadEmails}} unread emails in your Inbox</div>
        
        <div class="emails-container">
            <div v-for="email in emails" class="email-container">
                <email-preview @countUnRead="countUnRead" :email="email" > </email-preview>
                <div class="remove-email-btn">
                    <button @click="deleteEmail(email)" class="remove-btn" ></button>
                    <button :class="getReadClass(email)" @click="getRead(email.id)"></button>
                </div>
        </div>

        </div>  
    </section>
    `,
  data() {
    return {
      criteria: {
        txt: "",
        readOption: "All",
      },
      unReadEmails: null
    };
  },
  created(){
    eventBus.$on('countUnRead', (emails)=> {this.countUnRead()})
    this.countUnRead()
      
  },
  methods: {
    sendAt(email) {
      var hour = new Date(email.sentAt).getHours();
      var min = new Date(email.sentAt).getMinutes();
      hour = (hour <10) ? '0'+ hour : hour
      min = (min < 10) ? '0' +min : min
      return `${hour}:${min}`;
    },
    filterEmails() {
      this.$emit("filtered", { ...this.criteria});
    },
    isRead(email){
        console.log(email.isRead);
       return (email.isRead)? 'isRead': 'isUnRead'

    },
    deleteEmail(email){
      const emailId = email.id
      this.$emit('deleteEmail', emailId)
      this.countUnRead()
      

    },
    countUnRead(){
      this.unReadEmails = mailService.countUnReadEmails()

    },
    getReadClass(email) {
      if (email.isRead) return 'read';
      else return 'unRead' 
    },
    getRead(emailId){
      var emails =mailService.changeReadMode(emailId)
      this.$emit('renderEmails',emails )

    },
   
    

   
  },

  components:{
    emailPreview,
    emailFolders,
    eventBus
     },

  

  
};
