export default {
    template: `
   <section class ="folder-filter">
       <button @click="setFilter('inbox')"></button>
       <button class="sent-folder" @click="setFilter('sent')"></button>
       <button class="trash-folder" @click="setFilter('trash')"></button>
 
        </section>
       `,
       data() {
           return{
               filter :''

           }
       },
       methods:{
           setFilter(filterBy){
               this.$emit('setFilter', filterBy)
           }
       }
}