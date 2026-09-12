// DOM REFERENCES

const chatBoxEl = document.querySelector('.chat-box');                      // chat-box 
const chatFormEl = document.querySelector('.chat-form');                    //  chat-form
const chatInputEl = chatFormEl.querySelector('input');                      // chat-input
//console.log(chatBoxEl, chatFormEl, chatInputEl);




// HISTORY
const messages = [
    {
        text: 'ciao, come stai?',                   // messagio inviato
        time: '12/09/2026 17:00:00',
        type: 'sent',
    },
    {
        text: 'tutto bene e tu?',                   // messagio ricevuto
        time: '12/09/2026 17:10:00',
        type: 'received',
    }
]

console.table(messages);


//SETUP


//RENDERING MESSAGGI ////////////////////////////////////
renderMessages();

//AGGIUNGI NUOVO MESSAGGIO //////////////////////////////////
chatFormEl.addEventListener('submit', function (e) {                  //  event listener submit
    e.preventDefault()                                               //  impedisce refresh pagina

    //LETTURA DATI USER
    const inputChatValue = chatInputEl.value.trim();                 //  leggi input user
    if (inputChatValue === '') return;                               //  se input è vuoto, esci

    //INSERIRE NUOVO MESSAGGIO NELLA CHAT
    //1. nuovo oggetto
    addNewMessage(inputChatValue, 'sent');

    //2. RENDERING MESSAGGIO
    renderMessages();

    //RESET
    chatInputEl.value = '';
    chatInputEl.focus();

    //SCROLL IN FONDO
    chatBoxEl.scrollTop = chatBoxEl.scrollHeight;                   //  scorrimento automatico in fondo
});


//FUNCTION  ///////////////////////////////////////////////////
// renderMessages
function renderMessages() {
    let messageMarkup = '';                                          //  scatola  messageMarkup

    messages.forEach((message) => {                                  //  ciclo  forEach      
        const { text, time, type } = message                         //  destructuring    

        messageMarkup += `                                   
    <div class="chat-row ${type}">                   
        <div class="chat-message">                
            <p>${text}</p>                          
            <time> ${time}</time>                   
        </div>
    </div>                                           
    `
    })
    chatBoxEl.innerHTML = messageMarkup;                            //  output html
}

/* //add new message in the messages array collection
/@params {string} text - testo del nuovo messaggio
/@params {string} type - tipo del nuovo messaggio sent o received
 */
function addNewMessage(text, type) {
    const newMessage = {                                            //  nuovo oggetto
        text,                                                       //  messaggio
        time: new Date().toLocaleString(),                          //  ora
        type,                                                       //  tipo
    };

    messages.push(newMessage);                                       //  aggiungi al array
}





