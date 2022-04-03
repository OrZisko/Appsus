import { mailService } from "../services/mail-service.js";
import mailList from "../cmps/email-list.cmp.js";
import { eventBus } from "../../../services/event-bus.cmp.js";
import emailFolders from "../cmps/email-folders.cmp.js";
import mailCompose from "../cmps/mail-compose.cmp.js";


export default {
  template: `
    <section  class= "mail-main main-page {height: 80vh;}">
      <section class="side-main-app">
        <h1 class="folder-info">{{criteria.status}}</h1>    
        <button @click= "isCompose='open'" class="compose-btn email-options"> </button>    
        <email-folders @setFilter="moveTo"></email-folders>
      </section>
        <mail-compose v-if="isCompose" @sendEmail="sendNewEmail"></mail-compose>
       <mail-list v-else @renderEmails ="renderEmails" @filtered="emailsToShow" @deleteEmail="deleteEmail" :emails = "emails"></mail-list>
    </section>
    `,
  data() {
    return {
      emails: null,
      criteria: {
        status: "inbox",
        txt: "",
        isRead: 'All',
      },
      isCompose:null,
    };
  },
  created() {
    this.isCompose =null
    mailService.query(this.criteria).then((emails) => (this.emails = emails));
    eventBus.$on('setEmails', () => {
    mailService.query(this.criteria).then((emails) => (this.emails = emails))
    })
  },
  methods: {
    emailsToShow(updatedCriteria) {
      this.criteria.txt = updatedCriteria.txt;
      this.criteria.isRead = updatedCriteria.readOption;
      mailService.query(this.criteria).then((emails) => (this.emails = emails));
    },
    deleteEmail(id) {
     const numberOfFolder= mailService.getIndexById(id);
     if (numberOfFolder ===2) {
       const msg = {
         txt: "Deletion complete",
         type: "succes",
         
        }
        eventBus.$emit("showMsg", msg);
      } else if(numberOfFolder ===1) {
       const msg = {
         txt: "Move to trash",
         type: "succes",
       };
       eventBus.$emit("showMsg", msg);

     }
      this.emails = this.emails.filter((email) => email.id !== id);
    },
    moveTo(status){
      this.isCompose = null
        this.criteria.status=status
        mailService.query(this.criteria)
        .then((emails)=> (this.emails =emails))
        mailService.countUnReadEmails(this.criteria.status)
    },
    renderEmails(emails){
      mailService.query(this.criteria).then((emails) => (this.emails = emails))
      eventBus.$emit('countUnRead',emails)
    },
    sendNewEmail(newEmail){
     mailService.addNewEmail(newEmail)
     mailService.query(this.criteria).then((emails) => (this.emails = emails))
     this.isCompose = null
     const msg ={
       txt:'message sent',
       type:'error'
     }
     eventBus.$emit('showMsg',msg)
     
    },
    
  },

  components: {
    mailService,
    mailList,
    emailFolders,
    mailCompose
  },
};
