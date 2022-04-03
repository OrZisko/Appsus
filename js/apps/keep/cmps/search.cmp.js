export default {
    props: [],
    template: `
    <form class="search-container">
        <button class="no-btn" @click.prevent="$emit('search',keyFilter)"><i class="fas fa-search"></i></button>
        <input class="search-input" type="text" v-model="keyFilter" placeholder="Search">
        <button class="no-btn" @click.prevent="clearSearch">X</button>
        <select name="select-type" id="select-type" v-model="typeFilter" @change="$emit('filterType', typeFilter)">
            <option></option>
            <option v-for="type in types" :value="type.type">{{type.display}}</option>
        </select>
    </form>
    `,
    data() {
        return {
            keyFilter: '',
            types: [
                { type: 'noteTxt', display: 'Text note' },
                { type: 'noteImg', display: 'Image note' },
                { type: 'noteToDo', display: 'List note' },
            ],
            typeFilter: ''
        }
    },
    methods: {
        clearSearch() {
            this.keyFilter = '';
            this.$emit('search', '')
        },

    }
}