export default {
    props: ['text'],
    template: `
    <section>
        <pre>{{textToShow}}</pre>
        <button class="no-btn long-txt-btn" v-if="!more" @click="more=true">Read more</button>
        <button class="no-btn long-txt-btn" v-if="more && isLong" @click="more=false">Read less</button>
    </section>
    `,
    data() {
        return {
            more: false,
            isLong: false,
        }
    },
    created() {
        if (this.text.length < 100) {
            this.more = true;
            this.isLong = false;
        } else {
            this.more = false;
            this.isLong = true;
        }
    },
    computed: {
        textToShow() {
            return (this.more) ? this.text : this.text.slice(0, 99) + '...';
        }
    }
}