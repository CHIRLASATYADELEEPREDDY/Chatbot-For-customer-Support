/**
 * Knowledge Base for Customer Service Chatbot
 * Contains all intents, keywords, and responses
 */

const knowledgeBase = {
    // Welcome message shown when chat starts
    welcomeMessage: "Hello! 👋 I'm here to help with your questions. How can I assist you today?",
    
    // Fallback message when intent is not recognized
    fallbackMessage: "I apologize, but I don't understand that question. Would you like me to connect you with a support agent? You can also email us at support@example.com or call us at 1-800-SUPPORT.",
    
    // Maximum attempts before showing fallback
    maxUnrecognizedAttempts: 2,
    
    // Core intents with keywords and responses
    intents: [
        {
            id: "shipping",
            name: "Shipping Status",
            keywords: ["ship", "shipping", "delivery", "track", "tracking", "order status", "when will", "arrive", "package", "sent", "dispatch"],
            response: "📦 **Shipping Information:**\n\nStandard shipping takes 5-7 business days. Express shipping takes 2-3 business days.\n\nTo track your order:\n1. Check your email for the tracking number\n2. Visit our tracking page\n3. Enter your order number\n\nIf you haven't received a tracking number within 24 hours of ordering, please contact us at shipping@example.com"
        },
        {
            id: "return",
            name: "Return Policy",
            keywords: ["return", "refund", "exchange", "send back", "money back", "cancel order", "not satisfied", "defective", "damaged"],
            response: "↩️ **Return Policy:**\n\nWe offer a 30-day return policy for most items.\n\n**How to return:**\n1. Items must be unused and in original packaging\n2. Contact us at returns@example.com to initiate a return\n3. We'll send you a prepaid return label\n4. Refunds are processed within 5-7 business days after we receive your return\n\n**Non-returnable items:**\n- Personalized products\n- Sale items marked as final sale\n- Digital products"
        },
        {
            id: "password",
            name: "Password Reset",
            keywords: ["password", "reset password", "forgot password", "can't login", "cannot login", "login issue", "locked out", "change password"],
            response: "🔑 **Password Reset:**\n\nTo reset your password:\n1. Go to the login page\n2. Click 'Forgot Password?'\n3. Enter your email address\n4. Check your email for a reset link (check spam folder too)\n5. Click the link and create a new password\n\n**Tips:**\n- Reset links expire after 24 hours\n- Passwords must be at least 8 characters\n- Use a mix of letters, numbers, and symbols\n\nIf you don't receive the email, contact support@example.com"
        },
        {
            id: "contact",
            name: "Contact Information",
            keywords: ["contact", "phone", "email", "call", "reach", "support", "help", "talk to human", "speak to agent", "customer service"],
            response: "📞 **Contact Us:**\n\n**Email:** support@example.com\n**Phone:** 1-800-SUPPORT (1-800-787-7678)\n**Hours:** Monday-Friday, 9 AM - 6 PM EST\n\n**Live Chat:** Available on our website during business hours\n\n**Mailing Address:**\nCustomer Support\n123 Business Street\nCity, State 12345\n\nWe typically respond to emails within 24 hours on business days."
        },
        {
            id: "pricing",
            name: "Product Pricing",
            keywords: ["price", "cost", "how much", "pricing", "expensive", "cheap", "discount", "sale", "coupon", "promo code"],
            response: "💰 **Pricing Information:**\n\nOur prices vary by product. To see current pricing:\n1. Visit our website\n2. Browse our catalog\n3. Prices are displayed on each product page\n\n**Current Promotions:**\n- Sign up for our newsletter to get 10% off your first order\n- Free shipping on orders over $50\n- Check our Sales page for current discounts\n\n**Price Match:**\nWe offer price matching for identical items from authorized retailers. Contact us with details."
        },
        {
            id: "payment",
            name: "Payment Methods",
            keywords: ["payment", "pay", "credit card", "debit card", "paypal", "payment method", "accepted cards", "visa", "mastercard", "checkout"],
            response: "💳 **Payment Methods:**\n\nWe accept the following payment methods:\n- Visa, Mastercard, American Express, Discover\n- PayPal\n- Apple Pay\n- Google Pay\n- Shop Pay\n\n**Security:**\nAll transactions are encrypted and secure. We never store your full credit card information.\n\n**Payment Issues:**\nIf your payment is declined, please:\n1. Verify your card details\n2. Check with your bank\n3. Try a different payment method\n4. Contact us at billing@example.com"
        },
        {
            id: "account",
            name: "Account Management",
            keywords: ["account", "profile", "update info", "change email", "change address", "my account", "account settings", "personal info"],
            response: "👤 **Account Management:**\n\nTo manage your account:\n1. Log in to your account\n2. Click on 'My Account' or 'Profile'\n3. Update your information\n4. Click 'Save Changes'\n\n**You can update:**\n- Email address\n- Shipping address\n- Billing address\n- Password\n- Communication preferences\n\n**Delete Account:**\nTo delete your account, please contact privacy@example.com with your request."
        },
        {
            id: "warranty",
            name: "Warranty Information",
            keywords: ["warranty", "guarantee", "broken", "not working", "malfunction", "defect", "repair", "replacement"],
            response: "🛡️ **Warranty Information:**\n\nMost products come with a 1-year manufacturer's warranty covering defects in materials and workmanship.\n\n**Warranty Coverage:**\n- Manufacturing defects\n- Parts and labor\n- Replacement if repair is not possible\n\n**Not Covered:**\n- Normal wear and tear\n- Accidental damage\n- Misuse or abuse\n\n**To File a Claim:**\n1. Contact warranty@example.com\n2. Provide order number and photos\n3. We'll guide you through the process\n\nExtended warranties may be available at checkout."
        },
        {
            id: "hours",
            name: "Business Hours",
            keywords: ["hours", "open", "close", "when open", "business hours", "operating hours", "available", "schedule"],
            response: "🕐 **Business Hours:**\n\n**Customer Support:**\nMonday-Friday: 9:00 AM - 6:00 PM EST\nSaturday: 10:00 AM - 4:00 PM EST\nSunday: Closed\n\n**This Chatbot:**\nAvailable 24/7 for instant answers to common questions!\n\n**Holidays:**\nWe're closed on major holidays. Check our website for specific holiday hours.\n\n**Response Times:**\n- Chat: Instant (automated)\n- Email: Within 24 hours\n- Phone: Immediate during business hours"
        },
        {
            id: "international",
            name: "International Shipping",
            keywords: ["international", "worldwide", "global", "ship to", "country", "overseas", "abroad", "outside us", "canada", "europe"],
            response: "🌍 **International Shipping:**\n\nYes, we ship internationally to most countries!\n\n**Shipping Times:**\n- Canada: 7-10 business days\n- Europe: 10-15 business days\n- Asia/Pacific: 12-20 business days\n- Other regions: 15-25 business days\n\n**Important Notes:**\n- Customs fees and import duties are the customer's responsibility\n- International orders cannot be tracked in all regions\n- Some products may have shipping restrictions\n\n**Rates:**\nCalculated at checkout based on destination and weight.\n\nFor specific country inquiries, email international@example.com"
        }
    ]
};

// Export for use in chatbot.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = knowledgeBase;
}
