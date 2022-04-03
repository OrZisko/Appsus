import bgColorEdit from './color-edit.cmp.js'
import labelPicker from '../../../cmps/label-picker.cmp.js'



export default {
    props: ['editKeep'],
    template: `
    <div :style="{backgroundColor: keep.style.bgc}">
        <div class="flex col">
            <input class="txt-input" type="text" v-model="keep.info.titel" placeholder="Titel">
            <img :src="keep.info.url" class="uploading-img">
            <input class="txt-input" type="file" @change="onImgInput">
        </div>
        <div class="btn-container">    
            <button @click.prevent="save">Save</button>
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
            colors: ['white', 'aqua', 'teal', 'lime', 'silver', 'salmon', 'olive', 'moccasin', 'mediumslateblue', 'red'],
            isLabeling: false,

        }
    },
    created() {
        if (this.editKeep) this.changeKeep();
        else this.keep = {
            type: 'noteImg',
            isPinned: false,
            info: { titel: '', url: null },
            style: { bgc: '' },
            stringSum: '',
            labels: [],
        }
    },
    methods: {
        onImgInput(ev) {
            const img = ev.target.files[0]
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = ev => {
                this.keep.info.url = ev.target.result;
            }
        },
        setColor(color) {
            this.keep.style.bgc = color;
            this.isBgcEdit = false
        },
        save() {
            this.keep.stringSum = this.keep.info.titel
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
    watch: {
        editKeep(newKeep) {
            this.changeKeep()
        }
    },
    components: {
        bgColorEdit,
        labelPicker
    }
}