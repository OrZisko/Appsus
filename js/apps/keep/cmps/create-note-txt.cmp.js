import bgColorEdit from './color-edit.cmp.js'
import labelPicker from '../../../cmps/label-picker.cmp.js'


export default {
    props: ['editKeep'],
    template: `
    <form :style="{backgroundColor: keep.style.bgc}">
        <input class="txt-input" autofocus type="text" v-model="keep.info.titel" placeholder="Titel"/>
        <textarea v-model="keep.info.txt" rows="5" placeholder="Text"></textarea>
        <div class="btn-container">
            <button @click.prevent="save">Save</button>
            <button class="no-btn" @click.prevent="isBgcEdit = !isBgcEdit"><i class="fas fa-palette"></i></button>
            <button class="no-btn" @click="isLabeling=!isLabeling"><i class="fas fa-tags"></i></button>
        </div>
        <bg-color-edit v-if="isBgcEdit" @setColor="setColor" :colors="colors"></bg-color-edit>
        <label-picker v-if="isLabeling" @label="setLabel"></label-picker>
        <div class="label-container flex">
            <span v-for="label in keep.labels" :style="{backgroundColor: label.color}">{{label.label}}</span>
        </div>
    </form>
    `,
    data() {
        return {
            keep: [],
            isBgcEdit: false,
            colors: ['white', 'aqua', 'teal', 'lime', 'silver', 'salmon', 'olive', 'moccasin', 'mediumslateblue', 'red'],
            isLabeling: false,

        }
    },
    created() {
        if (this.editKeep) this.changeKeep();
        else this.keep = {
            type: 'noteTxt',
            isPinned: false,
            info: { titel: '', txt: '' },
            style: { bgc: '' },
            stringSum: '',
            labels: [],
        }
    },
    methods: {
        setColor(color) {
            this.keep.style.bgc = color;
            this.isBgcEdit = false
        },
        save() {
            var keepInfo = this.keep.info
            this.keep.stringSum = keepInfo.titel + ' ' + keepInfo.txt
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
        bgColorEdit,
        labelPicker
    },
    watch: {
        editKeep(newKeep) {
            this.changeKeep()
        }
    }

}