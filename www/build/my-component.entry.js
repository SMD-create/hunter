import { r as registerInstance, h } from './index-29c61e3f.js';

const myComponentCss = ":host{display:flex;justify-content:center;align-items:center;font-family:'Helvetica Neue', Arial, sans-serif;width:100vw;height:100vh;margin:0;background-color:#f0f2f5}.chat-container{display:flex;flex-direction:column;width:90%;max-width:900px;height:80%;max-height:620px;background-color:#ffffff;border-radius:15px;overflow:hidden;box-shadow:0 6px 20px rgba(0, 0, 0, 0.15)}.chat-header{background:linear-gradient(45deg, #007bff, #0056b3);color:white;text-align:center;padding:15px;font-size:1.5em;font-weight:bold}.chat-messages{flex:1;padding:20px;overflow-y:auto;background-color:#f9f9f9;display:flex;flex-direction:column;gap:10px}.chat-message{padding:15px;border-radius:12px;max-width:80%;position:relative;font-size:1em;line-height:1.4;box-shadow:0 3px 10px rgba(0, 0, 0, 0.1)}.chat-message.ai{background-color:#e1f5fe;align-self:flex-start;border:1px solid #b3e5fc}.chat-message.user{background-color:#d1e7dd;align-self:flex-end;border:1px solid #a3d5c3}.chat-message.image img{max-width:100%;border-radius:5px}.chat-card-group{display:flex;gap:10px}";

const MyComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.chatMessages = [];
        this.isLoading = true;
        this.errorMessage = null;
    }
    async componentWillLoad() {
        try {
            const response = await fetch("https://timmy-io-smd-create-smd-creates-projects.vercel.app/api/conversation");
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
    renderBundleMessages(cards) {
        return (h("div", { class: "bundle-container" }, h("h4", null, "Your Bundle"), cards.map((card, index) => {
            var _a, _b;
            return (h("div", { class: "bundle-item", key: `bundle-card-${index}` }, h("div", { class: "bundle-content" }, h("img", { src: card.imageUrl, alt: card.title.text, class: "bundle-item-image" }), h("div", { class: "bundle-item-details" }, h("h5", { class: "bundle-item-title" }, card.title.text), h("p", { class: "bundle-item-purpose" }, card.purpose || "No description available."), h("span", { class: "bundle-item-price" }, "Rs. ", ((_b = (_a = card.variants) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.price) || "N/A"))), index < cards.length - 1 && h("hr", { class: "bundle-separator" })));
        }), h("div", { class: "bundle-total" }, h("strong", null, "Total:"), " ", "Rs.", " ", cards.reduce((total, card) => { var _a, _b; return total + parseFloat(((_b = (_a = card.variants) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.price) || "0"); }, 0))));
    }
    renderCardMessages(cards) {
        return cards.map((card, index) => {
            var _a, _b;
            return (h("div", { class: "chat-card", key: `card-${index}` }, h("h4", null, ((_a = card.title) === null || _a === void 0 ? void 0 : _a.text) || "Untitled Card"), h("img", { src: card.imageUrl || "", alt: ((_b = card.title) === null || _b === void 0 ? void 0 : _b.text) || "Image", class: "card-image" }), card.url && (h("a", { href: card.url, target: "_blank", rel: "noopener noreferrer", class: "card-link" }, "View Product"))));
        });
    }
    renderTextMessage(msg, key) {
        return (h("div", { class: `chat-message ${msg.isAIReply ? "ai" : "user"}`, key: key }, msg.content));
    }
    renderImageMessage(msg, key) {
        return (h("div", { class: `chat-message image ${msg.isAIReply ? "ai" : "user"}`, key: key }, h("img", { src: msg.content, alt: "Image message" })));
    }
    renderUnknownMessage(msg, key) {
        var _a;
        if (((_a = msg.content) === null || _a === void 0 ? void 0 : _a.type) === "bundle") {
            return (h("div", { class: "chat-bundle", key: key }, this.renderBundleMessages(msg.content.cards || [])));
        }
        return (h("div", { class: "chat-message unknown", key: key }, h("pre", null, JSON.stringify(msg.content, null, 2))));
    }
    renderChatMessages() {
        return this.chatMessages.map((conversation, convIndex) => (h("div", { class: "conversation", key: `conv-${convIndex}` }, conversation.messages.map((msg, msgIndex) => {
            const key = `msg-${convIndex}-${msgIndex}`;
            switch (msg.type) {
                case "text":
                    return this.renderTextMessage(msg, key);
                case "image":
                    return this.renderImageMessage(msg, key);
                case "card":
                    return (h("div", { class: "chat-card-group" }, this.renderCardMessages([msg.content])));
                case "bundle":
                    return (h("div", { class: "chat-bundle", key: key }, this.renderBundleMessages(msg.cards || [])));
                case "unknown":
                    return this.renderUnknownMessage(msg, key);
                default:
                    return (h("div", { class: "chat-message unhandled", key: key }, "Unhandled message type: ", msg.type));
            }
        }))));
    }
    render() {
        return (h("div", { key: '8cac989def906238b22e51fb012656a9614659ec', class: "chat-container" }, h("div", { key: '15c8d9d0a8048694e131410c444bfda50cfd945d', class: "chat-header" }, "Timmy AI"), h("div", { key: 'fd7012e18f438a105cf739e06a06a8d42e2f59d0', class: "chat-messages" }, this.isLoading ? (h("div", { class: "loading" }, "Loading messages...")) : this.errorMessage ? (h("div", { class: "error" }, this.errorMessage)) : (this.renderChatMessages()))));
    }
};
MyComponent.style = myComponentCss;

export { MyComponent as my_component };

//# sourceMappingURL=my-component.entry.js.map