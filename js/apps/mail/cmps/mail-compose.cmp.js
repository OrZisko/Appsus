export default {
    template:`
    <section class="compose-container" >
        <h1 class ="compose-email-title">New Email</h1>
    <form action=""class ="form-compose" @submit.prevent="addEmail">
    <input v-model="newEmail.to" type="text" placeHolder="to:">
    <input v-model="newEmail.subject" type="text"placeHolder="Subject:">
    <textarea v-model="newEmail.txt" name="" id="" cols="30" rows="7"></textarea>
    <button class ="button-form">Send</button>
    
    </form>
    
    </section>
    `,
    data(){
        return{
            newEmail:{
            to:'',
            subject:'',
            txt:''
        }


        }
    },
    methods:{
        addEmail(){
            this.$emit('sendEmail',{...this.newEmail} )
           
        },
        
    }
}