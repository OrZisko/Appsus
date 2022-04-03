import { keepService } from '../service/keep-service.js'
import keepCreat from '../cmps/keep-create.cmp.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteToDo from '../cmps/note-to-do.cmp.js'
import search from '../cmps/search.cmp.js'
import keepPreviewBtns from '../cmps/keep-preview-btn.js'



export default {
    template: `
    <main class="main-page keep-home">
        <div class ="keep-header flex">
            <search @search="onSearch" @filterType="filterByType"></search>
        </div>
        <keep-creat @create="createKeep" :editedKeep="keepToEdit"></keep-creat>
        <ul class="keeps-container">
            <li v-for="keep in keeps" :key="keep.id" class="keep-preview" :style="{backgroundColor: keep.style.bgc}">
            <button class="no-btn pin-btn" :class="{pinned: keep.isPinned}" @click="pinKeep(keep)"><i class="fas fa-thumbtack"></i></button>
                <component :is="keep.type" :data="keep" :id="keep.id" @save="saveChange"></component>
                <keep-preview-btns :keep="keep" @pin="pinKeep" @keepTo="keepToEdit = keep" @remove="removeKeep" @setColor="setColor" @copy="copyKeep" @label="setLabel"></keep-preview-btns>
            </li>
        </ul>

    </main>
    `,
    data() {
        return {
            keeps: [],
            keepToEdit: null,
        }
    },
    created() {
        this.loadKeeps()
    },
    methods: {
        loadKeeps() {
            keepService.query()
                .then(keeps => this.keeps = keeps)
        },
        removeKeep(id) {
            keepService.remove(id)
                .then(() => {
                    this.keeps = this.keeps.filter(keep => keep.id !== id)
                })
        },
        pinKeep(keep) {
            keep.isPinned = !keep.isPinned
            keepService.save(keep)
                .then(keep => {
                    this.loadKeeps()
                })
        },
        createKeep(keep) {
            if (keep.id) {
                this.keepToEdit = null;
                this.saveChange(keep.info, keep.id);
            } else {
                keepService.save(keep)
                    .then(keep => {
                        this.keeps.push(keep)
                    })
            }
        },
        saveChange(changesKeep, id) {
            var idx = this.keeps.findIndex(keep => keep.id === id)
            this.keeps[idx].info = changesKeep
            keepService.save(this.keeps[idx])
                .then(keep => {
                    this.keeps.splice(idx, 1, keep)
                })
        },
        setColor(color, id) {
            var idx = this.keeps.findIndex(keep => keep.id === id);
            this.keeps[idx].style.bgc = color;
            keepService.save(this.keeps[idx])
                .then(keep => {
                    this.keeps.splice(idx, 1, keep)
                })
        },
        onSearch(keyFilter) {
            keepService.setKeyFilter(keyFilter)
            this.loadKeeps()

        },
        filterByType(type) {
            console.log(type);
            keepService.setTypeFilter(type)
            this.loadKeeps()
        },
        copyKeep(keep) {
            keep.id = '',
                this.createKeep(keep)
        },
        setLabel(newLabel, id) {
            var currKeep = this.keeps.find(keep => keep.id === id)
            console.log(currKeep);
            const labelIdx = currKeep.labels.findIndex(label => label.label === newLabel.label)
            if (labelIdx === -1) currKeep.labels.push(newLabel)
            else currKeep.labels.splice(labelIdx, 1)
            this.saveChange(currKeep, id)
        },
    },
    components: {
        keepCreat,
        noteTxt,
        noteImg,
        noteToDo,
        search,
        keepPreviewBtns
    }

}