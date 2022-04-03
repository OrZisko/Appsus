import longText from '../../../cmps/long-text.cmp.js'

export default {
    props: ['data'],
    template: `
    <div>
        <div class="label-container flex">
            <span v-for="label in data.labels" :style="{backgroundColor: label.color}">{{label.label}}</span>
        </div>
        <h3>{{keep.titel}}</h3>
        <long-text :text="keep.txt"></long-text>
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
    watch: {
        data(newKeep) {
            console.log('hii');
            this.keep = JSON.parse(JSON.stringify(newKeep))
        }
    },
    components: {
        longText,
    }
}