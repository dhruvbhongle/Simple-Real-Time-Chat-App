03.11 6:03 PM
// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM elements
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Get unique chat room link
const roomId = location.pathname.split("/").pop() || 'default';

// Function to load messages
const loadMessages = () => {
    db.collection('chatrooms').doc(roomId).collection('messages')
        .orderBy('timestamp')
        .onSnapshot(snapshot => {
            chatBox.innerHTML = '';
            snapshot.forEach(doc => {
                const message = doc.data();
                const messageElement = document.createElement('div');
                messageElement.className = 'message';
                messageElement.textContent = `${message.user}: ${message.text}`;
                chatBox.appendChild(messageElement);
            });
        });
};

// Send message
sendButton.addEventListener('click', () => {
    const messageText = messageInput.value;
    if (messageText) {
        db.collection('chatrooms').doc(roomId).collection('messages').add({
            user: 'User', // You can replace with actual user name
            text: messageText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        messageInput.value = '';
    }
});

// Load messages on page load
loadMessages();
