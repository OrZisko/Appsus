export default {
    template: `
    <ul class="width-sizes flex">
        <li v-for="size in sizes">
            <div class="width-pick" @click="$emit('setWidth', size.size)" :style="lineWidth(size.display)"></div>
        </li>
    </ul>
    `,
    data() {
        return {
            sizes: [{ size: 2, display: '2px' }, { size: 4, display: '4px' }, { size: 6, display: '6px' }, { size: 8, display: '8px' },]
        }
    },
    methods: {
        lineWidth(size) {
            return `border-bottom: ${size} solid black`
        }
    }
}