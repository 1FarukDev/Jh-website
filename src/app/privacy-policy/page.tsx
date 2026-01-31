import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 sm:px-12 lg:px-24 pt-30 font-satoshi">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: January 19, 2026</p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Your privacy is important to us. This Privacy Policy describes how information is collected, 
          used, and protected when you visit or make a purchase from 
          <span className="font-semibold"> www.jesudarahinmikaiye.com</span>.
        </p>

        <hr className="my-8 border-gray-200" />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><strong>Personal Information:</strong> Name, email address, shipping address, phone number (when provided voluntarily or during checkout).</li>
              <li><strong>Payment Information:</strong> Processed securely through third-party platforms (we do not store card details).</li>
              <li><strong>Usage Data:</strong> Cookies, browser information, and site analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>To process orders and send updates</li>
              <li>To improve user experience</li>
              <li>To send occasional newsletters or promotional content (if you opt-in)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Sharing Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We do not sell, rent, or share your personal information with third parties, except service providers who assist in fulfilling orders or running the website (e.g., payment processors, shipping companies).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to protect your information, but no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              You may request to access, update, or delete your personal data at any time by emailing us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              This site uses cookies to enhance user experience and collect analytics. You can control cookies through your browser settings.
            </p>
          </section>

          <section className="bg-blue-50 p-6 rounded-md">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">7. Contact Us</h2>
            <p className="text-blue-800">
              If you have questions about this policy, please reach out to us:
            </p>
            <p className="mt-2 font-medium text-blue-900">
              Email: <a href="mailto:jhtextiles@icloud.com" className="underline">jhtextiles@icloud.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;