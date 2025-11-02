class CustomerServiceChatbot {
    constructor() {
        this.isOpen = false;
        this.initializeElements();
        this.attachEventListeners();
        this.showWelcomeMessage();
    }

    initializeElements() {
        this.chatWidget = document.getElementById('chat-widget');
        this.chatToggle = document.getElementById('chat-toggle');
        this.chatClose = document.getElementById('chat-close');
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.chatSend = document.getElementById('chat-send');
    }

    attachEventListeners() {
        this.chatToggle.addEventListener('click', () => this.openChat());
        this.chatClose.addEventListener('click', () => this.closeChat());
        this.chatSend.addEventListener('click', () => this.handleSendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSendMessage();
        });

        const quickActionButtons = document.querySelectorAll('.quick-action-btn');
        quickActionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const intent = e.target.dataset.intent;
                this.handleQuickAction(intent);
            });
        });
    }

    openChat() {
        this.isOpen = true;
        this.chatWidget.classList.add('open');
        this.chatToggle.classList.add('hidden');
        this.chatInput.focus();
    }

    closeChat() {
        this.isOpen = false;
        this.chatWidget.classList.remove('open');
        this.chatToggle.classList.remove('hidden');
    }

    async showWelcomeMessage() {
        try {
            const response = await fetch('/api/welcome');
            const data = await response.json();
            this.addBotMessage(data.message);
        } catch (error) {
            console.error('Error fetching welcome message:', error);
        }
    }

    async handleSendMessage() {
        const message = this.chatInput.value.trim();
        if (message === '') return;

        this.addUserMessage(message);
        this.chatInput.value = '';
        this.showTypingIndicator();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();
            
            setTimeout(() => {
                this.hideTypingIndicator();
                this.addBotMessage(data.response);
            }, 800);
        } catch (error) {
            this.hideTypingIndicator();
            this.addBotMessage('Sorry, there was an error processing your request. Please try again.');
            console.error('Error:', error);
        }
    }

    async handleQuickAction(intentId) {
        try {
            const response = await fetch(`/api/quick-action/${intentId}`);
            const data = await response.json();
            
            this.addUserMessage(data.intent_name);
            this.showTypingIndicator();
            
            setTimeout(() => {
                this.hideTypingIndicator();
                this.addBotMessage(data.response);
            }, 600);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    addUserMessage(message) {
        const messageElement = this.createMessageElement(message, 'user');
        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
    }

    addBotMessage(message) {
        const messageElement = this.createMessageElement(message, 'bot');
        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
    }

    createMessageElement(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = type === 'bot' ? '🤖' : '👤';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = this.formatMessage(message);

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        return messageDiv;
    }

    formatMessage(message) {
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.id = 'typing-indicator';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';

        const typingContent = document.createElement('div');
        typingContent.className = 'message-content';
        typingContent.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';

        typingDiv.appendChild(avatar);
        typingDiv.appendChild(typingContent);
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new CustomerServiceChatbot();
    console.log('Customer Service Chatbot initialized successfully!');
});
