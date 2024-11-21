import { r as registerInstance, h } from './index-29c61e3f.js';

const myComponentCss = ":host{display:flex;justify-content:center;align-items:center;font-family:'Helvetica Neue', Arial, sans-serif;width:100vw;height:100vh;margin:0;background-color:#f0f2f5}.chat-container{display:flex;flex-direction:column;width:90%;max-width:900px;height:80%;max-height:620px;background-color:#ffffff;border-radius:15px;overflow:hidden;box-shadow:0 6px 20px rgba(0, 0, 0, 0.15)}.chat-header{background:linear-gradient(45deg, #007bff, #0056b3);color:white;text-align:center;padding:15px;font-size:1.5em;font-weight:bold}.chat-messages{flex:1;padding:20px;overflow-y:auto;background-color:#f9f9f9;display:flex;flex-direction:column;gap:10px}.chat-message{padding:15px;border-radius:12px;max-width:80%;position:relative;font-size:1em;line-height:1.4;box-shadow:0 3px 10px rgba(0, 0, 0, 0.1)}.chat-message.ai{background-color:#e1f5fe;align-self:flex-start;border:1px solid #b3e5fc}.chat-message.user{background-color:#d1e7dd;align-self:flex-end;border:1px solid #a3d5c3}.chat-card-group{display:flex;flex-direction:row;overflow-x:auto;gap:15px;padding:10px;background-color:#ffffff;border:1px solid #ddd;min-height:380px;max-height:380px;box-sizing:border-box}.chat-card-group::-webkit-scrollbar{height:8px}.chat-card-group::-webkit-scrollbar-thumb{background-color:#007bff;border-radius:4px}.chat-card{width:345px;height:350px;min-width:250px;min-height:300px;border-radius:8px;background-color:#ffffff;border:1px solid #e0e0e0;box-shadow:0 3px 10px rgba(0, 0, 0, 0.05);display:flex;flex-direction:column;align-items:center;transition:transform 0.3s, box-shadow 0.3s}.chat-card:hover{transform:translateY(-5px);box-shadow:0 6px 20px rgba(0, 0, 0, 0.15)}.chat-card img{max-width:100%;height:auto;border-radius:6px;margin:5px 0;object-fit:contain}.chat-card h4{margin:5px 0;font-size:0.9em;font-weight:600;color:#333;text-align:center}.chat-card a{margin-top:5px;padding:6px 12px;background-color:#007bff;color:white;border-radius:6px;text-decoration:none;font-size:0.9em;font-weight:bold}.chat-card a:hover{background-color:#0056b3}.chat-message.photo-search{display:flex;justify-content:center;align-items:center;padding:10px;align-self:flex-end;}.chat-message.photo-search img{width:300px;height:auto;border-radius:8px;object-fit:cover;}.chat-bundle{background-color:#f9f9f9;padding:10px;border-radius:8px}.bundle-header{font-weight:bold;font-size:18px}.bundle-item{display:flex;margin:10px 0;padding:10px;border:1px solid #ddd;border-radius:5px}.bundle-image img{width:50px;height:50px;margin-right:10px}.bundle-info{flex:1}.bundle-info h4{font-size:16px}.bundle-total{font-weight:bold;margin-top:10px;text-align:right}.bundle-items{display:flex;flex-direction:column}.chat-message.unknown{background:#f8f8f8;border:1px dashed #ccc;padding:10px;margin:10px 0}.chat-message.image img{max-width:100%;border-radius:5px}.chat-card-group{display:flex;gap:10px;margin:10px 0}.bundle-container{background:#f9f9f9;padding:16px;border-radius:8px;font-family:Arial, sans-serif}.bundle-item{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #e0e0e0}.bundle-item:last-child{border-bottom:none}.bundle-item-image{width:50px;height:50px;object-fit:cover;border-radius:4px;margin-right:12px}.bundle-item-content{flex:1;display:flex;align-items:center}.bundle-item-details{flex:1}.bundle-item-title{font-size:14px;font-weight:bold;margin:0}.bundle-item-purpose{font-size:12px;color:#666;margin:4px 0 0 0}.bundle-item-price-section{text-align:right}.original-price{text-decoration:line-through;color:#999;font-size:12px;margin-right:8px}.final-price{font-size:14px;font-weight:bold;color:#333}.bundle-item-checkbox{margin-left:12px}.bundle-separator{text-align:center;font-size:18px;font-weight:bold;color:#666;padding:8px 0}.bundle-total{display:flex;justify-content:space-between;align-items:center;padding:16px 0;font-weight:bold;background-color:#e8f5e9;color:#388e3c;border-radius:4px;font-size:14px}";

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
        return (h("div", { class: "chat-message image", key: key }, h("img", { src: msg.content, alt: "Image message" })));
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
                    return h("div", { class: "chat-card-group" }, this.renderCardMessages([msg.content]));
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
        return (h("div", { key: 'e118112aeed01e2ddf0a8bdba7838570eec50732', class: "chat-container" }, h("div", { key: '29174c7567a8a99674f3176128909b7896ef0cec', class: "chat-header" }, "Timmy AI"), h("div", { key: '19fcca5411c0bc7e7c89ae04f411f6fa9048ea05', class: "chat-messages" }, this.isLoading ? (h("div", { class: "loading" }, "Loading messages...")) : this.errorMessage ? (h("div", { class: "error" }, this.errorMessage)) : (this.renderChatMessages()))));
    }
};
MyComponent.style = myComponentCss;

export { MyComponent as my_component };

//# sourceMappingURL=my-component.entry.js.map