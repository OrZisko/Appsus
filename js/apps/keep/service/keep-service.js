import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util-service.js'

const KEEP_KEY = 'userKeepsDB'
var gKeyFilter = '';
var gTypeFilter = '';
const keepsForNothig = [{
    id: utilService.makeId(),
    type: 'noteTxt',
    isPinned: false,
    info: {
        titel: 'You’d Sing Too | Leonard Cohen',
        txt: 'You’d sing too \n if you found yourself \n in a place like this \n You wouldn’t worry about \n whether you were as good \n as Ray Charles or Edith Piaf \n You’d sing \n You’d sing \n not for yourself \n but to make a self \n out of the old food \n rotting in the astral bowel \n and the loveless thud \n of your own breathing \n You’d become a singer \n faster than it takes \n to hate a rival’s charm \n and you’d sing, darling \n you’d sing too'
    },
    style: { bgc: 'turquoise' },
    stringUm: 'You’d Sing Too | Leonard Cohen You’d sing too \n if you found yourself \n in a place like this \n You wouldn’t worry about \n whether you were as good \n as Ray Charles or Edith Piaf \n You’d sing \n You’d sing \n not for yourself \n but to make a self \n out of the old food \n rotting in the astral bowel \n and the loveless thud \n of your own breathing \n You’d become a singer \n faster than it takes \n to hate a rival’s charm \n and you’d sing, darling \n you’d sing too',
    labels: [],
},
{
    id: utilService.makeId(),
    type: 'noteImg',
    isPinned: false,
    info: { titel: 'Hey Boy', url: './imgs/good boy.jpg' },
    style: { bgc: 'purple' },
    stringSum: 'Hey Boy',
    labels: [],
},
{
    id: utilService.makeId(),
    type: 'noteToDo',
    info: {
        titel: 'Daily routine ',
        todos: [
            { txt: 'Coffee - a must', doneAt: 18711111 },
            { txt: 'Take the dog out', doneAt: null },
            { txt: 'Work', doneAt: null },
            { txt: 'Beer with Ron', doneAt: null },
            { txt: '- Game of Thrones - mfu', doneAt: null },
        ]
    },
    style: { bgc: 'olive' },
    stringSum: 'Daily routine Coffee - a must Take the dog out Work Beer with Ron - Game of Thrones - mfu',
    labels: []
}
]

_creatKeeps()

export const keepService = {
    query,
    remove,
    save,
    setKeyFilter,
    setTypeFilter
}


function query() {
    return storageService.query(KEEP_KEY)
        .then(keeps => {
            if (gKeyFilter) keeps = _filterKeeps(keeps, gKeyFilter)
            if (gTypeFilter) keeps = keeps.filter(keep => keep.type === gTypeFilter)
            const pinned = keeps.filter(keep => keep.isPinned)
            const unPinned = keeps.filter(keep => !keep.isPinned)
            keeps = [...pinned, ...unPinned]
            return keeps;
        })
}

function remove(keepId) {
    return storageService.remove(KEEP_KEY, keepId)
}

function save(keep) {
    if (keep.id) return storageService.put(KEEP_KEY, keep)
    else return storageService.post(KEEP_KEY, keep)
}

function setKeyFilter(val) {
    gKeyFilter = val;
}

function setTypeFilter(type) {
    gTypeFilter = type;
}

function _filterKeeps(keeps, val) {
    var regex = new RegExp(val, 'gi')
    var filterdKeeps = keeps.filter(keep => {
        return regex.test(keep.stringSum)
    })
    return filterdKeeps
}

function _creatKeeps() {
    var keeps = utilService.loadFromStorage(KEEP_KEY);
    if (!keeps) {
        keeps = keepsForNothig;
        utilService.saveToStorage(KEEP_KEY, keeps)
    }
}

function _creatKeep(txt) {
    const keep = {
        id: utilService.makeId(),
        type: 'noteTxt',
        isPinned: false,
        info: {
            txt,
        },
        style: {
            bgc: 'white'
        }
    }
    return keep
}



