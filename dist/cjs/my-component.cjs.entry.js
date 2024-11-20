'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9a33c4fb.js');

const myComponentCss = ":host{display:flex;justify-content:center;align-items:center;font-family:'Helvetica Neue', Arial, sans-serif;width:100vw;height:100vh;margin:0;background-color:#f0f2f5}.chat-container{display:flex;flex-direction:column;width:90%;max-width:900px;height:80%;max-height:620px;background-color:#ffffff;border-radius:15px;overflow:hidden;box-shadow:0 6px 20px rgba(0, 0, 0, 0.15)}.chat-header{background:linear-gradient(45deg, #007bff, #0056b3);color:white;text-align:center;padding:15px;font-size:1.5em;font-weight:bold}.chat-messages{flex:1;padding:20px;overflow-y:auto;background-color:#f9f9f9;display:flex;flex-direction:column;gap:10px}.chat-message{padding:15px;border-radius:12px;max-width:80%;position:relative;font-size:1em;line-height:1.4;box-shadow:0 3px 10px rgba(0, 0, 0, 0.1)}.chat-message.ai{background-color:#e1f5fe;align-self:flex-start;border:1px solid #b3e5fc}.chat-message.user{background-color:#d1e7dd;align-self:flex-end;border:1px solid #a3d5c3}.chat-card-group{display:flex;flex-direction:row;overflow-x:auto;overflow-y:hidden;gap:15px;padding:10px;background-color:#ffffff;border:1px solid #ddd;min-height:380px;max-height:380px;box-sizing:border-box}.chat-card-group::-webkit-scrollbar{height:8px}.chat-card-group::-webkit-scrollbar-thumb{background-color:#007bff;border-radius:4px}.chat-card{width:345px;height:350px;min-width:250px;min-height:300px;border-radius:8px;background-color:#ffffff;border:1px solid #e0e0e0;box-shadow:0 3px 10px rgba(0, 0, 0, 0.05);display:flex;flex-direction:column;align-items:center;transition:transform 0.3s, box-shadow 0.3s}.chat-card:hover{transform:translateY(-5px);box-shadow:0 6px 20px rgba(0, 0, 0, 0.15)}.chat-card img{max-width:100%;height:auto;border-radius:6px;margin:5px 0;object-fit:contain}.chat-card h4{margin:5px 0;font-size:0.9em;font-weight:600;color:#333;text-align:center}.chat-card a{margin-top:5px;padding:6px 12px;background-color:#007bff;color:white;border-radius:6px;text-decoration:none;font-size:0.9em;font-weight:bold}.chat-card a:hover{background-color:#0056b3}.chat-message.photo-search{display:flex;justify-content:center;align-items:center;padding:10px;align-self:flex-end;}.chat-message.photo-search img{width:300px;height:auto;border-radius:8px;object-fit:cover;}.chat-message.unknown{background:#f8f8f8;border:1px dashed #ccc;padding:10px;margin:10px 0}.chat-message.image img{max-width:100%;border-radius:5px}.chat-card-group{display:flex;gap:10px;margin:10px 0}";
const MyComponentStyle0 = myComponentCss;

const MyComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
    render() {
        return (index.h("div", { key: '1746884c9d88b81a19179e75f8e758cc9fe58768', class: "chat-container" }, index.h("div", { key: '0fb52b37f727eb324e7601d38c7d578ed629ae17', class: "chat-header" }, "Timmy AI"), index.h("div", { key: 'f451905d20f316eecc495ddbcfa9262e6324ab9e', class: "chat-messages" }, this.isLoading ? (index.h("div", { class: "loading" }, "Loading messages...")) : this.errorMessage ? (index.h("div", { class: "error" }, this.errorMessage)) : (this.renderChatMessages()))));
    }
    renderChatMessages() {
        const messageGroups = [];
        let isGrouping = false;
        let group = [];
        this.chatMessages.forEach((conversation, convIndex) => {
            const { messageType, photoSearchImage, messages } = conversation;
            messages.forEach((msg, msgIndex) => {
                var _a;
                if (msg.type === "card" || (msg.type === "unknown" && ((_a = msg.content) === null || _a === void 0 ? void 0 : _a.cards))) {
                    // Handle card-like messages
                    if (!isGrouping) {
                        isGrouping = true;
                        group = [];
                    }
                    const cards = msg.type === "card" ? [msg.content] : msg.content.cards;
                    cards.forEach((card, cardIndex) => {
                        var _a, _b;
                        group.push(index.h("div", { class: "chat-card", key: `card-${convIndex}-${msgIndex}-${cardIndex}` }, index.h("h4", null, ((_a = card.title) === null || _a === void 0 ? void 0 : _a.text) || "Untitled Card"), index.h("img", { src: card.imageUrl || "", alt: ((_b = card.title) === null || _b === void 0 ? void 0 : _b.text) || "Image" }), index.h("a", { href: card.url || "#", target: "_blank", rel: "noopener noreferrer" }, "View Product")));
                    });
                }
                else if (msg.type === "text" || msg.type === "image" || msg.type === "unknown") {
                    // Handle text, image, and unknown messages
                    if (isGrouping) {
                        messageGroups.push(index.h("div", { class: "chat-card-group", key: `group-${messageGroups.length}` }, group));
                        isGrouping = false;
                    }
                    if (msg.type === "text") {
                        messageGroups.push(index.h("div", { class: `chat-message ${msg.isAIReply ? "ai" : "user"}`, key: `text-${convIndex}-${msgIndex}` }, msg.content));
                    }
                    else if (msg.type === "image") {
                        messageGroups.push(index.h("div", { class: "chat-message image", key: `image-${convIndex}-${msgIndex}` }, index.h("img", { src: msg.content, alt: "Image message" })));
                    }
                    else if (msg.type === "unknown") {
                        messageGroups.push(index.h("div", { class: "chat-message unknown", key: `unknown-${convIndex}-${msgIndex}` }, index.h("pre", null, JSON.stringify(msg.content, null, 2))));
                    }
                }
            });
            // Handle photo search images
            if (messageType === "photo-search" && photoSearchImage) {
                messageGroups.push(index.h("div", { class: "chat-message photo-search", key: `photo-search-${convIndex}` }, index.h("img", { src: photoSearchImage, alt: "Photo search result" })));
            }
            // Add grouped cards if grouping is still active
            if (isGrouping) {
                messageGroups.push(index.h("div", { class: "chat-card-group", key: `group-${messageGroups.length}` }, group));
            }
        });
        return messageGroups;
    }
};
MyComponent.style = MyComponentStyle0;

exports.my_component = MyComponent;

//# sourceMappingURL=my-component.cjs.entry.js.map