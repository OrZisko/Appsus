import bgColorEdit from '../cmps/color-edit.cmp.js'
import labelPicker from '../../../cmps/label-picker.cmp.js'

export default {
    props: ['keep'],
    template: `
        <div class="keep-preview-btns">
            <button class="no-btn" @click="toggleSetColor(keep.id)"><i class="fas fa-palette"></i></button>
            <button class="no-btn" @click="isLabeling=!isLabeling"><i class="fas fa-tags"></i></button>
            <button class="no-btn" ><i class="fas fa-envelope"></i></button>
            <button class="no-btn" @click="$emit('keepTo')"><i class="far fa-edit"></i></button>
            <button class="no-btn" @click="$emit('copy', keep)"><i class="fas fa-copy"></i></button>
            <button class="no-btn" @click="$emit('remove',keep.id)"><i class="far fa-trash-alt"></i></button>
            <bg-color-edit v-if="isBgcEdit && editKeepId === keep.id" @setColor="setColor" :colors="colors"></bg-color-edit>
            <label-picker v-if="isLabeling" @label="setLabel"></label-picker>
        </div>
    `,
    data() {
        return {
            isBgcEdit: false,
            editKeepId: null,
            colors: ['white', 'aqua', 'teal', 'lime', 'silver', 'salmon', 'olive', 'moccasin', 'mediumslateblue', 'red'],
            isLabeling: false,
        }
    },
    methods: {
        toggleSetColor(id) {
            this.isBgcEdit = !this.isBgcEdit;
            this.editKeepId = id
        },
        setColor(color) {
            this.$emit('setColor', color, this.keep.id)
            this.isBgcEdit = false;
        },
        setLabel(label) {
            this.$emit('label', label, this.keep.id)
        }

    },
    components: {
        bgColorEdit,
        labelPicker
    }
}