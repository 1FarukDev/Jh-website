import { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
  title: "Legal Information – Terms, Privacy & Refund Policy | JH Textiles",
  description:
    "Read the Terms and Conditions, Privacy Policy, and Refund Policy for JH Textiles. Stay informed about our legal and privacy practices.",
  alternates: {
    canonical: "https://jh-website-lime.vercel.app/legal",
  },
  openGraph: {
    title: "Legal Information – JH Textiles",
    description:
      "Explore the Terms and Conditions, Privacy Policy, and Refund Policy of JH Textiles.",
    url: "https://jh-website-lime.vercel.app/legal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Information – JH Textiles",
    description:
      "Explore the Terms and Conditions, Privacy Policy, and Refund Policy of JH Textiles.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Legal Information – JH Textiles",
      description:
        "Read the Terms and Conditions, Privacy Policy, and Refund Policy for JH Textiles.",
      url: "https://jh-website-lime.vercel.app/legal",
    }),
  },
};

const PolicyPage: React.FC = () => {
  const lastUpdated = "January 19, 2026";

  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-8 lg:px-16 text-slate-800 pt-30 font-satoshi" >
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b pb-8">
          <h1 className="text-4xl font-serif font-bold mb-4">Legal Information</h1>
          <p className="text-slate-500 italic">Last Updated: {lastUpdated}</p>
        </header>

        
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide border-l-4 border-black pl-4">
            Terms and Conditions
          </h2>
          
          <div className="space-y-6 leading-relaxed">
            <div>
              <h3 className="font-bold text-lg mb-2">1. Intellectual Property</h3>
              <p>
                All content on this Website, including images, text, artworks, graphics, and designs, 
                is the intellectual property of <strong>Jesudara Hinmikaiye</strong> operating under <strong>J.H textiles</strong>, unless otherwise stated. 
                You may not reproduce, distribute, or use any content without prior written permission.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">2. Use of Website</h3>
              <p>
                You agree to use this Website lawfully and respectfully. Any use that disrupts the Website, 
                violates another person’s rights, or transmits harmful content is strictly prohibited.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">3. Products and Orders</h3>
              <p>
                All prints design listed are subject to availability. Colors and textures may vary 
                slightly due to screen settings. We reserve the right 
                to refuse or cancel any order.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">4. Pricing</h3>
              <p>
                Prices are listed in Naira (₦) and are subject to change without notice. You are responsible 
                for taxes on international orders.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">5. Modifications</h3>
              <p>
                We may revise these Terms at any time. Updates will be posted on this page with an effective date. 
                Your continued use of the Website implies acceptance.
              </p>
            </div>
          </div>
        </section>

        
        <section className="mb-16 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide border-l-4 border-blue-600 pl-4 text-blue-900">
            Privacy Policy
          </h2>
          <div className="space-y-4 text-slate-700">
            <p>Your privacy is important to us. This policy describes how information is collected and used at <strong>www.jesudarahinmikaiye.com</strong>.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Information We Collect:</strong> Name, email, shipping address, and phone number (voluntary). We also collect cookies and site analytics.</li>
              <li><strong>Usage:</strong> Information is used to process orders, improve user experience, and send newsletters (if opted-in).</li>
              <li><strong>Third Parties:</strong> We do not sell or rent your data. We only share info with service providers (payment processors/shipping) necessary to fulfill orders.</li>
              <li><strong>Your Rights:</strong> You may request to access, update, or delete your data via email.</li>
            </ul>
          </div>
        </section>

        
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide border-l-4 border-red-500 pl-4">
            Refund Policy
          </h2>
          <p className="text-slate-700 leading-relaxed">
            We offer no refunds, however we do our utmost best to ensure our prints are to your satisfaction.
          </p>
        </section>

        
        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <p className="text-slate-600">
            For questions regarding our Terms, Privacy, or Refunds, please contact:
          </p>
        <div className="flex items-center gap-2">
        <a 
            href="mailto:jhtextiles@icloud.com" 
            className="inline-block mt-4 text-lg font-medium text-black underline underline-offset-4 hover:text-slate-600 transition-colors"
          >
            jhtextiles@icloud.com
          </a>
          <a 
            href="mailto:jhtextilesng@gmail.com" 
            className="inline-block mt-4 text-lg font-medium text-black underline underline-offset-4 hover:text-slate-600 transition-colors"
          >
            jhtextilesng@gmail.com
          </a>
        </div>
        </footer>
      </div>
    </div>
  );
};

export default PolicyPage;