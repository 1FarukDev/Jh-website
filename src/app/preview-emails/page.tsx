"use client";

import { useState, useEffect } from "react";
import { render } from "@react-email/render";

// Import your email templates
import OrderConfirmation from "@/emails/order-confirmation";
import WelcomeEmail from "@/emails/welcome-email";
import NewsLetter from "@/emails/news-letter";
import OrderStatus from "@/emails/order-status";
import PasswordReset from "@/emails/password-reset";
import PaymentConfirmation from "@/emails/payment-confirmation";
import Consultation from "@/emails/consultation";
import ContactForm from "@/emails/contact-form";

const emailTemplates = {
  "Order Confirmation": OrderConfirmation,
  "Welcome Email": WelcomeEmail,
  "Newsletter": NewsLetter,
  "Order Status": OrderStatus,
  "Password Reset": PasswordReset,
  "Payment Confirmation": PaymentConfirmation,
  "Consultation": Consultation,
  "Contact Form": ContactForm,
};

export default function EmailPreviewPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("Order Confirmation");
  const [renderedHtml, setRenderedHtml] = useState<string>("");

  const renderEmail = () => {
    const Template = emailTemplates[selectedTemplate as keyof typeof emailTemplates];
    
    // Pass appropriate props based on template with proper types
    let props: any = {};
    
    if (selectedTemplate === "Order Confirmation") {
      props = {
        customerName: "John Doe",
        orderId: "ORD-12345",
        orderDate: new Date().toLocaleDateString(),
        total: "₦550,000",
        items: [
          { 
            name: "Floral Print Pattern", 
            quantity: 1, 
            price: 150000, 
            image: "/assets/png/print.png",
            color: "Blue",
            size: "Standard"
          },
          { 
            name: "Abstract Design", 
            quantity: 2, 
            price: 200000,
            color: "Red",
            size: "Large"
          },
        ],
        shippingAddress: "123 Fashion Street, Lagos, Nigeria",
      };
    } else if (selectedTemplate === "Welcome Email") {
      props = {
        firstName: "John",
        email: "john@example.com",
      };
    } else if (selectedTemplate === "Password Reset") {
      props = {
        firstName: "John",
        resetLink: "https://example.com/reset-password?token=abc123",
      };
    } else if (selectedTemplate === "Payment Confirmation") {
      props = {
        customerName: "John Doe",
        amount: "₦550,000",
        transactionId: "TXN-12345",
        paymentMethod: "Card",
      };
    } else if (selectedTemplate === "Order Status") {
      props = {
        customerName: "John Doe",
        orderId: "ORD-12345",
        status: "Shipped",
        trackingNumber: "TRK-12345",
      };
    } else if (selectedTemplate === "Newsletter") {
      props = {
        previewText: "Check out our latest textile patterns",
        heading: "New Collection Available",
      };
    } else if (selectedTemplate === "Consultation") {
      props = {
        customerName: "John Doe",
        consultationDate: new Date().toLocaleDateString(),
        consultationType: "Design Consultation",
      };
    } else if (selectedTemplate === "Contact Form") {
      props = {
        name: "John Doe",
        email: "john@example.com",
        message: "I'd like to inquire about custom prints.",
      };
    }

    return <Template {...props} />;
  };

  // Render email whenever template changes
  useEffect(() => {
    const renderAsync = async () => {
      const html = await render(renderEmail());
      setRenderedHtml(html);
    };
    renderAsync();
  }, [selectedTemplate]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Email Template Preview</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(emailTemplates).map((name) => (
            <button
              key={name}
              onClick={() => setSelectedTemplate(name)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                selectedTemplate === name
                  ? "bg-[#8A8635] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedTemplate}
            </h2>
          </div>
          <div className="p-6">
            {renderedHtml ? (
              <iframe
                srcDoc={renderedHtml}
                className="w-full h-[800px] border border-gray-200 rounded"
                title={`Preview of ${selectedTemplate}`}
              />
            ) : (
              <div className="flex items-center justify-center h-[800px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8A8635] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading preview...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}