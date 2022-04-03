import toDo from './to-do.preview.cmp.js'
import bgColorEdit from './color-edit.cmp.js'
import labelPicker from '../../../cmps/label-picker.cmp.js'



export default {
    props: ['editKeep'],
    template: `
    <div :style="{backgroundColor: keep.style.bgc}">
        <input class="txt-input" type="text" placeholder="Titel" v-model="keep.info.titel" autofocus>
        <ul class="to-do-container">
            <li v-for="(todo, idx) in keep.info.todos">
                <to-do  :todo="todo" :todoidx="idx" @check="toggelTodo" @remove="removeTodo"></to-do>
                <hr>
            </li>
            <form class="flex">
                <input class="txt-input" type="text" v-model="newTodo">
                <button class="no-btn" @click.prevent="addTodo">+</button>
            </form>
            <hr>
        </ul>
        <div class="btn-container">
            <button @click="save">Save</button>
            <button class="no-btn" @click="isBgcEdit = !isBgcEdit"><i class="fas fa-palette"></i></button>
            <button class="no-btn" @click="isLabeling=!isLabeling"><i class="fas fa-tags"></i></button>
        </div>
        <bg-color-edit v-if="isBgcEdit" @setColor="setColor" :colors="colors"></bg-color-edit>
        <label-picker v-if="isLabeling" @label="setLabel"></label-picker>
        <div class="label-container flex">
            <span v-for="label in keep.labels" :style="{backgroundColor: label.color}">{{label.label}}</span>
        </div>
    </div>
    `,
    data() {
        return {
            keep: {},
            isBgcEdit: false,
            newTodo: '',
            colors: ['white', 'aqua', 'teal', 'lime', 'silver', 'salmon', 'olive', 'moccasin', 'mediumslateblue', 'red'],
            isLabeling: false,
        }
    },
    created() {
        if (this.editKeep) this.changeKeep();
        else this.keep = {
            type: 'noteToDo',
            info: {
                titel: '',
                todos: [
                    { txt: 'Driving liscence', doneAt: null },
                    { txt: 'Coding power', doneAt: 18711111 }
                ]
            },
            style: { bgc: '' },
            stringSum: '',
            labels: []
        }
    },
    methods: {
        addTodo() {
            if (!this.newTodo) return;
            var todo = { txt: this.newTodo, doneAt: null };
            this.keep.info.todos.push(todo)
            this.newTodo = '';
        },
        toggelTodo(idx) {
            var todos = this.keep.info.todos;
            todos[idx].doneAt = (todos[idx].doneAt) ? null : Date.now()
        },
        removeTodo(idx) {
            this.keep.info.todos.splice(idx, 1)
        },
        setColor(color) {
            this.keep.style.bgc = color;
            console.log(this.keep);
            this.isBgcEdit = false
        },
        save() {
            this.keep.stringSum = this.keep.info.titel;
            this.keep.info.todos.forEach(todo => {
                this.keep.stringSum += (' ' + todo.txt)
            })
            console.log(this.keep);
            this.$emit('save', this.keep)
        },
        changeKeep() {
            this.keep = this.editKeep
        },
        setLabel(newLabel) {
            const labelIdx = this.keep.labels.findIndex(label => label.label === newLabel.label)
            if (labelIdx === -1) this.keep.labels.push(newLabel)
            else this.keep.labels.splice(labelIdx, 1)
        }
    },
    components: {
        toDo,
        bgColorEdit,
        labelPicker,
    },
    watch: {
        editKeep(newKeep) {
            this.changeKeep()
        }
    }

}