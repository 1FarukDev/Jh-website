import { Metadata } from 'next';
import React from 'react';
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order Process & Licensing | JH Textiles",
  description:
    "Learn about our print selection process, file delivery formats, and commercial licensing at JH Textiles.",
  alternates: {
    canonical: absoluteUrl("/delivery"),
  },
};

const FulfillmentPage: React.FC = () => {
  const lastUpdated = "January 25, 2026";

  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-8 lg:px-16 text-slate-800 pt-30 font-satoshi">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b pb-8">
          <h1 className="text-4xl font-serif font-bold mb-4">Process & Licensing</h1>
          <p className="text-slate-500 italic">Effective as of: {lastUpdated}</p>
        </header>

        {/* Fulfillment Process Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide border-l-4 border-black pl-4">
            The Selection Process
          </h2>
          
          <div className="space-y-6 leading-relaxed">
            <p className="text-lg">
              After selecting your print, you&apos;ll receive scale options via
              email within <strong>24 hours</strong>.
            </p>
            
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h3 className="font-bold text-lg mb-2 text-black">Final Delivery</h3>
              <p className="text-slate-700">
                Once you confirm your choice, we&apos;ll deliver the high-resolution final file 
                <span className="font-semibold"> (300 DPI)</span> in the following formats:
              </p>
              <ul className="flex gap-4 mt-3 font-medium text-[#1C1B0B]">
                <li>• JPG</li>
                <li>• PDF</li>
                <li>• PNG</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide border-l-4 border-black pl-4">
            Licensing & Customization
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold mb-2">Exclusive Commercial License </h3>
              <p className="text-sm text-slate-600">
                All confirmed prints include a full commercial license for your business needs.
              </p>
            </div>
            
            <div className="border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold mb-2">Color Variants</h3>
              <p className="text-sm text-slate-600">
                Each print selected comes with <span className="text-black font-bold text-base">2 free color variants</span> to suit your collection.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-[#D4F8D4]/60 text-[#1C1B0B] rounded-lg text-sm italic">
            Note: Specialized file types (AI, PSD, TIFF) are available upon request for an additional fee.
          </div>
        </section>

        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-xl font-bold mb-4">Questions?</h2>
          <p className="text-slate-600">
            If you have specific file requirements or questions about licensing, please contact:
          </p>
          <a 
            href="mailto:jhtextiles@icloud.com" 
            className="inline-block mt-4 text-lg font-medium text-black underline underline-offset-4 hover:text-slate-600 transition-colors"
          >
            jhtextiles@icloud.com
          </a>
        </footer>
      </div>
    </div>
  );
};

export default FulfillmentPage;