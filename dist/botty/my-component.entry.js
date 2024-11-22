import { r as registerInstance, h } from './index-29c61e3f.js';

const myComponentCss = ":host{display:flex;justify-content:center;align-items:center;font-family:'Helvetica Neue', Arial, sans-serif;width:100vw;height:100vh;margin:0;background-color:#f0f2f5}.chat-container{display:flex;flex-direction:column;width:90%;max-width:900px;height:80%;max-height:620px;background-color:#ffffff;border-radius:15px;overflow:hidden;box-shadow:0 6px 20px rgba(0, 0, 0, 0.15)}.chat-header{background:linear-gradient(45deg, #007bff, #0056b3);color:white;text-align:center;padding:15px;font-size:1.5em;font-weight:bold}.chat-messages{display:flex;flex-direction:row-reverse;gap:10px;overflow-y:auto;background-color:#f9f9f9;padding:20px;align-content:flex-start;flex-wrap:wrap}.chat-message{padding:15px;border-radius:12px;max-width:80%;font-size:1em;line-height:1.4;box-shadow:0 3px 10px rgba(0, 0, 0, 0.1)}.chat-message.ai{background-color:#e1f5fe;align-self:flex-start}.chat-message.user{background-color:#d1e7dd;align-self:flex-end}.chat-card-group{display:flex;flex-direction:row;overflow-x:auto;gap:15px;padding:10px;background-color:#ffffff;border:1px solid #ddd;min-height:380px;max-height:380px;box-sizing:border-box}.chat-card-group::-webkit-scrollbar{height:8px}.chat-card-group::-webkit-scrollbar-thumb{background-color:#007bff;border-radius:4px}.chat-card{width:345px;height:350px;min-width:250px;min-height:300px;border-radius:8px;background-color:#ffffff;border:1px solid #e0e0e0;box-shadow:0 3px 10px rgba(0, 0, 0, 0.05);display:flex;flex-direction:column;transition:transform 0.3s, box-shadow 0.3s}.chat-card:hover{transform:translateY(-5px);box-shadow:0 6px 20px rgba(0, 0, 0, 0.15)}.chat-card img{max-width:100%;height:auto;border-radius:6px;margin:5px 0;object-fit:contain}.chat-card h4{margin:5px 0;font-size:0.9em;font-weight:600;color:#333;text-align:center}.chat-card a{margin-top:5px;padding:6px 12px;background-color:#007bff;color:white;border-radius:6px;text-decoration:none;font-size:0.9em;font-weight:bold}.chat-card a:hover{background-color:#0056b3}.chat-message.photo-search{display:flex;justify-content:center;align-items:center;padding:10px;align-self:flex-end;}.chat-message.photo-search img{width:300px;height:auto;border-radius:8px;object-fit:cover;}.chat-bundle{background-color:#f9f9f9;padding:10px;border-radius:8px}.bundle-header{font-weight:bold;font-size:18px}.bundle-item{display:flex;margin:10px 0;padding:10px;border:1px solid #ddd;border-radius:5px}.bundle-image img{width:50px;height:50px;margin-right:10px}.bundle-info{flex:1}.bundle-info h4{font-size:16px}.bundle-total{font-weight:bold;margin-top:10px;text-align:right}.bundle-items{display:flex;flex-direction:column}.chat-message.unknown{background:#f8f8f8;border:1px dashed #ccc;padding:10px;margin:10px 0}.chat-message.image img{max-width:100%;border-radius:5px}.chat-card-group{display:flex;gap:10px;margin:10px 0}.bundle-container{background-color:#ffffff;padding:24px;border-radius:18px;box-shadow:0 8px 24px rgba(0, 0, 0, 0.15);margin-bottom:20px;max-width:100%;font-family:'Roboto', sans-serif;transition:transform 0.3s ease, box-shadow 0.3s ease}.bundle-container h4{font-size:22px;font-weight:600;margin-bottom:18px;color:#333;text-align:center;background:linear-gradient(45deg, #007bff, #0056b3);padding:8px;border-radius:10px;color:white;box-shadow:0 3px 8px rgba(0, 0, 0, 0.1)}.bundle-item{display:flex;align-items:center;gap:15px;padding:14px;border-radius:12px;border:1px solid #e0e0e0;margin-bottom:14px;background-color:#f9f9f9;transition:transform 0.3s ease, box-shadow 0.3s ease}.bundle-item:hover{transform:translateY(-6px);box-shadow:0 6px 16px rgba(0, 0, 0, 0.12)}.bundle-item-image{width:60px;height:60px;object-fit:cover;border-radius:8px;transition:transform 0.2s ease}.bundle-item-image:hover{transform:scale(1.1);}.bundle-item-details{flex:1}.bundle-item-title{font-size:16px;font-weight:600;color:#333;margin:0;transition:color 0.3s ease}.bundle-item-purpose{font-size:14px;color:#777;margin-top:4px}.bundle-item-price-section{text-align:right;font-size:16px}.original-price{text-decoration:line-through;color:#bbb;font-size:14px}.final-price{font-size:18px;font-weight:600;color:#27ae60}.bundle-separator{height:2px;background-color:#e0e0e0;margin:20px 0}.bundle-total{display:flex;justify-content:space-between;align-items:center;padding:18px;font-size:18px;font-weight:700;color:#388e3c;background-color:#e8f5e9;border-radius:12px;margin-top:20px;box-shadow:0 4px 8px rgba(0, 0, 0, 0.1)}.bundle-card-button{display:inline-block;width:100%;padding:10px 15px;font-size:16px;color:white;background-color:#007bff;border-radius:10px;text-decoration:none;margin-top:15px;text-align:center;font-weight:bold;transition:background-color 0.3s ease, transform 0.2s ease}.bundle-card-button:hover{background-color:#0056b3;transform:scale(1.05)}.bundle-cards{display:flex;flex-wrap:wrap;gap:20px;justify-content:center}.bundle-card{width:240px;background-color:#ffffff;border:1px solid #e0e0e0;border-radius:12px;box-shadow:0 4px 12px rgba(0, 0, 0, 0.05);overflow:hidden;transition:transform 0.3s ease, box-shadow 0.3s ease}.bundle-card:hover{transform:translateY(-8px);box-shadow:0 6px 16px rgba(0, 0, 0, 0.1)}.bundle-card-image{width:100%;height:150px;object-fit:cover;border-bottom:2px solid #f0f2f5}.bundle-card-details{padding:16px}.bundle-card-details h5{font-size:18px;font-weight:600;color:#333;margin-bottom:10px}.bundle-card-details p{font-size:14px;color:#777;margin-bottom:12px}.bundle-card-details span{font-size:18px;font-weight:600;color:#27ae60}";

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
            return (h("div", { class: `chat-bundle user`, key: key }, " ", this.renderBundleMessages(msg.content.cards || [])));
        }
        return (h("div", { class: "chat-message unknown user", key: key }, " ", h("pre", null, JSON.stringify(msg.content, null, 2))));
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
        return (h("div", { key: 'cfbfcd8f25b6b6bf074c2b511453c69636b708aa', class: "chat-container" }, h("div", { key: '13cfd7729ae68eb23833f8f7f9e594685c52e8dd', class: "chat-header" }, "Timmy AI"), h("div", { key: '62767e6e023e085d4aa11f3a8975e1239978f7cc', class: "chat-messages" }, this.isLoading ? (h("div", { class: "loading" }, "Loading messages...")) : this.errorMessage ? (h("div", { class: "error" }, this.errorMessage)) : (this.renderChatMessages()))));
    }
};
MyComponent.style = myComponentCss;

export { MyComponent as my_component };

//# sourceMappingURL=my-component.entry.js.map