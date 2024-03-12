const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const apiKey = 'sk-CBxiBgXL9mMEoCTbbdVUT3BlbkFJcrbESVEQvNz8qQkxfmeDKEY';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const userMessage = userInput.value;
  if (userMessage.trim() !== '') {
    appendMessage('You', userMessage);
    userInput.value = '';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: userMessage }
        ]
      })
    })
    .then(response => response.json())
    .then(data => {
      const chatGPTResponse = data.choices[0].text;
      appendMessage('ChatGPT', chatGPTResponse);
    })
    .catch(error => console.error('Error:', error));
  }
}

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}