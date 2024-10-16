interface ChatMessage {
    type: string;
    content: any;
    isAIReply?: boolean;
}
export declare class MyComponent {
    chatMessages: ChatMessage[];
    isLoading: boolean;
    errorMessage: string | null;
    componentWillLoad(): Promise<void>;
    render(): any;
    private renderChatMessages;
}
export {};
