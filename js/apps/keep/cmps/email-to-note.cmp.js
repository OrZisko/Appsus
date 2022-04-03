export default {
    template:`
    <h1>heellloo</h1>
    `,
    created(){
        console.log(this.$route.params);
    }
}