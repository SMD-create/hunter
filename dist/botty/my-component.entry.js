import { h, r as registerInstance } from './index-f11e3b55.js';

const myComponentCss = ":host{display:flex;justify-content:center;align-items:center;font-family:'Helvetica Neue', Arial, sans-serif;width:100vw;height:100vh;margin:0;background-color:#f0f2f5}.chat-container{display:flex;flex-direction:column;width:90%;max-width:900px;height:80%;max-height:620px;background-color:#ffffff;border-radius:15px;overflow:hidden;box-shadow:0 6px 20px rgba(0, 0, 0, 0.15)}.chat-header{background:linear-gradient(45deg, #007bff, #0056b3);color:white;text-align:center;padding:15px;font-size:1.5em;font-weight:bold}.chat-messages{flex:1;padding:20px;overflow-y:auto;background-color:#f9f9f9;display:flex;flex-direction:column;gap:10px}.chat-message{padding:15px;border-radius:12px;max-width:80%;position:relative;font-size:1em;line-height:1.4;box-shadow:0 3px 10px rgba(0, 0, 0, 0.1)}.chat-message.ai{background-color:#e1f5fe;align-self:flex-start;border:1px solid #b3e5fc}.chat-message.user{background-color:#d1e7dd;align-self:flex-end;border:1px solid #a3d5c3}.chat-card-group{display:flex;flex-direction:row;overflow-x:auto;overflow-y:hidden;gap:15px;padding:10px;background-color:#ffffff;border:1px solid #ddd;min-height:380px;max-height:380px;box-sizing:border-box}.chat-card-group::-webkit-scrollbar{height:8px}.chat-card-group::-webkit-scrollbar-thumb{background-color:#007bff;border-radius:4px}.chat-card{width:345px;height:350px;min-width:250px;min-height:300px;border-radius:8px;background-color:#ffffff;border:1px solid #e0e0e0;box-shadow:0 3px 10px rgba(0, 0, 0, 0.05);display:flex;flex-direction:column;align-items:center;transition:transform 0.3s, box-shadow 0.3s}.chat-card:hover{transform:translateY(-5px);box-shadow:0 6px 20px rgba(0, 0, 0, 0.15)}.chat-card img{max-width:100%;height:auto;border-radius:6px;margin:5px 0;object-fit:contain}.chat-card h4{margin:5px 0;font-size:0.9em;font-weight:600;color:#333;text-align:center}.chat-card a{margin-top:5px;padding:6px 12px;background-color:#007bff;color:white;border-radius:6px;text-decoration:none;font-size:0.9em;font-weight:bold}.chat-card a:hover{background-color:#0056b3}.chat-message.photo-search{display:flex;justify-content:center;align-items:center;padding:10px;align-self:flex-end;}.chat-message.photo-search img{width:300px;height:auto;border-radius:8px;object-fit:cover;}";

h("link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" });
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
                this.chatMessages = data.chat || []; // Safeguard in case `chat` is undefined
            }
            else {
                console.error("Error fetching chat messages");
                this.errorMessage = "Failed to load chat messages.";
            }
        }
        catch (error) {
            console.error("Error:", error);
            this.errorMessage = "Error fetching chat messages.";
        }
        finally {
            this.isLoading = false; // End loading state
        }
    }
    render() {
        return (h("div", { key: '89e8ec97203d4a94216d6c976c71dc700a4dab11', class: "chat-container" }, h("div", { key: 'a713b7f81f6cd1260cfcb8f5d3d39f2b1324e14b', class: "chat-header" }, "Timmy AI"), h("div", { key: 'bc44db06179215f590db0cd0bd9c38ab8807cd0f', class: "chat-messages" }, this.isLoading ? (h("div", { class: "loading" }, "Loading messages...")) : this.errorMessage ? (h("div", { class: "error" }, this.errorMessage)) : (this.renderChatMessages())), h("script", { key: '3a5d6fee54b4676591cbd4c148c2f8673b9a5c8e', src: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" })));
    }
    renderChatMessages() {
        const messageGroups = [];
        let isGrouping = false;
        let group = [];
        this.chatMessages.forEach((conversation, convIndex) => {
            // Each conversation has a messageType (e.g., 'photo-search') and a nested messages array
            const { messageType, photoSearchImage, messages } = conversation;
            messages.forEach((msg, msgIndex) => {
                if (msg.type === "card") {
                    if (!isGrouping) {
                        // Start grouping if the first card is encountered
                        isGrouping = true;
                        group = [];
                    }
                    group.push(h("div", { class: "chat-card", key: `card-${convIndex}-${msgIndex}` }, h("h4", null, msg.content.title.text), h("img", { src: msg.content.imageUrl, alt: msg.content.title.text }), h("a", { href: msg.content.productUrl, target: "_blank", rel: "noopener noreferrer" }, "View Product")));
                }
                else if (msg.type === "text" || msg.type === "image") {
                    if (isGrouping) {
                        // Stop grouping if a non-card message is encountered
                        messageGroups.push(h("div", { class: "chat-card-group swiper", key: `group-${messageGroups.length}` }, group));
                        isGrouping = false; // Reset grouping status
                    }
                    if (msg.type === "text") {
                        messageGroups.push(h("div", { class: `chat-message ${msg.isAIReply ? "ai" : "user"}`, key: `text-${convIndex}-${msgIndex}` }, msg.content));
                    }
                    else if (msg.type === "image") {
                        messageGroups.push(h("div", { class: "chat-message", key: `image-${convIndex}-${msgIndex}` }, h("img", { src: msg.content, alt: "Image message" })));
                    }
                }
            });
            // Render photo search image if available
            if (messageType === "photo-search" && photoSearchImage) {
                messageGroups.push(h("div", { class: "chat-message photo-search", key: `photo-search-${convIndex}` }, h("img", { src: photoSearchImage, alt: "Photo search result" })));
            }
            // Add any remaining grouped cards if the loop ended while still grouping
            if (isGrouping) {
                messageGroups.push(h("div", { class: "chat-card-group swiper", key: `group-${messageGroups.length}` }, group));
            }
        });
        return messageGroups;
    }
};
MyComponent.style = myComponentCss;

export { MyComponent as my_component };

//# sourceMappingURL=my-component.entry.js.map