export default {
    template: `
    <ul>
        <li v-for="label in labels" :style="{backgroundColor: label.color}" @click="$emit('label', label)">{{label.label}}</li>
    </ul>
    `,
    data() {
        return {
            labels: [
                { label: 'Critical', color: 'red' },
                { label: 'Family', color: 'blue' },
                { label: 'Work', color: 'green' },
                { label: 'Friends', color: 'yellow' },
                { label: 'Spam', color: 'orange' },
                { label: 'Memories', color: 'purple' },
                { label: 'Romantic', color: 'turquoise' },
            ]
        }
    }
}