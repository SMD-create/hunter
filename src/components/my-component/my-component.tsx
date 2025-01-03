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
      // Parse the query parameters from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const conversationId = urlParams.get("conversationId");
      const storeId = urlParams.get("storeId");

      // Validate the parameters
      if (!conversationId || !storeId) {
        this.errorMessage =
          "Missing required parameters: conversationId or storeId.";
        this.isLoading = false;
        return;
      }

      // Fetch data from the API
      const response = await fetch(
        `https://timmy-io-smd-create-smd-creates-projects.vercel.app/api/conversation?conversationId=${encodeURIComponent(
          conversationId
        )}&storeId=${encodeURIComponent(storeId)}`
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
        <div class="chat-header">AskTimmy.ai</div>
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
        <h4 class="bundle-header">Here's your bundle!</h4>
        {cards.map((card, index) => (
          <div class="bundle-item" key={`bundle-${index}`}>
            <div class="bundle-item-row">
              <img
                src={card.imageUrl}
                alt={card.title.text || "Untitled Product"}
                class="bundle-item-image"
              />
              <div class="bundle-item-details">
                <h5 class="bundle-item-title">{card.title.text}</h5>
                <p class="bundle-item-purpose">{card.purpose}</p>
                <div class="bundle-item-price">
                  {card.variants[0]?.originalPrice && (
                    <span class="original-price">
                      ₹ {parseFloat(card.variants[0].originalPrice).toFixed(2)}
                    </span>
                  )}
                  <span class="final-price">
                    ₹ {parseFloat(card.variants[0].price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            {index < cards.length - 1 && <div class="divider"></div>}
          </div>
        ))}
        <div class="bundle-total">
          <span>Total ({cards.length})</span>
          <span>
            ₹
            {cards
              .reduce(
                (total, item) =>
                  total + parseFloat(item.variants[0]?.price || "0"),
                0
              )
              .toFixed(2)}
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
        if (msg.type === "unknown") {
          if (
            msg.content &&
            msg.content.type === "bundle" &&
            msg.content.cards
          ) {
            groupedMessages.push(
              <div
                class="chat-message unknown"
                key={`unknown-${convIndex}-${msgIndex}`}
              >
                <div class="message-content">
                  {this.renderBundleMessages(msg.content.cards)}
                </div>
              </div>
            );
          }
        } else if (msg.type === "card") {
          if (!isGrouping) {
            isGrouping = true;
            currentGroup = [];
          }
          const cards = msg.type === "card" ? [msg.content] : msg.content.cards;

          cards.forEach((card, cardIndex) => {
            const productUrl =
              card.content?.productUrl || card.productUrl || card.url || "#";

            console.log("Product URL:", productUrl);
            console.log("Card:", card);

            currentGroup.push(
              <div
                class="chat-card"
                key={`card-${convIndex}-${msgIndex}-${cardIndex}`}
              >
                <img
                  src={card.imageUrl || ""}
                  alt={card.title?.text || "Image"}
                />
                <div class="chat-content">
                  <h4>
                    {card.title?.text || card.title || "Untitled Product"}
                  </h4>
                  <h4 class="product-price">
                    Price: $ {parseFloat(card.price || "0").toFixed(2)}
                  </h4>

                  <a
                    href={productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="view-product-link"
                  >
                    View Product
                  </a>
                </div>
              </div>
            );
          });
        } else if (msg.content?.type === "bundle") {
          groupedMessages.push(
            <div class="chat-bundle" key={`bundle-${convIndex}-${msgIndex}`}>
              {this.renderBundleMessages(msg.cards || [])}
            </div>
          );
        } else if (messageType === "photo-search" && msg.type === "text") {
        } else {
          if (isGrouping) {
            groupedMessages.push(
              <div
                class="chat-card-group"
                key={`group-${groupedMessages.length}`}
              >
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
              <div
                class="chat-message image"
                key={`image-${convIndex}-${msgIndex}`}
              >
                <img src={msg.content} alt="Image message" />
              </div>
            );
          }
        }
      });

      if (messageType === "photo-search" && photoSearchImage) {
        groupedMessages.push(
          <div
            class="chat-message photo-search"
            key={`photo-search-${convIndex}`}
          >
            <img src={photoSearchImage} alt="Photo search result" />
          </div>
        );

        const textMessage = messages.find((msg) => msg.type === "text");
        if (textMessage) {
          groupedMessages.push(
            <div
              class={`chat-message ${textMessage.isAIReply ? "ai" : "user"}`}
              key={`photo-search-text-${convIndex}`}
            >
              {textMessage.content}
            </div>
          );
        }
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
