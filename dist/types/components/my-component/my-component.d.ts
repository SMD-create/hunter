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
export declare class MyComponent {
    chatMessages: Conversation[];
    isLoading: boolean;
    errorMessage: string | null;
    componentWillLoad(): Promise<void>;
    private renderBundleMessages;
    private renderCardMessages;
    private renderTextMessage;
    private renderImageMessage;
    private renderUnknownMessage;
    private renderChatMessages;
    render(): any;
}
export {};
