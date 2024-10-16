import { Component, JSX, State, h } from "@stencil/core";
import Swiper from 'swiper';

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
/>

interface ChatMessage {
  type: string; // 'text', 'card', 'image', etc.
  content: any; // Can be string for text or an object for cards
  isAIReply?: boolean; // Optional property to indicate if the message is from AI
}

@Component({
  tag: "my-component",
  styleUrl: "my-component.css",
  shadow: true,
})
export class MyComponent {
  @State() chatMessages: ChatMessage[] = [];
  @State() isLoading: boolean = true; // Loading state
  @State() errorMessage: string | null = null; // Error state

  async componentWillLoad() {
    try {
      const response = await fetch(
        "https://timmy-io-smd-create-smd-creates-projects.vercel.app/api/conversation"
      );

      if (response.ok) {
        const data = await response.json();
        this.chatMessages = data.chat || []; // Safeguard in case `chat` is undefined
      } else {
        console.error("Error fetching chat messages");
        this.errorMessage = "Failed to load chat messages.";
      }
    } catch (error) {
      console.error("Error:", error);
      this.errorMessage = "Error fetching chat messages.";
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
            this.renderChatMessages()
          )}
        </div>
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
      </div>
    );
  }

  private renderChatMessages() {
    const messageGroups: JSX.Element[] = [];
    let isGrouping = false;
    let group: JSX.Element[] = [];

    this.chatMessages.forEach((msg, index) => {
      if (msg.type === "card") {
        if (!isGrouping) {
          // Start grouping if the first card is encountered
          isGrouping = true;
          group = [];
        }
        group.push(
          <div class="chat-card" key={`card-${index}`}>
            <h4>{msg.content.title.text}</h4>
            <img
              src={msg.content.imageUrl}
              alt={msg.content.title.text}
            />
            <a
              href={msg.content.productUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Product
            </a>
          </div>
        );
      } else if (msg.type === "text" || msg.type === "image") {
        if (isGrouping) {
          // Stop grouping if a text or image message is encountered
          messageGroups.push(
            <div class="chat-card-group" key={`group-${messageGroups.length}`}>
              {group}
            </div>
          );
          isGrouping = false; // Reset grouping status
        }

        if (msg.type === "text") {
          messageGroups.push(
            <div
              class={`chat-message ${msg.isAIReply ? "ai" : "user"}`}
              key={`text-${index}`}
            >
              {msg.content}
            </div>
          );
        } else if (msg.type === "image") {
          messageGroups.push(
            <div class="chat-message" key={`image-${index}`}>
              <img src={msg.content} alt="Image message" />
            </div>
          );
        }
      }
    });

    // Add any remaining grouped cards if the loop ended while still grouping
    if (isGrouping) {
      messageGroups.push(
        <div class="chat-card-group swiper" key={`group-${messageGroups.length}`}>
          {group}
        </div>
      );
    }

    return messageGroups;
  }
}
