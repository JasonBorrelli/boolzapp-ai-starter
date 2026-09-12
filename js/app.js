// DOM REFERENCES

const chatBoxEl = document.querySelector('.chat-box');                      // chat-box 
const chatFormEl = document.querySelector('.chat-form');                    //  chat-form
const chatInputEl = chatFormEl.querySelector('input');                      // chat-input
//console.log(chatBoxEl, chatFormEl, chatInputEl);




// HISTORY
const messages = [

]

/* console.table(messages); */


//SETUP
const endpoint = geminiConfig.endPoint + '?key=' + geminiConfig.apiKey;
console.log(endpoint);


//RENDERING MESSAGGI ////////////////////////////////////
renderMessages();

//AGGIUNGI NUOVO MESSAGGIO //////////////////////////////////
chatFormEl.addEventListener('submit', async function (e) {                  //  event listener submit
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

    // INTEGRAZIONE GEMINI AI///////////////////////////////
    //1 conversione dati nel formato richiesto dalla api
    const formattedMessages = messages.map((message) => {
        return {
            role: message.type === 'sent' ? 'user' : 'model',
            parts: [{ text: message.text }]
        }
    });

    formattedMessages.unshift({
        role: 'user',
        parts: [{ text: geminiConfig.systemPrompt }],

    });


    console.log(messages);
    console.table(formattedMessages);

    //CALL AJAX
    const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ contents: formattedMessages }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    console.log(data);
    const aiMessage = data.candidates[0].content.parts[0].text;
    console.log(aiMessage);

    addNewMessage(aiMessage, 'received');
    renderMessages();
    chatBoxEl.scrollTop = chatBoxEl.scrollHeight;







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





