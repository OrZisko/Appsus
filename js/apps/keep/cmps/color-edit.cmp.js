export default {
    props: ['colors'],
    template: `
        <ul class="color-pallete flex">
            <li v-for="color in colors" >
                <div class="color-pick" :style="{backgroundColor: color}" @click="$emit('setColor', color)"></div>
            </li>
        </ul>
    `,
}