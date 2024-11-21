import { Component, JSX, State, h } from "@stencil/core";

interface ChatMessage {
  type: "text" | "card" | "image" | "bundle" | "photo-search" | "unknown";
  content: any; // Varies based on type
  isAIReply?: boolean;
  cards?: Array<BundleCard>; // Optional cards property for 'bundle' messages
}

interface BundleCard {
  title: {
    type: "text";
    text: string;
  };
  purpose: string;
  imageUrl: string;
  variants: Array<{
    title: string;
    price: string;
    originalPrice?: string;
    id: number;
  }>;
}

interface Conversation {
  messageType: string; // e.g., 'photo-search'
  photoSearchImage?: string; // Optional for photo search images
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

  private renderBundleMessages(cards: BundleCard[]) {
    return (
      <div class="bundle-container">
        <h4>Your Bundle</h4>
        {cards.map((card, index) => (
          <div class="bundle-item" key={`bundle-card-${index}`}>
            <div class="bundle-content">
              <img
                src={card.imageUrl}
                alt={card.title.text}
                class="bundle-item-image"
              />
              <div class="bundle-item-details">
                <h5 class="bundle-item-title">{card.title.text}</h5>
                <p class="bundle-item-purpose">
                  {card.purpose || "No description available."}
                </p>
                <span class="bundle-item-price">
                  Rs. {card.variants?.[0]?.price || "N/A"}
                </span>
              </div>
            </div>
            {index < cards.length - 1 && <hr class="bundle-separator" />}
          </div>
        ))}
        <div class="bundle-total">
          <strong>Total:</strong>{" "}
          Rs.{" "}
          {cards.reduce(
            (total, card) =>
              total + parseFloat(card.variants?.[0]?.price || "0"),
            0
          )}
        </div>
      </div>
    );
  }

  private renderCardMessages(cards: any[]) {
    return cards.map((card, index) => (
      <div class="chat-card" key={`card-${index}`}>
        <h4>{card.title?.text || "Untitled Card"}</h4>
        <img
          src={card.imageUrl || ""}
          alt={card.title?.text || "Image"}
          class="card-image"
        />
        {card.url && (
          <a
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            class="card-link"
          >
            View Product
          </a>
        )}
      </div>
    ));
  }

  private renderTextMessage(msg: ChatMessage, key: string) {
    return (
      <div
        class={`chat-message ${msg.isAIReply ? "ai" : "user"}`}
        key={key}
      >
        {msg.content}
      </div>
    );
  }

  private renderImageMessage(msg: ChatMessage, key: string) {
    return (
      <div
        class={`chat-message image ${msg.isAIReply ? "ai" : "user"}`}
        key={key}
      >
        <img src={msg.content} alt="Image message" />
      </div>
    );
  }

  private renderUnknownMessage(msg: ChatMessage, key: string) {
    if (msg.content?.type === "bundle") {
      return (
        <div class="chat-bundle" key={key}>
          {this.renderBundleMessages(msg.content.cards || [])}
        </div>
      );
    }
    return (
      <div class="chat-message unknown" key={key}>
        <pre>{JSON.stringify(msg.content, null, 2)}</pre>
      </div>
    );
  }

  private renderChatMessages() {
    return this.chatMessages.map((conversation, convIndex) => (
      <div class="conversation" key={`conv-${convIndex}`}>
        {conversation.messages.map((msg, msgIndex) => {
          const key = `msg-${convIndex}-${msgIndex}`;
          switch (msg.type) {
            case "text":
              return this.renderTextMessage(msg, key);
            case "image":
              return this.renderImageMessage(msg, key);
            case "card":
              return (
                <div class="chat-card-group">{this.renderCardMessages([msg.content])}</div>
              );
            case "bundle":
              return (
                <div class="chat-bundle" key={key}>
                  {this.renderBundleMessages(msg.cards || [])}
                </div>
              );
            case "unknown":
              return this.renderUnknownMessage(msg, key);
            default:
              return (
                <div class="chat-message unhandled" key={key}>
                  Unhandled message type: {msg.type}
                </div>
              );
          }
        })}
      </div>
    ));
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
}
