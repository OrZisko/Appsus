export default {
    props: ['data'],
    template: `
    <div>
        <div class="label-container flex">
            <span v-for="label in data.labels" :style="{backgroundColor: label.color}">{{label.label}}</span>
        </div>
        <h3>{{keep.titel}}</h3>
        <img :src="keep.url" class="img-preview">
    </div>
    `,
    data() {
        return {
            keep: {},
        }
    },
    created() {
        this.keep = JSON.parse(JSON.stringify(this.data.info))
    }
}