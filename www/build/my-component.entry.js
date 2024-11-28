import { r as registerInstance, h } from './index-29c61e3f.js';

const myComponentCss = "html.hydrated{overflow:hidden}body{overflow:hidden;margin:0;height:100vh;width:100vw;}:host{display:flex;justify-content:center;align-items:center;font-family:'Helvetica Neue', Arial, sans-serif;width:100vw;height:100vh;margin:0;background-color:#f0f2f5}.chat-container{display:flex;flex-direction:column;width:90%;max-width:900px;height:90%;max-height:620px;background-color:#ffffff;border-radius:15px;overflow:hidden;box-shadow:0 6px 20px rgba(0, 0, 0, 0.15)}.chat-header{background:linear-gradient(45deg, #007bff, #0056b3);color:white;text-align:center;padding:15px;font-size:1.5em;font-weight:bold}.chat-messages{flex:1;padding:20px;overflow-y:auto;background-color:#f9f9f9;display:flex;flex-direction:column;gap:10px}.chat-message{padding:15px;border-radius:12px;max-width:60%;position:relative;font-size:1em;line-height:1.4;box-shadow:0 3px 10px rgba(0, 0, 0, 0.1)}.chat-message.ai{background-color:#e1f5fe;align-self:flex-start;border:1px solid #b3e5fc}.chat-message.user{background-color:#d1e7dd;align-self:flex-end;border:1px solid #a3d5c3}.chat-card-group{display:flex;flex-direction:row;overflow-x:auto;overflow-y:hidden;gap:15px;padding:10px;background-color:#ffffff;border:1px solid #ddd;min-height:350px;max-height:350px;box-sizing:border-box}.chat-card-group::-webkit-scrollbar{height:8px}.chat-card-group::-webkit-scrollbar-thumb{background-color:#007bff;border-radius:4px}.chat-card{width:345px;height:350px;min-width:250px;min-height:300px;border-radius:8px;background-color:#ffffff;border:1px solid #e0e0e0;box-shadow:0 3px 10px rgba(0, 0, 0, 0.05);display:flex;flex-direction:column;align-items:center;transition:transform 0.3s, box-shadow 0.3s}.chat-card:hover{transform:translateY(-5px);box-shadow:0 6px 20px rgba(0, 0, 0, 0.15)}.chat-card img{max-width:100%;height:200px;width:200px;border-radius:6px;margin:5px 0;object-fit:contain}.chat-content{display:flex;width:100%;flex-direction:column;justify-content:center;padding:10px;flex-grow:1;text-align:center;background-color:#f9f9f9}.chat-content h4{font-size:16px;margin:10px 0 5px;color:#333}.chat-content a{text-decoration:none;color:#007bff;font-size:14px;transition:color 0.3s, background-color 0.3s;padding:10px 10px;border-radius:4px}.chat-content a:hover{color:#fff;background-color:#007bff;}.chat-message.photo-search{display:flex;justify-content:center;align-items:center;padding:10px;align-self:flex-end;}.chat-message.photo-search img{width:80px;height:80px;border-radius:8px;object-fit:cover;}.chat-bundle{background-color:#f9f9f9;padding:10px;border-radius:8px}.bundle-header{font-weight:bold;font-size:18px}.bundle-item{display:flex;margin:10px 0;padding:10px;border:1px solid #ddd;border-radius:5px}.bundle-image img{width:50px;height:50px;margin-right:10px}.bundle-info{flex:1}.bundle-info h4{font-size:16px}.bundle-total{font-weight:bold;margin-top:10px;text-align:right}.bundle-items{display:flex;flex-direction:column}.chat-message.unknown{background:#f8f8f8;border:1px solid #ccc;padding:10px;margin:5px 0;font-size:14px;border-radius:5px;box-shadow:0 1px 3px rgba(0, 0, 0, 0.1);}.chat-message.image img{max-width:100%;border-radius:5px}.chat-card-group{display:flex;gap:10px;margin:10px 0}.bundle-header{font-size:18px;font-weight:bold;margin-bottom:12px}.bundle-item{display:flex;flex-direction:column}.bundle-item-row{display:flex;align-items:flex-start;gap:16px;position:relative}.bundle-item-image{width:60px;height:60px;object-fit:contain;border:1px solid #e0e0e0;border-radius:4px}.bundle-item-details{flex:1}.bundle-item-title{font-size:16px;font-weight:bold;margin:0 0 8px}.bundle-item-purpose{font-size:14px;color:#666;margin:0 0 8px}.bundle-item-price{font-size:14px;font-weight:bold;display:flex;gap:8px}.original-price{text-decoration:line-through;color:#999}.final-price{color:#28a745}.bundle-item-checkbox{position:absolute;top:0;right:0;width:16px;height:16px;margin:0;cursor:not-allowed}.bundle-total{display:flex;justify-content:space-between;font-weight:bold;font-size:16px;margin-top:16px;border-top:1px solid #e0e0e0;padding-top:8px}";

const MyComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.chatMessages = [];
        this.isLoading = true;
        this.errorMessage = null;
    }
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
            const response = await fetch(`https://timmy-io-smd-create-smd-creates-projects.vercel.app/api/conversation?conversationId=${encodeURIComponent(conversationId)}&storeId=${encodeURIComponent(storeId)}`);
            if (response.ok) {
                const data = await response.json();
                this.chatMessages = data.chat || [];
            }
            else {
                this.errorMessage = "Failed to load chat messages.";
            }
        }
        catch (error) {
            this.errorMessage = "Error fetching chat messages.";
        }
        finally {
            this.isLoading = false;
        }
    }
    render() {
        return (h("div", { key: 'dc147b08fa2c905d682883d459d9e6fe505fa575', class: "chat-container" }, h("div", { key: '3ee331b24c68fa2bf0f6e6616e87784fac486c15', class: "chat-header" }, "Timmy AI"), h("div", { key: 'b85856cbf3841755e98d1ce01a5dcd09f64787ef', class: "chat-messages" }, this.isLoading ? (h("div", { class: "loading" }, "Loading messages...")) : this.errorMessage ? (h("div", { class: "error" }, this.errorMessage)) : (this.renderChatMessages()))));
    }
    renderBundleMessages(cards) {
        return (h("div", { class: "bundle-container" }, h("h4", { class: "bundle-header" }, "Here's your bundle!"), cards.map((card, index) => {
            var _a;
            return (h("div", { class: "bundle-item", key: `bundle-${index}` }, h("div", { class: "bundle-item-row" }, h("img", { src: card.imageUrl, alt: card.title.text || "Untitled Product", class: "bundle-item-image" }), h("div", { class: "bundle-item-details" }, h("h5", { class: "bundle-item-title" }, card.title.text), h("p", { class: "bundle-item-purpose" }, card.purpose), h("div", { class: "bundle-item-price" }, ((_a = card.variants[0]) === null || _a === void 0 ? void 0 : _a.originalPrice) && (h("span", { class: "original-price" }, "\u20B9 ", parseFloat(card.variants[0].originalPrice).toFixed(2))), h("span", { class: "final-price" }, "\u20B9 ", parseFloat(card.variants[0].price).toFixed(2))))), index < cards.length - 1 && h("div", { class: "divider" })));
        }), h("div", { class: "bundle-total" }, h("span", null, "Total (", cards.length, ")"), h("span", null, "\u20B9", cards
            .reduce((total, item) => { var _a; return total + parseFloat(((_a = item.variants[0]) === null || _a === void 0 ? void 0 : _a.price) || "0"); }, 0)
            .toFixed(2)))));
    }
    renderChatMessages() {
        const groupedMessages = [];
        let currentGroup = [];
        let isGrouping = false;
        this.chatMessages.forEach((conversation, convIndex) => {
            const { messageType, photoSearchImage, messages } = conversation;
            messages.forEach((msg, msgIndex) => {
                var _a;
                if (msg.type === "unknown") {
                    if (msg.content &&
                        msg.content.type === "bundle" &&
                        msg.content.cards) {
                        groupedMessages.push(h("div", { class: "chat-message unknown", key: `unknown-${convIndex}-${msgIndex}` }, h("div", { class: "message-content" }, this.renderBundleMessages(msg.content.cards))));
                    }
                }
                else if (msg.type === "card") {
                    if (!isGrouping) {
                        isGrouping = true;
                        currentGroup = [];
                    }
                    const cards = msg.type === "card" ? [msg.content] : msg.content.cards;
                    cards.forEach((card, cardIndex) => {
                        var _a, _b, _c;
                        const productUrl = ((_a = card.content) === null || _a === void 0 ? void 0 : _a.productUrl) || card.productUrl || card.url || "#";
                        console.log("Product URL:", productUrl);
                        console.log("Card:", card);
                        currentGroup.push(h("div", { class: "chat-card", key: `card-${convIndex}-${msgIndex}-${cardIndex}` }, h("img", { src: card.imageUrl || "", alt: ((_b = card.title) === null || _b === void 0 ? void 0 : _b.text) || "Image" }), h("div", { class: "chat-content" }, h("h4", null, ((_c = card.title) === null || _c === void 0 ? void 0 : _c.text) || card.title || "Untitled Product"), h("a", { href: productUrl, target: "_blank", rel: "noopener noreferrer", class: "view-product-link" }, "View Product"))));
                    });
                }
                else if (((_a = msg.content) === null || _a === void 0 ? void 0 : _a.type) === "bundle") {
                    groupedMessages.push(h("div", { class: "chat-bundle", key: `bundle-${convIndex}-${msgIndex}` }, this.renderBundleMessages(msg.cards || [])));
                }
                else if (messageType === "photo-search" && msg.type === "text") {
                }
                else {
                    if (isGrouping) {
                        groupedMessages.push(h("div", { class: "chat-card-group", key: `group-${groupedMessages.length}` }, currentGroup));
                        isGrouping = false;
                    }
                    if (msg.type === "text") {
                        groupedMessages.push(h("div", { class: `chat-message ${msg.isAIReply ? "ai" : "user"}`, key: `text-${convIndex}-${msgIndex}` }, msg.content));
                    }
                    else if (msg.type === "image") {
                        groupedMessages.push(h("div", { class: "chat-message image", key: `image-${convIndex}-${msgIndex}` }, h("img", { src: msg.content, alt: "Image message" })));
                    }
                }
            });
            if (messageType === "photo-search" && photoSearchImage) {
                groupedMessages.push(h("div", { class: "chat-message photo-search", key: `photo-search-${convIndex}` }, h("img", { src: photoSearchImage, alt: "Photo search result" })));
                const textMessage = messages.find((msg) => msg.type === "text");
                if (textMessage) {
                    groupedMessages.push(h("div", { class: `chat-message ${textMessage.isAIReply ? "ai" : "user"}`, key: `photo-search-text-${convIndex}` }, textMessage.content));
                }
            }
        });
        if (isGrouping) {
            groupedMessages.push(h("div", { class: "chat-card-group", key: `group-${groupedMessages.length}` }, currentGroup));
        }
        return groupedMessages;
    }
};
MyComponent.style = myComponentCss;

export { MyComponent as my_component };

//# sourceMappingURL=my-component.entry.js.map