import noteTxt from './create-note-txt.cmp.js'
import noteImg from './create-note-img.cmp.js'
import noteToDo from './create-note-to-do.cmp.js'
import noteCanvas from './create-note-canvas.js'

export default {
    props: ['editedKeep'],
    template: `
    <section class="keep-create-container" >
        <div type="text" class="keep-creat" @click="createNote('noteTxt')">
            Take a note...
            <div>
                <button class="no-btn" @click.stop="createNote('noteImg')"><i class="far fa-images"></i></button>
                <button class="no-btn" @click.stop="createNote('noteToDo')"><i class="fas fa-list"></i></button>
                <button class="no-btn" @click.stop="createNote('noteCanvas')"><i class="fas fa-paint-brush"></i></button>
            </div>
        </div>
        <div v-if="isCreating">
            <component class="keep-make" :is="keepType" @save="save" :editKeep="editKeep"></component>
            <button class="no-btn" @click="close">X</button>
        </div>
    </section>
    `,
    data() {
        return {
            keepType: 'noteTxt',
            isCreating: false,
            isEditing: false,
            editKeep: null,
        }
    },
    methods: {
        createNote(type) {
            this.keepType = type;
            this.isCreating = true;
        },
        save(keep) {
            this.$emit('create', keep)
            this.isCreating = false;
            this.editKeep = null;
        },
        close() {
            this.isCreating = false
            this.editKeep = null;
        }
    },
    watch: {
        editedKeep(newKeep) {
            if (!newKeep) return
            this.editKeep = newKeep
            this.createNote(newKeep.type)
        }
    },
    components: {
        noteTxt,
        noteImg,
        noteToDo,
        noteCanvas
    }

}