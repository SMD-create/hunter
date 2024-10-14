// my-component.tsx
import { h } from "@stencil/core";
export class MyComponent {
    constructor() {
        this.chatMessages = [];
        this.isLoading = true;
        this.errorMessage = null;
    }
    async componentWillLoad() {
        try {
            const response = await fetch('http://localhost:3000/api/conversation'); // Fetch from local backend
            if (response.ok) {
                const data = await response.json();
                this.chatMessages = data.chat || []; // Safeguard in case `chat` is undefined
            }
            else {
                console.error('Error fetching chat messages');
                this.errorMessage = 'Failed to load chat messages.';
            }
        }
        catch (error) {
            console.error('Error:', error);
            this.errorMessage = 'Error fetching chat messages.';
        }
        finally {
            this.isLoading = false; // End loading state
        }
    }
    render() {
        return (h("div", { key: '882bfb502d74ccbdb9210a14ad2d14e76c6a970a', class: "chat-container" }, h("div", { key: '85f37fb53ff5a404cae16904bdbe0c2d2c190b36', class: "chat-header" }, "Timmy AI"), h("div", { key: '3da51ea1b898ebbaaefbe27dd2fbf3172e200395', class: "chat-messages" }, this.isLoading ? (h("div", { class: "loading" }, "Loading messages...")) : this.errorMessage ? (h("div", { class: "error" }, this.errorMessage)) : (this.chatMessages.map((msg, index) => {
            if (msg.type === 'text') {
                return (h("div", { class: `chat-message ${msg.isAIReply ? 'ai' : 'user'}`, key: index }, msg.content));
            }
            else if (msg.type === 'card') {
                return (h("div", { class: "chat-card", key: index }, h("h4", null, msg.content.title), " ", h("img", { src: msg.content.imageUrl, alt: msg.content.title }), h("a", { href: msg.content.productUrl, target: "_blank", rel: "noopener noreferrer" }, "View Product")));
            }
            else if (msg.type === 'image') {
                return (h("div", { class: "chat-message", key: index }, h("img", { src: msg.content, alt: "Image message" })));
            }
            return null; // In case of unrecognized message type
        })))));
    }
    static get is() { return "my-component"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["my-component.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["my-component.css"]
        };
    }
    static get states() {
        return {
            "chatMessages": {},
            "isLoading": {},
            "errorMessage": {}
        };
    }
}
//# sourceMappingURL=my-component.js.map
