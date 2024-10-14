// my-component.tsx
import { Component, State, h } from '@stencil/core';

interface ChatMessage {
  type: string; // 'text', 'card', 'image', etc.
  content: any; // Can be string for text or an object for cards
  isAIReply?: boolean; // Optional property to indicate if the message is from AI
}

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @State() chatMessages: ChatMessage[] = [];
  @State() isLoading: boolean = true; // Loading state
  @State() errorMessage: string | null = null; // Error state

  async componentWillLoad() {
    try {
      const response = await fetch('http://localhost:3000/api/conversation'); // Fetch from local backend
      if (response.ok) {
        const data = await response.json();
        this.chatMessages = data.chat || []; // Safeguard in case `chat` is undefined
      } else {
        console.error('Error fetching chat messages');
        this.errorMessage = 'Failed to load chat messages.';
      }
    } catch (error) {
      console.error('Error:', error);
      this.errorMessage = 'Error fetching chat messages.';
    } finally {
      this.isLoading = false; // End loading state
    }
  }

  render() {
    return (
      <div class="chat-container">
        <div class="chat-header">Timmy AI</div>

        <div class="chat-messages">
          {this.isLoading ? (
            <div class="loading">Loading messages...</div>
          ) : this.errorMessage ? (
            <div class="error">{this.errorMessage}</div>
          ) : (
            this.chatMessages.map((msg, index) => {
              if (msg.type === 'text') {
                return (
                  <div class={`chat-message ${msg.isAIReply ? 'ai' : 'user'}`} key={index}>
                    {msg.content}
                  </div>
                );
              } else if (msg.type === 'card') {
                return (
                  <div class="chat-card" key={index}>
                    <h4>{msg.content.title}</h4> {/* Ensure correct structure */}
                    <img src={msg.content.imageUrl} alt={msg.content.title} />
                    <a href={msg.content.productUrl} target="_blank" rel="noopener noreferrer">
                      View Product
                    </a>
                  </div>
                );
              } else if (msg.type === 'image') {
                return (
                  <div class="chat-message" key={index}>
                    <img src={msg.content} alt="Image message" />
                  </div>
                );
              }
              return null; // In case of unrecognized message type
            })
          )}
        </div>

        {/* Optional input area for future chat interactions */}
        {/*<div class="chat-input-container">
          <input type="text" class="chat-input" placeholder="Type your message..." />
          <button class="send-button">Send</button>
        </div>*/}
      </div>
    );
  }
}
