import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import serverless from 'serverless-http';

const app = express();
const PORT = process.env.PORT || 3000; // Make sure the port is set to 3000

// Middleware
app.use(cors({
  origin: '*', // Allow all domains to access the resource
}));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

// Route to fetch conversation from external API
app.get('/api/conversation', async (req, res) => {
  try {
    const apiUrl = 'https://chateasy.logbase.io/api/conversation?id=85febd80c829ad30c9ca3672e8afbcc1699b39bd0e6d59d34bed6c5c9b5878c4&storeId=hobbyco1935.myshopify.com';

    const response = await fetch(apiUrl);
    const data = await response.json();

    // Log the full response for debugging
    console.log('Full API response:', JSON.stringify(data, null, 2));

    if (!data.conversation) {
      return res.status(500).json({ error: 'No conversation found' });
    }

    // Preserve the original nested structure of the conversation
    const formattedMessages = data.conversation.map(convoItem => {
      const { messageType, messages, photoSearchImage } = convoItem;

      // Preserve the inner structure and format messages accordingly
      const formattedInnerMessages = messages.map(message => {
        if (message.type === 'card' && Array.isArray(message.cards)) {
          return message.cards.map(card => ({
            type: 'card',
            content: {
              title: card.title?.text || '',
              description: card.description || '',
              imageUrl: card.imageUrl || '',
              productUrl: card.url || '',
              price: card.filteredVariant?.price || '',
            },
            isAIReply: message.isAIReply || false,
          }));
        } else if (message.imageUrl) {
          return {
            type: 'image',
            content: message.imageUrl,
            productUrl: message.buttons?.find(button => button.type === 'openUrl')?.url || '',
            isAIReply: message.isAIReply || false,
          };
        } else if (message.message) {
          const formattedMessage = message.message
            .replace(/<\/?[^>]+(>|$)/g, '')  // Remove HTML tags
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/\ \"/g, ' ')
            .replace(/\"/g, '')
            .replace(/\n/g, ' ');  // Remove newlines

          return {
            type: 'text',
            content: formattedMessage,
            isAIReply: message.isAIReply || false,
          };
        } else if (message.type === 'unknown' && Array.isArray(message.cards)) {
          return message.cards.map(card => ({
            type: 'unknown',
            content: {
              title: card.title?.text || '',
              purpose: card.purpose || '',
              imageUrl: card.imageUrl || '',
              productUrl: card.url || '',
              price: card.filteredVariant?.price || '',
            },
          }));
        } else {
          // Handle cases where none of the above conditions match
          return {
            type: 'unknown',
            content: message,
            isAIReply: message.isAIReply || false,
          };
        }
      }).flat();

      // Return the preserved nested structure
      return {
        messageType,
        photoSearchImage,
        messages: formattedInnerMessages,
        id: convoItem.id,
        title: convoItem.title,
      };
    });

    // Return the nested structure in response
    res.json({ chat: formattedMessages });
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
});

// Run the server locally
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app as a serverless function for Vercel (optional, if deploying)
export default app; 
export const handler = serverless(app);