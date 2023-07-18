const socket = io("http://localhost:8000");

const messageContainer = document.querySelector(".messageContainer");

const messageBox = document.getElementById("messageBox");

const messageInput = document.getElementById("messageInp");
const logout=document.getElementById('logout');
const listItem=document.getElementById('listbox');
const audio=new Audio('../Asset/Message.mp3');

const userName = prompt("please enter your name to join chat");

const appendMsg = (message, position) => {
  const elem = document.createElement("div");
  elem.innerText = message;
  elem.classList.add("message");
  elem.classList.add(position);
  messageContainer.append(elem);
  if(position=="Left"){
    console.log('papaadld')
    audio.play();
  }
};


const insertUser=(name)=>{
const item=document.createElement('li');
item.innerText=name;
item.classList.add('listItem');
listItem.append(item);
}



messageBox.addEventListener('submit',(e)=>{
    e.preventDefault();
   console.log('hello')
   if(messageInput.value==""){
    alert('please enter the message')
}else{
    appendMsg(`You: ${messageInput.value}`,"Right")
    socket.emit('send-message',messageInput.value);
    messageInput.value="";
}
})




if (userName == ""|| userName==null) {
  alert("plese enter your name");
  window.location.reload();
} else {
  socket.emit("new-user-joined", userName);
  socket.on("user-joined", (obj) => {
    appendMsg(`${obj.name}: joined the chat`, "Left");
  });
}

socket.on("receive", (obj) => {
  appendMsg(`${obj.name}: ${obj.message}`, "Left");
});


// logout
logout.addEventListener('click',(e)=>{
    socket.emit('disconnect-chat',userName);
    alert('you have logged out successfully');
    window.location.href="/index.html"
})

socket.on('logout',(obj)=>{
    appendMsg(`${obj.userName}: Left The chat`,"Left");

})











