import colorEdit from './color-edit.cmp.js'
import widthEdit from './width-edit.js'
import labelPicker from '../../../cmps/label-picker.cmp.js'
import { canvasSerice } from '../service/canvas-service.js'


export default {
    props: ['editKeep'],
    template: `
    <div :style="{backgroundColor: keep.style.bgc}">
        <div class="flex col">
            <input class="txt-input" type="text" v-model="keep.info.titel" placeholder="Titel">
            <div class="keep-canvas-container">
                <canvas id="my-keep-canvas" width="400" height="600"></canvas>
            </div>
        </div>
        <div class="btn-container">
            <button @click="isEditing = !isEditing"><i class="fas fa-pencil-alt"></i></button>
            <button @click.prevent="save">Save</button>
            <button class="no-btn" @click="isBgcEdit = !isBgcEdit"><i class="fas fa-palette"></i></button>
            <button class="no-btn" @click="isLabeling=!isLabeling"><i class="fas fa-tags"></i></button>
            <color-edit v-if="isEditing" @setColor="setDrawColor" :colors="drawColors"></color-edit>
            <width-edit class="width-edit" v-if="isEditing" @setWidth="setWidth"></width-edit>
        </div>
        <color-edit v-if="isBgcEdit" @setColor="setColor" :colors="keepColors"></color-edit>
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
            canvas: null,
            ctx: null,
            startPos: {},
            isPainting: false,
            lineWidth: 8,
            isEditing: false,
            drawColor: 'black',
            keepColors: ['white', 'aqua', 'teal', 'lime', 'silver', 'salmon', 'olive', 'moccasin', 'mediumslateblue', 'red'],
            drawColors: ['black', 'blue', 'red', 'green', 'white'],
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
    mounted() {
        this.canvas = document.querySelector('#my-keep-canvas')
        this.ctx = this.canvas.getContext('2d')
        this.addMouseListeners()
        this.addTouchListeners()
    },
    methods: {
        setColor(color) {
            this.keep.style.bgc = color;
            this.isBgcEdit = false
        },
        save() {
            const url = this.canvas.toDataURL('image/png');
            console.log(url);
            this.keep.info.url = url;
            this.keep.stringSum = this.keep.info.titel
            this.$emit('save', this.keep)
        },
        changeKeep() {
            this.keep = this.editKeep
        },
        addMouseListeners() {
            this.canvas.addEventListener('mousemove', this.onMove)
            this.canvas.addEventListener('mousedown', this.onDown)
            this.canvas.addEventListener('mouseup', this.onUp)
        },
        addTouchListeners() {
            this.canvas.addEventListener('touchmove', this.onMove)
            this.canvas.addEventListener('touchstart', this.onDown)
            this.canvas.addEventListener('touchend', this.onUp)
        },
        onDown(ev) {
            this.startPos = canvasSerice.getEvPos(ev)
            this.isPainting = true;

        },
        onMove(ev) {
            if (!this.isPainting) return
            const start = this.startPos;
            const goTo = canvasSerice.getEvPos(ev)
            this.ctx.beginPath();
            this.ctx.moveTo(start.x, start.y);
            this.ctx.lineTo(goTo.x, goTo.y);
            this.ctx.lineWidth = this.lineWidth
            this.ctx.strokeStyle = this.drawColor;
            this.ctx.stroke()
            this.startPos = goTo;
        },
        onUp(ev) {
            this.isPainting = false;
        },
        setDrawColor(color) {
            this.drawColor = color;
        },
        setWidth(size) {
            console.log(size);
            this.lineWidth = size
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
        colorEdit,
        canvasSerice,
        widthEdit,
        labelPicker
    }
}