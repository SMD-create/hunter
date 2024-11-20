import { Component, JSX, State, h } from "@stencil/core";

interface ChatMessage {
  type: string; // 'text', 'card', 'image', 'photo-search', 'unknown', etc.
  content: any; // Varies based on the type
  isAIReply?: boolean;
}

interface Conversation {
  messageType: string; // e.g., 'photo-search'
  photoSearchImage?: string; // Optional property for photo search images
  messages: ChatMessage[]; // Messages for this conversation
}

@Component({
  tag: "my-component",
  styleUrl: "my-component.css",
  shadow: true,
})
export class MyComponent {
  @State() chatMessages: Conversation[] = [];
  @State() isLoading: boolean = true;
  @State() errorMessage: string | null = null;

  async componentWillLoad() {
    try {
      const response = await fetch(
        "https://timmy-io-smd-create-smd-creates-projects.vercel.app/api/conversation"
      );
      if (response.ok) {
        const data = await response.json();
        this.chatMessages = data.chat || [];
      } else {
        this.errorMessage = "Failed to load chat messages.";
      }
    } catch (error) {
      this.errorMessage = "Error fetching chat messages.";
    } finally {
      this.isLoading = false;
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
      </div>
    );
  }
// Update the `renderChatMessages` function without altering the rest of the code
private renderChatMessages() {
  const messageGroups: JSX.Element[] = [];
  let isGrouping = false;
  let group: JSX.Element[] = [];

  this.chatMessages.forEach((conversation, convIndex) => {
    const { messageType, photoSearchImage, messages } = conversation;

    messages.forEach((msg, msgIndex) => {
      if (msg.type === "card" || (msg.type === "unknown" && msg.content?.cards)) {
        // Handle card-like messages
        if (!isGrouping) {
          isGrouping = true;
          group = [];
        }

        const cards = msg.type === "card" ? [msg.content] : msg.content.cards;
        cards.forEach((card, cardIndex) => {
          group.push(
            <div class="chat-card" key={`card-${convIndex}-${msgIndex}-${cardIndex}`}>
              <h4>{card.title?.text || "Untitled Card"}</h4>
              <img src={card.imageUrl || ""} alt={card.title?.text || "Image"} />
              <a href={card.url || "#"} target="_blank" rel="noopener noreferrer">
                View Product
              </a>
            </div>
          );
        });
      } else if (msg.type === "text" || msg.type === "image" || msg.type === "unknown") {
        // Handle text, image, and unknown messages
        if (isGrouping) {
          messageGroups.push(
            <div class="chat-card-group" key={`group-${messageGroups.length}`}>
              {group}
            </div>
          );
          isGrouping = false;
        }

        if (msg.type === "text") {
          messageGroups.push(
            <div
              class={`chat-message ${msg.isAIReply ? "ai" : "user"}`}
              key={`text-${convIndex}-${msgIndex}`}
            >
              {msg.content}
            </div>
          );
        } else if (msg.type === "image") {
          messageGroups.push(
            <div class="chat-message image" key={`image-${convIndex}-${msgIndex}`}>
              <img src={msg.content} alt="Image message" />
            </div>
          );
        } else if (msg.type === "unknown") {
          messageGroups.push(
            <div class="chat-message unknown" key={`unknown-${convIndex}-${msgIndex}`}>
              <pre>{JSON.stringify(msg.content, null, 2)}</pre>
            </div>
          );
        }
      }
    });

    // Handle photo search images
    if (messageType === "photo-search" && photoSearchImage) {
      messageGroups.push(
        <div class="photo-search-group" key={`photo-search-${convIndex}`}>
          <img
            src={photoSearchImage}
            alt="Photo search result"
            class="photo-search-image"
          />
          <div class="photo-search-text">
            {messages.find((msg) => msg.type === "text")?.content || ""}
          </div>
        </div>
      );
    }

    // Add grouped cards if grouping is still active
    if (isGrouping) {
      messageGroups.push(
        <div class="chat-card-group" key={`group-${messageGroups.length}`}>
          {group}
        </div>
      );
    }
  });

  return messageGroups;
}

}
