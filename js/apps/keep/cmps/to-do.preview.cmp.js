export default {
    props: ['todo', 'todoidx'],
    template: `
    <article class="flex to-do">
        <input type="checkbox" :checked="changeToDo.doneAt" @change="toggelToDo">
        <p :class="{'marked-to-do': changeToDo.doneAt}" @click="toggelToDo">{{changeToDo.txt}}</p>
        <button class="no-btn" @click="remove">X</button>
    </article>
    `,
    data() {
        return {
            changeToDo: null,
        }
    },
    created() {
        this.changeToDo = JSON.parse(JSON.stringify(this.todo))
    },
    methods: {
        toggelToDo() {
            this.$emit('check', this.todoidx)
            this.changeToDo.doneAt = !this.changeToDo.doneAt
        },
        remove() {
            this.$emit('remove', this.todoidx)
        }
    }
}