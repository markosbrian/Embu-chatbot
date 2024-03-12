const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
  const userMessage = userInput.value;
  if (userMessage.trim() !== '') {
    appendMessage('You', userMessage);
    userInput.value = '';
    // Use fetch or any other method to send the user message to your server
    // and receive the response from ChatGPT
    fetch('/your-chatgpt-api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
      const chatGPTResponse = data.response;
      appendMessage('ChatGPT', chatGPTResponse);
    })
    .catch(error => console.error('Error:', error));
  }
});

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}