# EmailJS Setup Guide for Arpit's Photography Portfolio

## 🚀 Complete Setup Instructions

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month free)
3. Verify your email address

### Step 2: Add Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (Recommended for prajapatiarpit704@gmail.com)
   - **Outlook**, **Yahoo**, or **Custom SMTP**
4. Follow the setup wizard and connect your email account
5. **Copy the Service ID** (you'll need this later)

### Step 3: Create Email Templates

#### Template 1: Client Thank You Email
1. Go to **Email Templates** → **Create New Template**
2. **Template Name**: `client_thank_you_template`
3. **Template ID**: Copy this ID for later use
4. **Subject**: `Thank you for your inquiry - Arpit Prajapati Photography`
5. **Content**: Copy the HTML from `/email-templates/client-thank-you-template.html`
6. Set **To Email**: `{{to_email}}`
7. **Test the template** with sample data

#### Template 2: Booking Request Email
1. Create another template: `booking_request_template`
2. **Subject**: `🔔 New Photography Booking Request from {{client_name}}`
3. **Content**: Copy the HTML from `/email-templates/booking-request-template.html`
4. Set **To Email**: `prajapatiarpit704@gmail.com`
5. **Test the template** with sample data

### Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** in the API Keys section
3. Copy this key for later use

### Step 5: Update Contact.jsx
Replace the placeholder values in `/src/components/Contact.jsx`:

```javascript
// Line 36 & 61: Replace with your EmailJS Service ID
'YOUR_SERVICE_ID' → 'service_xxxxxxx'

// Line 37: Replace with your client template ID
'client_thank_you_template' → 'template_xxxxxxx'

// Line 62: Replace with your booking template ID  
'booking_request_template' → 'template_xxxxxxx'

// Lines 39 & 64: Replace with your Public Key
'YOUR_PUBLIC_KEY' → 'your_public_key_here'
```

### Step 6: Initialize EmailJS (Optional)
For better performance, you can initialize EmailJS in your main App.jsx:

```javascript
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('YOUR_PUBLIC_KEY');
```

## 🎨 Email Template Features

### Client Thank You Email
- **Professional branding** with your portfolio colors
- **Responsive design** for all devices
- **Personal touch** with client's name and session details
- **Contact information** prominently displayed
- **Instagram and phone number** for easy follow-up
- **Film grain texture** matching your photography aesthetic

### Booking Request Email
- **Urgent notification style** for immediate attention
- **Client information** beautifully organized
- **Quick action buttons** for email and WhatsApp replies
- **Session details** and submission timestamp
- **Professional layout** with your brand colors

## 🔧 Testing Your Setup

### Test the Contact Form:
1. Run your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out the form with test data
4. Submit and check:
   - Toast notification appears
   - Client receives thank you email
   - You receive booking request email

### Troubleshooting:
- **401 Error**: Check your Public Key
- **Template not found**: Verify template IDs
- **Service error**: Ensure email service is properly connected
- **Rate limiting**: Free plan allows 100 emails/month

## 📧 Email Deliverability Tips

1. **SPF/DKIM Records**: EmailJS handles this automatically
2. **Avoid Spam Folders**: 
   - Use professional subject lines
   - Include unsubscribe options for marketing emails
3. **Monitor Usage**: Check your EmailJS dashboard regularly

## 🎯 Features Implemented

✅ **Dual Email System**: Both client and photographer receive emails  
✅ **Beautiful HTML Templates**: Match your portfolio's aesthetic  
✅ **Toast Notifications**: "We'll connect with you shortly" message  
✅ **Loading States**: Prevents multiple submissions  
✅ **Form Validation**: Required field checking  
✅ **Error Handling**: Graceful failure with user feedback  
✅ **Responsive Design**: Works on all devices  
✅ **Professional Branding**: Consistent with your portfolio theme  

## 🌟 Next Steps

1. **Complete EmailJS setup** using this guide
2. **Test thoroughly** with real email addresses
3. **Monitor email delivery** in your EmailJS dashboard
4. **Consider upgrading** to paid plan for higher limits if needed
5. **Add analytics** to track form submissions (optional)

## 📱 Contact Information Used

- **Email**: prajapatiarpit704@gmail.com
- **Phone**: +91 6352 461286  
- **Instagram**: @p_arpit4423

---

*Your contact form is now live and professional! Clients will receive beautiful thank you emails while you get detailed booking requests with all the information you need to respond promptly.*
