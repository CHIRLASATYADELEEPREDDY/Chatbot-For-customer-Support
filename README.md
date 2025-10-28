# 🤖 Simple Customer Service Chatbot

A lightweight, keyword-based customer service chatbot built with vanilla JavaScript. Provides instant responses to common customer inquiries without requiring any backend or AI/ML infrastructure.

## ✨ Features

- **Instant Responses**: Sub-second response time for all queries
- **10 Core Intents**: Pre-configured answers for common customer questions
- **Keyword Matching**: Smart intent recognition based on keyword analysis
- **Modern UI**: Beautiful, responsive chat widget with smooth animations
- **Quick Actions**: One-click buttons for popular queries
- **Fallback Handling**: Graceful escalation to human support when needed
- **Zero Dependencies**: Pure JavaScript, HTML, and CSS
- **Mobile Responsive**: Works seamlessly on all device sizes

## 📋 Supported Intents

1. **Shipping Status** - Track orders and delivery information
2. **Return Policy** - Return and refund procedures
3. **Password Reset** - Account access recovery
4. **Contact Information** - Support contact details
5. **Product Pricing** - Pricing and discount information
6. **Payment Methods** - Accepted payment options
7. **Account Management** - Profile and settings updates
8. **Warranty Information** - Product warranty details
9. **Business Hours** - Operating hours and availability
10. **International Shipping** - Global shipping information

## 🚀 Quick Start

### Option 1: Direct File Opening

1. Navigate to the project folder:
   ```
   C:\Users\satya\OneDrive\Desktop\AMLTA
   ```

2. Double-click `index.html` to open in your default browser

3. Click the chat icon in the bottom-right corner to start chatting!

### Option 2: Local Web Server (Recommended)

Using Python:
```bash
cd C:\Users\satya\OneDrive\Desktop\AMLTA
python -m http.server 8000
```

Then open: `http://localhost:8000`

Using Node.js (with npx):
```bash
cd C:\Users\satya\OneDrive\Desktop\AMLTA
npx serve
```

Using PHP:
```bash
cd C:\Users\satya\OneDrive\Desktop\AMLTA
php -S localhost:8000
```

## 📁 Project Structure

```
AMLTA/
├── index.html          # Main HTML file with chat widget
├── styles.css          # All styling and animations
├── chatbot.js          # Chatbot logic and UI interactions
├── knowledge-base.js   # Intent definitions and responses
└── README.md           # This file
```

## 🎨 Customization

### Adding New Intents

Edit `knowledge-base.js` and add a new intent to the `intents` array:

```javascript
{
    id: "your_intent_id",
    name: "Intent Display Name",
    keywords: ["keyword1", "keyword2", "phrase"],
    response: "Your response text here with **bold** formatting"
}
```

### Modifying Responses

All responses are in `knowledge-base.js`. Simply edit the `response` field for any intent.

### Styling Changes

Edit `styles.css` to customize:
- Colors (search for `#667eea` and `#764ba2` for primary gradient)
- Fonts (change `font-family` in the `body` selector)
- Sizes (adjust `width` and `height` in `.chat-widget`)

### Quick Action Buttons

Edit the quick action buttons in `index.html`:

```html
<button class="quick-action-btn" data-intent="your_intent_id">
    🔥 Your Button Text
</button>
```

## 📊 Analytics

The chatbot tracks conversation metrics. Open the browser console and type:

```javascript
chatbot.getAnalytics()
```

This returns:
- Total messages sent
- Successfully resolved messages
- Resolution rate percentage
- Full conversation history

## 🎯 Key Performance Indicators (KPIs)

As per the PRD, the chatbot targets:

| Metric | Target | Current |
|--------|--------|---------|
| Resolution Rate | ≥25% | Tracked in console |
| Response Time | <1 second | ~0.8 seconds |
| Top Unanswered Questions | <3 new/month | Logged in history |

## 🔧 Configuration

### Fallback Settings

In `knowledge-base.js`, adjust:

```javascript
maxUnrecognizedAttempts: 2  // Number of failed attempts before fallback
fallbackMessage: "Your custom fallback message"
```

### Contact Information

Update all contact details in the `knowledge-base.js` responses:
- Email addresses
- Phone numbers
- Business hours
- Mailing addresses

## 🌐 Deployment

### Deploy to Web Hosting

1. Upload all files to your web server
2. Ensure files maintain the same directory structure
3. Update contact information in `knowledge-base.js`
4. Test the chatbot on your live site

### Embed in Existing Website

Copy the chat widget code from `index.html` (lines with `chat-widget` and `chat-toggle`) and paste into your website's HTML. Include the CSS and JS files:

```html
<link rel="stylesheet" href="path/to/styles.css">
<script src="path/to/knowledge-base.js"></script>
<script src="path/to/chatbot.js"></script>
```

## 🐛 Troubleshooting

**Chat widget doesn't appear:**
- Check browser console for errors
- Ensure all three files (HTML, CSS, JS) are in the same directory
- Verify JavaScript is enabled in your browser

**Intents not matching:**
- Check keyword spelling in `knowledge-base.js`
- Keywords are case-insensitive
- Add more keyword variations for better matching

**Styling issues:**
- Clear browser cache
- Check that `styles.css` is loading (Network tab in DevTools)
- Verify no CSS conflicts with existing site styles

## 📝 Future Enhancements

Potential improvements for future versions:
- Integration with live chat systems
- Database connection for order tracking
- Multi-language support
- Voice input/output
- Sentiment analysis
- Learning from unmatched queries

## 📄 License

This project is provided as-is for educational and commercial use.

## 🤝 Support

For questions or issues:
- Check the troubleshooting section
- Review the code comments
- Test with browser DevTools console open

## 🎓 Technical Details

- **No external dependencies**: Pure vanilla JavaScript
- **Browser compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **File size**: ~25KB total (uncompressed)
- **Performance**: Instant keyword matching, no API calls
- **Accessibility**: Keyboard navigation supported, ARIA labels included

---

**Built with ❤️ for excellent customer service**
