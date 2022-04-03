import toDo from './to-do.preview.cmp.js'

export default {
    props: ['data', 'id'],
    template: `
    <div>
        <div class="label-container flex">
            <span v-for="label in data.labels" :style="{backgroundColor: label.color}">{{label.label}}</span>
        </div>
        <h3>{{keep.titel}}</h3>
        <ul>
            <li v-for="(todo, idx) in keep.todos">
                <to-do :todo="todo" :todoidx="idx" @check="toggelTodo" @remove="removeTodo"></to-do>
                <hr>
            </li>
        </ul>
    </div>
    `,
    data() {
        return {
            keep: {},
        }
    },
    created() {
        this.keep = JSON.parse(JSON.stringify(this.data.info))
    },
    methods: {
        toggelTodo(idx) {
            var todos = this.keep.todos;
            todos[idx].doneAt = (todos[idx].doneAt) ? null : Date.now()
            this.$emit('save', this.keep, this.id)
        },
        removeTodo(idx) {
            this.keep.todos.splice(idx, 1)
            this.$emit('save', this.keep, this.id)
        },
    },
    components: {
        toDo,
    }
}