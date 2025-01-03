// server.js
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
app.get('/api/conversation', async (req, res) => { // Updated the route to include /api
  try {
    const apiUrl = 'https://chateasy.logbase.io/api/conversation?id=cdb63a0953cd227918b86be96d56f60d42993f5ff8de771d38adba7cfc1f74ed&storeId=timmy-demo.myshopify.com';

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.conversation) {
      return res.status(500).json({ error: 'No conversation found' });
    }

    // Process and format the conversation messages
    const allMessages = data.conversation.map(item => item.messages || []);
    const flattenedMessages = allMessages.flatMap(item => item);
    const formattedMessages = flattenedMessages.map(message => {
      if (message.type === 'card' && Array.isArray(message.cards)) {
        return message.cards.map(card => ({
          type: 'card',
          content: {
            title: card.title,
            description: card.description,
            imageUrl: card.imageUrl,
            productUrl: card.buttons?.find(button => button.type === 'openUrl')?.url,
          },
          isAIReply: message.isAIReply,
        }));
      } else if (message.imageUrl) {
        return {
          type: 'image',
          content: message.imageUrl,
          productUrl: message.buttons?.find(button => button.type === 'openUrl')?.url,
          isAIReply: message.isAIReply,
        };
      } else {
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
          isAIReply: message.isAIReply,
        };
      }
    }).flat();

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
