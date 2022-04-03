import { utilService } from '../../../services/util-service.js'
export const mailService = {
    getEmails,
    query,
    countUnReadEmails,
    getIndexById,
    getEmailById,
    addNewEmail,
    changeReadMode
    
}
// const gEmails; 
const EMAIL_KEY = 'emails'
const gEmails =getEmails()
const loggedinUser = {
    email: 'giloz@appsus.com',
    fullName: 'gilad oz'
}

function query(filterBy = {status:'inbox', isRead:'unRead', txt:'' }){
    if(filterBy.status === 'sent'){
        const emails = getEmails().filter((email) => {
            return email.status ===filterBy.status
        })
        // gEmails = emails
        return Promise.resolve(emails)
    }
    if(filterBy.isRead ==='All') {
        const emails = getEmails().filter((email) => {
            return (email.status===filterBy.status) && (email.from.toLowerCase().includes(filterBy.txt) ||
             email.subject.toLowerCase().includes(filterBy.txt)) && (email.status===filterBy.status) 
        })
        // gEmails = emails
        return Promise.resolve(emails)
   
    } else if (filterBy.isRead ==='read'){
        const emails= getEmails().filter((email) =>{
         return (email.isRead) && (email.status===filterBy.status) &&
         (email.from.toLowerCase().includes(filterBy.txt) || email.subject.toLowerCase().includes(filterBy.txt))
        
         })
        //  gEmails = emails
         return Promise.resolve(emails)

    } else if(filterBy.isRead ==='unRead') {
        const emails= getEmails().filter((email) =>{
            return (email.isRead === false) && (email.status===filterBy.status) &&
            (email.from.toLowerCase().includes(filterBy.txt) || email.subject.toLowerCase().includes(filterBy.txt))
           
            })
            // gEmails = emails
            return Promise.resolve(emails)

    }
}

function countUnReadEmails(status='inbox'){
    let count = 0
    var emails = getEmails()
    for (let i = 0; i < emails.length; i++) {
        if (emails[i].isRead === false && emails[i].status ===status) {
            count ++
        }
    }
    return count

}
function getIndexById(id){
   var emails = getEmails()
  const index = emails.findIndex(email =>  email.id ===id)
 if (emails[index].status ==="inbox") {
     emails[index].status = "trash"
     utilService.saveToStorage(EMAIL_KEY, emails)
     return 1

 } else {
     emails.splice(index,1)
     utilService.saveToStorage(EMAIL_KEY, emails)
     return 2
    }
}
function getEmailById(mailId){
    var emails = getEmails()
    var email = emails.find((email)=> email.id ===mailId)
    if (!email.isRead)  email.isRead = !email.isRead
    saveToStorage(EMAIL_KEY, emails)
    return emails
}
function addNewEmail(email){
    const {txt, to, subject} =email
   var emails = getEmails()
   emails.push(_createEmail('sent',subject , txt, loggedinUser.fullName,to))
   saveToStorage(EMAIL_KEY, emails)
   return emails


}
function changeReadMode(id){
    var emails = getEmails()
    var email = emails.find((email)=> email.id ===id)
      email.isRead = !email.isRead
      saveToStorage(EMAIL_KEY, emails)
      return emails
    }
        


function getEmails(){
    let emails = loadFromStorage(EMAIL_KEY)
    if(!emails ||!emails.length){
        emails =[]
        emails.push(_createEmail('inbox','champions league game in sunday!', 'liverpol vs manchester united today at 21:00, everyone is coming are you in???','Best friend', 'yaron'))
        emails.push(_createEmail('inbox','you gotta hear this', 'I have to tell you what happend last week at max party!!',  'Mady','gilad'))
        emails.push(_createEmail('inbox','WE’VE SENT IT!', 'Hi Gilad, your parcel is on its way and it should be with you soon!', 'Asos', 'oz'))
        emails.push(_createEmail('inbox','get a ticket!', 'Billie Eilish + Michelangelo - A Different View and more',  ',Mom','gilad'))
        emails.push(_createEmail('inbox','Hey! comming to the party?', 'hey! How yoi doing? didnt saw you for a log time, i am having my birthday party next sundy, i want to see you there!','Gilad', 'oz'))
        emails.push(_createEmail('inbox','roei game', 'hey! i hope you remeber roy game! dont late! ', 'my wife', 'OZ'))
        saveToStorage(EMAIL_KEY, emails)
        console.log('not from storage');
    }
return emails
}


function _createEmail(status ='inbox',subject, body  ,from , to ){
    return{
        id:_makeId(),
        status,
        subject,
        body,
        isRead:false,
        sentAt: getTime(),
        from,
        to,
    }

}
getTime()
function getTime(){
    var time = new Date()
    var hours = time.getHours()
    var min = time.getMinutes()
    hours = (hours <10) ? '0'+ hours : hours
    min = (min < 10) ? '0' +min : min
    return(`${hours}:${min} `);

}



// UTILS!
function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}