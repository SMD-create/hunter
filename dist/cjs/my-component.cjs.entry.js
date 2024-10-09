'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-d1833c5b.js');

const myComponentCss = ":host{display:flex;justify-content:center;align-items:center;font-family:'Helvetica Neue', Arial, sans-serif;width:100vw;height:100vh;margin:0;background-color:#f0f2f5;box-shadow:0 4px 15px rgba(0, 0, 0, 0.1)}.chat-container{display:flex;flex-direction:column;width:900px;height:620px;background-color:#ffffff;border-radius:15px;overflow:hidden;box-shadow:0 6px 20px rgba(0, 0, 0, 0.15);}.chat-header{background:linear-gradient(45deg, #007bff, #0056b3);color:white;text-align:center;padding:15px;font-size:1.5em;font-weight:bold}.chat-messages{flex:1;padding:20px;overflow-y:auto;background-color:#f9f9f9;display:flex;flex-direction:column;gap:10px;}.chat-message{padding:15px;border-radius:12px;max-width:80%;position:relative;font-size:1em;line-height:1.4;box-shadow:0 3px 10px rgba(0, 0, 0, 0.1);}.chat-message.ai{background-color:#e1f5fe;align-self:flex-start;border:1px solid #b3e5fc}.chat-message.user{background-color:#d1e7dd;align-self:flex-end;border:1px solid #a3d5c3}.chat-card{padding:15px;border-radius:12px;background-color:#ffffff;border:1px solid #e0e0e0;width:100%;box-shadow:0 3px 10px rgba(0, 0, 0, 0.05);display:flex;flex-direction:column;align-items:center;transition:transform 0.3s, box-shadow 0.3s;}.chat-card:hover{transform:translateY(-5px);box-shadow:0 6px 20px rgba(0, 0, 0, 0.15)}.chat-card img{max-width:100%;border-radius:10px;margin:10px 0}.chat-card h4{margin:10px 0;font-size:1.2em;font-weight:600;color:#333;}.chat-card a{margin-top:10px;padding:8px 16px;background-color:#007bff;color:white;border-radius:8px;text-decoration:none;font-weight:bold;transition:background-color 0.3s}.chat-card a:hover{background-color:#0056b3}.chat-input-container{display:flex;border-top:1px solid #ddd;padding:15px;background-color:#ffffff}.chat-input{flex:1;padding:12px;border:1px solid #ccc;border-radius:8px;font-size:1em;transition:border-color 0.3s}.chat-input:focus{border-color:#007bff;outline:none}.send-button{margin-left:10px;padding:12px 24px;background-color:#007bff;color:white;border:none;border-radius:8px;cursor:pointer;font-size:1em;font-weight:bold;transition:background-color 0.3s, transform 0.3s}.send-button:hover{background-color:#0056b3;transform:translateY(-2px);}";
const MyComponentStyle0 = myComponentCss;

const MyComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.chatMessages = [];
    }
    async componentWillLoad() {
        try {
            const response = await fetch('http://localhost:5000/api/fetch-conversation'); // Replace with your backend URL
            if (response.ok) {
                const data = await response.json();
                this.chatMessages = data.chat; // Assuming the response structure is compatible
            }
            else {
                console.error('Error fetching chat messages');
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    render() {
        return (index.h("div", { key: '4ed09a429e048f25b360f09cc0014a220724eb5c', class: "chat-container" }, index.h("div", { key: '7a2678396d1f26a7f622493940959bcccfa4452a', class: "chat-header" }, "Timmy AI"), index.h("div", { key: '69331ff5d6b9c4479e39af0fce1dbbe725c4f220', class: "chat-messages" }, this.chatMessages &&
            this.chatMessages.map((msg, index$1) => {
                if (msg.type === 'text') {
                    return (index.h("div", { class: `chat-message ${msg.isAIReply ? 'ai' : 'user'}`, key: index$1 }, msg.content));
                }
                else if (msg.type === 'card') {
                    return (index.h("div", { class: "chat-card", key: index$1 }, index.h("h4", null, msg.content.title.text), index.h("img", { src: msg.content.imageUrl, alt: msg.content.title.text }), index.h("a", { href: msg.content.productUrl, target: "_blank", rel: "noopener noreferrer" }, "View Product")));
                }
                return null; // In case of unrecognized message type
            }))));
    }
};
MyComponent.style = MyComponentStyle0;

exports.my_component = MyComponent;

//# sourceMappingURL=my-component.cjs.entry.js.map