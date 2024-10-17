interface ChatMessage {
    type: string;
    content: any;
    isAIReply?: boolean;
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
    render(): any;
    private renderChatMessages;
}
export {};
