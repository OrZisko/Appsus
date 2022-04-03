export const canvasSerice = {
    getEvPos,
    getUrl
}

const gTouchEvents = ['touchstart', 'touchmove', 'touchend']
var gLineWidth = 2;


function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvents.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function getUrl(el) {
    const imgDataUrl = el
    return imgDataUrl
    // const formData = new FormData();
    // formData.append('img', imgDataUrl)

    // return fetch('//ca-upload.com/here/upload.php', {
    //     method: 'POST',
    //     body: formData
    // })
    //     .then(res => res.text())
    //     .then((url) => {
    //         return url
    //     })
}

function doUploadImg(imgDataUrl, onSuccess) {



}
