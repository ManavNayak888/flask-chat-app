console.log('Socket connection established')

var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

function setUsername() {
    username = document.getElementById('username').value;
    
    if (username.trim() !== "") {
        localStorage.setItem('username', username);
        
        document.getElementById('username-section').style.display = 'none';
        document.getElementById('chat-section').style.display = 'block';
    } else {
        alert("Please enter a valid username.");
    }
}

function send(){
	var msgbox = document.getElementById('msgbox')
	socket.emit('msg', {user: username, text: msgbox.value})
	msgbox.value= ""
}

socket.on('push', function(data){
    const msglist = document.getElementById('msglist')
    const msgDiv = document.createElement('div')

    if (data.user === username) {
        msgDiv.className = 'message self'
    } else {
        msgDiv.className = 'message other'
    }

    msgDiv.innerHTML = `<strong>${data.user}:</strong> ${data.text}`
    msglist.appendChild(msgDiv)
    msglist.scrollTop = msglist.scrollHeight
})
document.getElementById('msgbox').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        send()
    }
})
