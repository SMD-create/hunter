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

  private renderBundleMessages(messages: BundleCard[]) {
    return (
      <div class="bundle-container">
        <h4>Here's your bundle!</h4>
        {messages.map((message, index) => (
          <div class="bundle-item" key={`bundle-${index}`}>
            <div class="bundle-item-content">
              {/* Product Image */}
              <img
                src={message.imageUrl}
                alt={message.title.text}
                class="bundle-item-image"
              />
              {/* Product Details */}
              <div class="bundle-item-details">
                <h5 class="bundle-item-title">{message.title.text}</h5>
                <p class="bundle-item-purpose">
                  {message.purpose || "No description available."}
                </p>
              </div>
              {/* Price Section */}
              <div class="bundle-item-price-section">
                {message.variants?.[0]?.originalPrice && (
                  <span class="original-price">
                    Rs. {message.variants[0].originalPrice}
                  </span>
                )}
                <span class="final-price">
                  Rs. {message.variants?.[0]?.price || "N/A"}
                </span>
              </div>
            </div>
            {/* Checkbox */}
            <div class="bundle-item-checkbox">
              <input type="checkbox" defaultChecked />
            </div>
            {/* Separator */}
            {index < messages.length - 1 && <div class="bundle-separator">+</div>}
          </div>
        ))}
        {/* Total Price Section */}
        <div class="bundle-total">
          <span>Total ({messages.length})</span>
          <span>
            Rs.{" "}
            {messages.reduce(
              (total, item) =>
                total + parseFloat(item.variants?.[0]?.price || "0"),
              0
            )}
          </span>
        </div>
      </div>
    );
  }

  private renderChatMessages() {
    const messageGroups: JSX.Element[] = [];
    let isGrouping = false;
    let group: JSX.Element[] = [];

    this.chatMessages.forEach((conversation, convIndex) => {
      const { messageType, photoSearchImage, messages } = conversation;

      messages.forEach((msg, msgIndex) => {
        if (msg.type === "card" || (msg.type === "unknown" && msg.content?.cards)) {
          if (!isGrouping) {
            isGrouping = true;
            group = [];
          }

          const cards = msg.type === "card" ? [msg.content] : msg.content.cards;
          cards.forEach((card, cardIndex) => {
            group.push(
              <div
                class="chat-card"
                key={`card-${convIndex}-${msgIndex}-${cardIndex}`}
              >
                <h4>{card.title?.text || "Untitled Card"}</h4>
                <img
                  src={card.imageUrl || ""}
                  alt={card.title?.text || "Image"}
                />
                <a
                  href={card.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Product
                </a>
              </div>
            );
          });
        } else if (msg.type === "bundle") {
          messageGroups.push(
            <div class="chat-bundle" key={`bundle-${convIndex}-${msgIndex}`}>
              {this.renderBundleMessages(msg.cards || [])}
            </div>
          );
        } else if (
          msg.type === "text" ||
          msg.type === "image" ||
          msg.type === "unknown"
        ) {
          if (isGrouping) {
            messageGroups.push(
              <div
                class="chat-card-group"
                key={`group-${messageGroups.length}`}
              >
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
              <div
                class="chat-message image"
                key={`image-${convIndex}-${msgIndex}`}
              >
                <img src={msg.content} alt="Image message" />
              </div>
            );
          } else if (msg.type === "unknown") {
            messageGroups.push(
              <div
                class="chat-message unknown"
                key={`unknown-${convIndex}-${msgIndex}`}
              >
                <pre>{JSON.stringify(msg.content, null, 2)}</pre>
              </div>
            );
          }
        }
      });

      if (messageType === "photo-search" && photoSearchImage) {
        messageGroups.push(
          <div
            class="chat-message photo-search"
            key={`photo-search-${convIndex}`}
          >
            <img src={photoSearchImage} alt="Photo search result" />
          </div>
        );
      }

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
