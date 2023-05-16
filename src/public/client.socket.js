const socket = io();



const messageForm = document.getElementById("messageForm");
const userEmail = document.getElementById("emailInput");
const userAdmin = document.getElementById("adminInput")
const username = document.getElementById("usernameInput");
const messageInput = document.getElementById("messageInput");
const messagesPool = document.getElementById("messagesPool");


const sendMessage = (messageInfo) => {
    socket.emit("client:message", messageInfo);
};
const renderMessage = (messageData)=>{
    console.log(messageData)
    const html = messageData.map((messageInfo) => {
        if( messageInfo.admin === true){
            return `<div> <b style="font-size:15px; color:red">[${messageInfo.date}]----  </b><strong style="font-size:15px; color:red">admin: </strong> <em>${messageInfo.message}<em/> </div>`;
        }else{
            return `<div> <b style="font-size:15px">[${messageInfo.date}]----  </b><strong style="font-size:15px">${messageInfo.email}: </strong> <em>${messageInfo.message}<em/> </div>`;
        }
    })

    messagesPool.innerHTML = html.join(" ");
}

const submitHandler = (e) => {
    e.preventDefault()
    const messageInfo = {
      email: userEmail.value,
      username: username.value,
      message: messageInput.value,
      admin: userAdmin.value
    };
    sendMessage(messageInfo);
  
    messageInput.value = "";
};

messageForm.addEventListener('submit', submitHandler)

socket.on("server:message", renderMessage);