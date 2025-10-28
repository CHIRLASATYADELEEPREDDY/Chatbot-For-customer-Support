/**
 * Simple Customer Service Chatbot
 * Implements keyword matching and intent recognition
 */

class CustomerServiceChatbot {
    constructor() {
        this.knowledgeBase = knowledgeBase;
        this.unrecognizedCount = 0;
        this.conversationHistory = [];
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
        this.quickActions = document.getElementById('quick-actions');
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

    showWelcomeMessage() {
        this.addBotMessage(this.knowledgeBase.welcomeMessage);
    }

    handleSendMessage() {
        const message = this.chatInput.value.trim();
        if (message === '') return;

        this.addUserMessage(message);
        this.chatInput.value = '';
        this.showTypingIndicator();

        setTimeout(() => {
            this.hideTypingIndicator();
            this.processMessage(message);
        }, 800);
    }

    handleQuickAction(intentId) {
        const intent = this.knowledgeBase.intents.find(i => i.id === intentId);
        if (intent) {
            this.addUserMessage(intent.name);
            this.showTypingIndicator();
            setTimeout(() => {
                this.hideTypingIndicator();
                this.addBotMessage(intent.response);
                this.unrecognizedCount = 0;
            }, 600);
        }
    }

    processMessage(message) {
        const normalizedMessage = message.toLowerCase();
        const matchedIntent = this.matchIntent(normalizedMessage);

        if (matchedIntent) {
            this.addBotMessage(matchedIntent.response);
            this.unrecognizedCount = 0;
        } else {
            this.unrecognizedCount++;
            if (this.unrecognizedCount >= this.knowledgeBase.maxUnrecognizedAttempts) {
                this.addBotMessage(this.knowledgeBase.fallbackMessage);
                this.unrecognizedCount = 0;
            } else {
                this.addBotMessage("I'm not sure I understand. Could you rephrase that or try one of the quick action buttons below?");
            }
        }

        this.conversationHistory.push({
            timestamp: new Date(),
            user: message,
            matched: matchedIntent ? matchedIntent.id : null
        });
    }

    matchIntent(message) {
        let bestMatch = null;
        let highestScore = 0;

        for (const intent of this.knowledgeBase.intents) {
            let score = 0;
            for (const keyword of intent.keywords) {
                if (message.includes(keyword.toLowerCase())) {
                    score += keyword.length;
                }
            }
            if (score > highestScore) {
                highestScore = score;
                bestMatch = intent;
            }
        }
        return highestScore > 0 ? bestMatch : null;
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

    getAnalytics() {
        const totalMessages = this.conversationHistory.length;
        const resolvedMessages = this.conversationHistory.filter(m => m.matched !== null).length;
        const resolutionRate = totalMessages > 0 ? (resolvedMessages / totalMessages * 100).toFixed(2) : 0;

        return {
            totalMessages,
            resolvedMessages,
            resolutionRate: `${resolutionRate}%`,
            conversationHistory: this.conversationHistory
        };
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new CustomerServiceChatbot();
    console.log('Customer Service Chatbot initialized successfully!');
});
