from flask import Flask, request, jsonify, send_file
from datetime import datetime
import os

app = Flask(__name__)

class KnowledgeBase:
    def __init__(self):
        self.welcome_message = "Hello! 👋 I'm here to help with your questions. How can I assist you today?"
        self.intents = [
            {"id": "shipping", "name": "Shipping Status", "keywords": ["ship", "shipping", "delivery", "track", "tracking", "order status", "when will", "arrive", "package", "sent", "dispatch"], "response": "📦 **Shipping Information:**\n\nStandard shipping takes 5-7 business days. Express shipping takes 2-3 business days.\n\nTo track your order:\n1. Check your email for the tracking number\n2. Visit our tracking page\n3. Enter your order number\n\nIf you haven't received a tracking number within 24 hours of ordering, please contact us at shipping@example.com"},
            {"id": "return", "name": "Return Policy", "keywords": ["return", "refund", "exchange", "send back", "money back", "cancel order", "not satisfied", "defective", "damaged"], "response": "↩️ **Return Policy:**\n\nWe offer a 30-day return policy for most items.\n\n**How to return:**\n1. Items must be unused and in original packaging\n2. Contact us at returns@example.com to initiate a return\n3. We'll send you a prepaid return label\n4. Refunds are processed within 5-7 business days after we receive your return\n\n**Non-returnable items:**\n- Personalized products\n- Sale items marked as final sale\n- Digital products"},
            {"id": "password", "name": "Password Reset", "keywords": ["password", "reset password", "forgot password", "can't login", "cannot login", "login issue", "locked out", "change password"], "response": "🔑 **Password Reset:**\n\nTo reset your password:\n1. Go to the login page\n2. Click 'Forgot Password?'\n3. Enter your email address\n4. Check your email for a reset link (check spam folder too)\n5. Click the link and create a new password\n\n**Tips:**\n- Reset links expire after 24 hours\n- Passwords must be at least 8 characters\n- Use a mix of letters, numbers, and symbols\n\nIf you don't receive the email, contact support@example.com"},
            {"id": "contact", "name": "Contact Information", "keywords": ["contact", "phone", "email", "call", "reach", "support", "help", "talk to human", "speak to agent", "customer service"], "response": "📞 **Contact Us:**\n\n**Email:** support@example.com\n**Phone:** 1-800-SUPPORT (1-800-787-7678)\n**Hours:** Monday-Friday, 9 AM - 6 PM EST\n\n**Live Chat:** Available on our website during business hours\n\n**Mailing Address:**\nCustomer Support\n123 Business Street\nCity, State 12345\n\nWe typically respond to emails within 24 hours on business days."},
            {"id": "pricing", "name": "Product Pricing", "keywords": ["price", "cost", "how much", "pricing", "expensive", "cheap", "discount", "sale", "coupon", "promo code"], "response": "💰 **Pricing Information:**\n\nOur prices vary by product. To see current pricing:\n1. Visit our website\n2. Browse our catalog\n3. Prices are displayed on each product page\n\n**Current Promotions:**\n- Sign up for our newsletter to get 10% off your first order\n- Free shipping on orders over $50\n- Check our Sales page for current discounts\n\n**Price Match:**\nWe offer price matching for identical items from authorized retailers. Contact us with details."},
            {"id": "payment", "name": "Payment Methods", "keywords": ["payment", "pay", "credit card", "debit card", "paypal", "payment method", "accepted cards", "visa", "mastercard", "checkout"], "response": "💳 **Payment Methods:**\n\nWe accept the following payment methods:\n- Visa, Mastercard, American Express, Discover\n- PayPal\n- Apple Pay\n- Google Pay\n- Shop Pay\n\n**Security:**\nAll transactions are encrypted and secure. We never store your full credit card information.\n\n**Payment Issues:**\nIf your payment is declined, please:\n1. Verify your card details\n2. Check with your bank\n3. Try a different payment method\n4. Contact us at billing@example.com"},
            {"id": "order_status", "name": "Order Status", "keywords": ["order status", "my order", "where is my order", "order update", "order progress", "order information", "check order", "view order"], "response": "📋 **Check Your Order Status:**\n\nTo view your order status:\n1. Log in to your account\n2. Go to 'My Orders' or 'Order History'\n3. Click on the order number to see details\n\n**Order Status Meanings:**\n- **Processing**: We're preparing your order\n- **Shipped**: Your order is on the way\n- **Delivered**: Order has been delivered\n- **Pending**: Awaiting payment confirmation\n\n**Need Help?**\nEmail orders@example.com with your order number for assistance."},
            {"id": "place_order", "name": "Place an Order", "keywords": ["place order", "how to order", "make order", "buy", "purchase", "ordering process", "place an order", "how do i order"], "response": "🛒 **How to Place an Order:**\n\n**Step-by-Step:**\n1. Browse our products and add items to cart\n2. Click the shopping cart icon\n3. Review your items and quantities\n4. Click 'Proceed to Checkout'\n5. Enter shipping information\n6. Select payment method\n7. Review and confirm your order\n8. You'll receive a confirmation email\n\n**Tips:**\n- Create an account for faster checkout\n- Save items to wishlist for later\n- Apply promo codes before payment\n\nNeed help? Contact support@example.com"},
            {"id": "cancel_order", "name": "Cancel Order", "keywords": ["cancel order", "cancel my order", "stop order", "order cancellation", "cancel purchase", "dont want order", "cancel it"], "response": "❌ **Cancel Your Order:**\n\n**Before Shipping:**\nIf your order hasn't shipped yet, you can cancel it:\n1. Log in to your account\n2. Go to 'My Orders'\n3. Find the order and click 'Cancel Order'\n4. Confirm cancellation\n5. Refund will be processed within 3-5 business days\n\n**After Shipping:**\nOnce shipped, you cannot cancel but you can:\n- Refuse delivery (it will return to us)\n- Return the item after receiving it\n\n**Need Help?**\nContact orders@example.com with your order number immediately."},
            {"id": "modify_order", "name": "Modify Order", "keywords": ["modify order", "change order", "edit order", "update order", "change address", "change shipping", "add item", "remove item"], "response": "✏️ **Modify Your Order:**\n\n**Before Processing:**\nIf your order status is still 'Pending' or 'Processing':\n1. Contact us immediately at orders@example.com\n2. Include your order number\n3. Specify what you want to change\n\n**What Can Be Changed:**\n- Shipping address (before shipment)\n- Shipping method (before shipment)\n- Add/remove items (within 1 hour of ordering)\n- Payment method (before processing)\n\n**After Shipping:**\nOnce shipped, modifications are not possible. You may need to:\n- Return items and place a new order\n- Refuse delivery if address is incorrect\n\n**Quick Response:**\nWe respond to modification requests within 1-2 hours during business hours."},
            {"id": "order_history", "name": "Order History", "keywords": ["order history", "past orders", "previous orders", "my orders", "order list", "all orders", "see my orders"], "response": "📜 **View Your Order History:**\n\n**Access Your Orders:**\n1. Log in to your account\n2. Click on 'My Account' or your profile icon\n3. Select 'Order History' or 'My Orders'\n4. View all past and current orders\n\n**What You Can See:**\n- Order numbers and dates\n- Items purchased\n- Order status\n- Tracking information\n- Invoice and receipts\n- Reorder options\n\n**Download Invoices:**\nClick on any order to download invoice or receipt\n\n**Need older orders?**\nContact support@example.com for orders older than 2 years."},
            {"id": "reorder", "name": "Reorder Items", "keywords": ["reorder", "order again", "buy again", "repeat order", "same order", "reorder items"], "response": "🔄 **Reorder Previous Items:**\n\n**Quick Reorder:**\n1. Log in to your account\n2. Go to 'Order History'\n3. Find the order you want to repeat\n4. Click 'Reorder' or 'Buy Again'\n5. Items will be added to your cart\n6. Review and proceed to checkout\n\n**Benefits:**\n- Saves time - no need to search for items\n- Same products you loved before\n- Quick checkout process\n\n**Note:**\n- Prices may have changed since last order\n- Check item availability before checkout\n- Previous discounts may not apply\n\nNeed help? Contact orders@example.com"},
            {"id": "order_confirmation", "name": "Order Confirmation", "keywords": ["order confirmation", "confirmation email", "didnt get confirmation", "no confirmation", "order receipt", "confirmation number"], "response": "📧 **Order Confirmation:**\n\n**What to Expect:**\nYou should receive a confirmation email within 5-10 minutes of placing your order.\n\n**Email Contains:**\n- Order number\n- Items ordered\n- Shipping address\n- Payment summary\n- Estimated delivery date\n\n**Didn't Receive It?**\n1. Check your spam/junk folder\n2. Verify email address in your account\n3. Check 'Promotions' or 'Updates' tab (Gmail)\n4. Wait 30 minutes and check again\n\n**Still Missing?**\n- Log in to view order in 'My Orders'\n- Contact support@example.com with order details\n- We can resend confirmation email\n\n**Check Order Status:**\nYou can always view orders in your account without the email."},
            {"id": "bulk_order", "name": "Bulk Orders", "keywords": ["bulk order", "wholesale", "large order", "bulk purchase", "quantity discount", "business order", "corporate order"], "response": "📦 **Bulk & Wholesale Orders:**\n\n**Large Quantity Orders:**\nWe offer special pricing for bulk purchases!\n\n**Minimum Quantities:**\n- 50+ units: 10% discount\n- 100+ units: 15% discount\n- 500+ units: 20% discount\n- Custom quotes for 1000+ units\n\n**How to Order:**\n1. Email wholesale@example.com\n2. Include:\n   - Product names/SKUs\n   - Quantities needed\n   - Delivery timeline\n   - Company information\n3. We'll provide a custom quote within 24 hours\n\n**Benefits:**\n- Volume discounts\n- Dedicated account manager\n- Flexible payment terms\n- Priority shipping\n\n**Business Account:**\nCreate a business account for easier bulk ordering and invoicing."},
            {"id": "order_invoice", "name": "Order Invoice", "keywords": ["invoice", "receipt", "order receipt", "billing statement", "tax invoice", "need invoice", "download invoice"], "response": "🧾 **Order Invoice & Receipt:**\n\n**Download Your Invoice:**\n1. Log in to your account\n2. Go to 'Order History'\n3. Click on the specific order\n4. Click 'Download Invoice' or 'View Receipt'\n5. Save or print the PDF\n\n**Invoice Includes:**\n- Order number and date\n- Itemized list with prices\n- Taxes and fees\n- Payment method\n- Shipping address\n- Company tax ID (if applicable)\n\n**Need a Copy?**\n- Invoices are emailed with order confirmation\n- Check your email for PDF attachment\n- Contact billing@example.com to request a copy\n\n**Business Invoices:**\nFor company purchases, we can customize invoices with your business details."},
            {"id": "order_problem", "name": "Order Problems", "keywords": ["order problem", "wrong order", "missing item", "incorrect order", "order issue", "order error", "wrong item", "damaged order"], "response": "⚠️ **Order Problems & Issues:**\n\n**Common Issues:**\n\n**Wrong Item Received:**\n1. Contact us immediately at support@example.com\n2. Include order number and photos\n3. We'll send correct item and prepaid return label\n4. No charge for our mistake\n\n**Missing Items:**\n1. Check all packaging carefully\n2. Contact support@example.com within 48 hours\n3. We'll investigate and ship missing items\n\n**Damaged Items:**\n1. Take photos of damage and packaging\n2. Email support@example.com with photos\n3. We'll arrange replacement or refund\n4. Keep damaged items until resolved\n\n**Order Never Arrived:**\n1. Check tracking information\n2. Verify delivery address\n3. Check with neighbors/building manager\n4. Contact us after expected delivery date\n\n**We're Here to Help:**\nAll order issues are resolved within 24-48 hours. Your satisfaction is our priority!"}
        ]
    
    def match_intent(self, message):
        message_lower = message.lower()
        best_match = None
        highest_score = 0
        for intent in self.intents:
            score = sum(len(kw) for kw in intent["keywords"] if kw.lower() in message_lower)
            if score > highest_score:
                highest_score = score
                best_match = intent
        return best_match if highest_score > 0 else None

kb = KnowledgeBase()
conversation_history = []

@app.route('/')
def index():
    html = open('index.html', 'r', encoding='utf-8').read()
    return html

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '').strip()
    if not user_message:
        return jsonify({'error': 'Message cannot be empty'}), 400
    matched_intent = kb.match_intent(user_message)
    if matched_intent:
        response = matched_intent['response']
        intent_id = matched_intent['id']
    else:
        response = "I'm not sure I understand. Could you rephrase that or try one of the quick action buttons below?"
        intent_id = None
    conversation_history.append({'timestamp': datetime.now().isoformat(), 'user_message': user_message, 'bot_response': response, 'intent_id': intent_id})
    return jsonify({'response': response, 'intent_id': intent_id})

@app.route('/api/quick-action/<intent_id>', methods=['GET'])
def quick_action(intent_id):
    intent = next((i for i in kb.intents if i['id'] == intent_id), None)
    if intent:
        return jsonify({'response': intent['response'], 'intent_name': intent['name']})
    else:
        return jsonify({'error': 'Intent not found'}), 404

@app.route('/api/welcome', methods=['GET'])
def welcome():
    return jsonify({'message': kb.welcome_message})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
