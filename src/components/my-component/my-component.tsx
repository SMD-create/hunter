import { Component, JSX, State, h } from "@stencil/core";

interface ChatMessage {
  type: "text" | "card" | "image" | "bundle" | "photo-search" | "unknown";
  content: any;
  isAIReply?: boolean;
  cards?: Array<BundleCard>;
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
  messageType: string;
  photoSearchImage?: string;
  messages: ChatMessage[];
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

  private renderBundleMessages(cards: BundleCard[]) {
    return (
      <div class="bundle-container">
        <h4>Here's your bundle!</h4>
        {cards.map((card, index) => (
          <div class="bundle-item" key={`bundle-${index}`}>
            <img
              src={card.imageUrl}
              alt={card.title.text || "Untitled Product"}
              class="bundle-item-image"
            />
            <div class="bundle-item-details">
              <h5 class="bundle-item-title">{card.title.text || "Untitled Product"}</h5>
              <p class="bundle-item-purpose">
                {card.purpose || "No description available."}
              </p>
              <div class="bundle-item-price">
                <span class="original-price">
                  {card.variants?.[0]?.originalPrice
                    ? `Rs. ${card.variants[0].originalPrice}`
                    : ""}
                </span>
                <span class="final-price">Rs. {card.variants?.[0]?.price || "N/A"}</span>
              </div>
            </div>
          </div>
        ))}
        <div class="bundle-total">
          <span>Total ({cards.length})</span>
          <span>
            Rs.{" "}
            {cards.reduce(
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
    const groupedMessages: JSX.Element[] = [];
    let currentGroup: JSX.Element[] = [];
    let isGrouping = false;

    this.chatMessages.forEach((conversation, convIndex) => {
      const { messageType, photoSearchImage, messages } = conversation;

      messages.forEach((msg, msgIndex) => {
        if (msg.type === "card" || (msg.type === "unknown" && msg.content?.cards)) {
          // Handle grouping for cards
          if (!isGrouping) {
            isGrouping = true;
            currentGroup = [];
          }
          const cards = msg.type === "card" ? [msg.content] : msg.content.cards;
          cards.forEach((card, cardIndex) => {
            currentGroup.push(
              <div class="chat-card" key={`card-${convIndex}-${msgIndex}-${cardIndex}`}>
                <h4>{card.title || "Untitled Product"}</h4>
                <img src={card.imageUrl || ""} alt={card.title?.text || "Image"} />
                <a href={card.url || "#"} target="_blank" rel="noopener noreferrer">
                  View Product
                </a>
                <p class="price">
                  {card.variants?.[0]?.price ? `Price: Rs. ${card.variants[0].price}` : ""}
                </p>
              </div>
            );
          });
        } else if (msg.type === "bundle") {
          // Render bundle messages
          groupedMessages.push(
            <div class="chat-bundle" key={`bundle-${convIndex}-${msgIndex}`}>
              {this.renderBundleMessages(msg.cards || [])}
            </div>
          );
        } else {
          // Handle other message types
          if (isGrouping) {
            groupedMessages.push(
              <div class="chat-card-group" key={`group-${groupedMessages.length}`}>
                {currentGroup}
              </div>
            );
            isGrouping = false;
          }
          if (msg.type === "text") {
            groupedMessages.push(
              <div
                class={`chat-message ${msg.isAIReply ? "ai" : "user"}`}
                key={`text-${convIndex}-${msgIndex}`}
              >
                {msg.content}
              </div>
            );
          } else if (msg.type === "image") {
            groupedMessages.push(
              <div class="chat-message image" key={`image-${convIndex}-${msgIndex}`}>
                <img src={msg.content} alt="Image message" />
              </div>
            );
          }
        }
      });

      if (messageType === "photo-search" && photoSearchImage) {
        groupedMessages.push(
          <div class="chat-message photo-search" key={`photo-search-${convIndex}`}>
            <img src={photoSearchImage} alt="Photo search result" />
          </div>
        );
      }
    });

    if (isGrouping) {
      groupedMessages.push(
        <div class="chat-card-group" key={`group-${groupedMessages.length}`}>
          {currentGroup}
        </div>
      );
    }

    return groupedMessages;
  }
}
