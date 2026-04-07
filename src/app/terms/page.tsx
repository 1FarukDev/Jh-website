import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { absoluteUrl } from "@/lib/site";


export const metadata: Metadata = {
  title: "Legal Information – Terms, Privacy & Refund Policy | JH Textiles",
  description:
    "Read the Terms and Conditions, Privacy Policy, and Refund Policy for JH Textiles. Stay informed about our legal and privacy practices.",
  alternates: {
    canonical: absoluteUrl("/terms"),
  },
  openGraph: {
    title: "Legal Information – JH Textiles",
    description:
      "Explore the Terms and Conditions, Privacy Policy, and Refund Policy of JH Textiles.",
    url: absoluteUrl("/terms"),
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
      url: absoluteUrl("/terms"),
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

          <p className="text-slate-700 leading-relaxed mb-6">
            PLEASE READ THESE TERMS OF SERVICE CAREFULLY BEFORE USING THIS SITE
          </p>

          <div className="space-y-6 leading-relaxed">

            <div>
              <h3 className="font-bold text-lg mb-2">What's in these terms?</h3>
              <p className="text-slate-700 mb-3">
                These terms tell you the rules for using our website jesudarahinmikaiye.com (our site).
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li><a href="#who-we-are" className="underline underline-offset-2 hover:text-slate-500 transition-colors">Who we are and how to contact us</a>.</li>
                <li><a href="#accept-terms" className="underline underline-offset-2 hover:text-slate-500 transition-colors">By using our site you accept these terms</a>.</li>
                <li><a href="#other-terms" className="underline underline-offset-2 hover:text-slate-500 transition-colors">There are other terms that may apply to you</a>.</li>
                <li><a href="#changes-to-terms" className="underline underline-offset-2 hover:text-slate-500 transition-colors">We may make changes to these terms</a>.</li>
                <li><a href="#changes-to-site" className="underline underline-offset-2 hover:text-slate-500 transition-colors">We may make changes to our site</a>.</li>
                <li><a href="#suspend-withdraw" className="underline underline-offset-2 hover:text-slate-500 transition-colors">We may suspend or withdraw our site</a>.</li>
                <li><a href="#use-material" className="underline underline-offset-2 hover:text-slate-500 transition-colors">How you may use material on our site</a>.</li>
                <li><a href="#no-mining" className="underline underline-offset-2 hover:text-slate-500 transition-colors">No text or data mining, or web scraping</a>.</li>
                <li><a href="#linking" className="underline underline-offset-2 hover:text-slate-500 transition-colors">Rules about linking to our site</a>.</li>
                <li><a href="#not-responsible-links" className="underline underline-offset-2 hover:text-slate-500 transition-colors">We are not responsible for websites we link to</a>.</li>
                <li><a href="#not-responsible-viruses" className="underline underline-offset-2 hover:text-slate-500 transition-colors">We are not responsible for viruses</a>.</li>
                <li><a href="#no-viruses" className="underline underline-offset-2 hover:text-slate-500 transition-colors">You must not introduce viruses</a>.</li>
                <li><a href="#liability" className="underline underline-offset-2 hover:text-slate-500 transition-colors">Limitation of Liability</a>.</li>
                <li><a href="#governing-law" className="underline underline-offset-2 hover:text-slate-500 transition-colors">Which country's laws apply to any disputes</a>.</li>
              </ul>
            </div>

            <div id="who-we-are">
              <h3 className="font-bold text-lg mb-2">Who we are and how to contact us</h3>
              <p className="text-slate-700 mb-2">
                jesudarahinmikaiye.com is a site operated by Jesudara Hinmikaiye (Trading under the name and style of J.H Textiles) ("I", "me", "my"). J.H Textiles registered in Nigeria under RN 6888603.
              </p>
              <p className="text-slate-700">
                To contact us, please email <a href="mailto:jhtextiles@icloud.com" className="underline underline-offset-2 hover:text-slate-500 transition-colors">jhtextiles@icloud.com</a> or telephone +234 806 567 8901.
              </p>
            </div>

            <div id="accept-terms">
              <h3 className="font-bold text-lg mb-2">By using our site you accept these terms</h3>
              <p className="text-slate-700 mb-2">
                By using our site, you confirm that you accept these terms of service and that you agree to comply with them.
              </p>
              <p className="text-slate-700">
                If you do not agree to these terms, you must not use our site.
              </p>
            </div>

            <div id="other-terms">
              <h3 className="font-bold text-lg mb-2">There are other terms that may apply to you</h3>
              <p className="text-slate-700 mb-2">The following additional terms also apply to your use of our site:</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>Our <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-slate-500 transition-colors">Privacy Policy</Link>, which explains how we collect, use and store your personal data.</li>
                <li>Our <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-slate-500 transition-colors">Cookie Policy</Link>, which sets out information about the cookies on our site.</li>
              </ul>
              <p className="text-slate-700 mt-2">
                If you purchase a license for any of the designs published on our site, our Exclusive or Non-Exclusive License Agreement <Link href="/license" className="underline underline-offset-2 hover:text-slate-500 transition-colors">License Agreement</Link> will apply to the sale.
              </p>
            </div>

            <div id="changes-to-terms">
              <h3 className="font-bold text-lg mb-2">We may make changes to these terms</h3>
              <p className="text-slate-700">
                We amend these terms from time to time. Every time you wish to use our site, please check these terms to ensure you understand the terms that apply at that time. We will endeavor to highlight any significant or substantive changes to you where possible.
              </p>
            </div>

            <div id="changes-to-site">
              <h3 className="font-bold text-lg mb-2">We may make changes to our site</h3>
              <p className="text-slate-700">
                We may update and change our site from time to time to reflect changes to our products, our clients' needs and our business priorities.
              </p>
            </div>

            <div id="suspend-withdraw">
              <h3 className="font-bold text-lg mb-2">We may suspend or withdraw our site</h3>
              <p className="text-slate-700 mb-2">Our site is made available free of charge.</p>
              <p className="text-slate-700 mb-2">
                We do not guarantee that our site, or any content on it, will always be available or be uninterrupted. We may suspend or withdraw or restrict the availability of all or any part of our site for business and operational reasons. We will try to give you reasonable notice of any suspension or withdrawal.
              </p>
              <p className="text-slate-700">
                You are also responsible for ensuring that all persons who access our site through your internet connection are aware of these terms of service and other applicable terms of service, and that they comply with them.
              </p>
            </div>

            <div id="use-material">
              <h3 className="font-bold text-lg mb-2">How you may use material on our site</h3>
              <p className="text-slate-700 mb-2">
                We are the owner or the licensee of all intellectual property rights in our site, and in the material published on it, including but not limited to the prints, and designs published on it. Those works are protected by copyright laws and treaties around the world. All such rights are reserved.
              </p>
              <p className="text-slate-700 mb-2">
                You must not print off, copy or download extracts of any page(s) from our site for any use whatsoever, except and unless you have purchased a license from us to do so.
              </p>
              <p className="text-slate-700">
                If you print off, copy, download, share or repost any part of our site in breach of these terms of service, your right to use our site will cease immediately and you must, at our option, return or destroy any copies of the materials you have made.
              </p>
            </div>

            <div id="no-mining">
              <h3 className="font-bold text-lg mb-2">No text or data mining, or web scraping</h3>
              <p className="text-slate-700 mb-2">
                You shall not conduct, facilitate, authorise or permit any text or data mining or web scraping in relation to our site or any goods or services provided via, or in relation to, our site for any purpose, including the development, training, fine-tuning or validation of AI systems or models. This includes using (or permitting, authorising or attempting the use of):
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-2">
                <li>Any "robot", "bot", "spider", "scraper" or other automated device, program, tool, algorithm, code, process or methodology to access, obtain, copy, monitor or republish any portion of our site or any data, content, information, or services accessed via the same.</li>
                <li>Any automated analytical technique aimed at analysing text and data in digital form to generate information or develop, train, fine-tune or validate AI systems or models which includes but is not limited to patterns, trends and correlations.</li>
              </ul>
              <p className="text-slate-700 mb-2">
                You shall not use, and we do not consent to the use of, our site, or any data published by, or contained in, or accessible via, our site or any services provided via, or in relation to, our site for the purposes of developing, training, fine-tuning or validating any AI system or model or for any other purposes not explicitly set out in this terms of service.
              </p>
              <p className="text-slate-700">
                You shall not use, and we do not consent to the use of, our patterns, designs, or any related content published on our site ("Content") for the purposes of developing, training, fine-tuning, or validating any AI systems or models, including but not limited to inputting the Content into any machine learning models or artificial intelligence technologies to create variations or derivatives. Any such unauthorized use is strictly prohibited.
              </p>
            </div>

            <div id="linking">
              <h3 className="font-bold text-lg mb-2">Rules about linking to our site</h3>
              <p className="text-slate-700 mb-2">
                You may link to our home page, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it.
              </p>
              <p className="text-slate-700 mb-2">
                You must not establish a link in such a way as to suggest any form of association, approval or endorsement on our part where none exists.
              </p>
              <p className="text-slate-700 mb-2">
                You must not establish a link to our site in any website that is not owned by you.
              </p>
              <p className="text-slate-700 mb-2">
                Our site must not be framed on any other site, nor may you create a link to any part of our site other than the home page.
              </p>
              <p className="text-slate-700 mb-2">
                We reserve the right to withdraw linking permission without notice.
              </p>
              <p className="text-slate-700">
                If you wish to link to or make any use of content on our site other than that set out above, please contact <a href="mailto:jhtextiles@icloud.com" className="underline underline-offset-2 hover:text-slate-500 transition-colors">jhtextiles@icloud.com</a>.
              </p>
            </div>

            <div id="not-responsible-links">
              <h3 className="font-bold text-lg mb-2">We are not responsible for websites we link to</h3>
              <p className="text-slate-700 mb-2">
                Where our site contains links to other sites and resources provided by third parties, these links are provided for your information only. Such links should not be interpreted as approval by us of those linked websites or information you may obtain from them.
              </p>
              <p className="text-slate-700">
                We have no control over the contents of those sites or resources.
              </p>
            </div>

            <div id="not-responsible-viruses">
              <h3 className="font-bold text-lg mb-2">We are not responsible for viruses</h3>
              <p className="text-slate-700 mb-2">
                We do not guarantee that our site will be secure or free from bugs or viruses.
              </p>
              <p className="text-slate-700">
                You are responsible for configuring your information technology, computer programs and platform to access our site. You should use your own virus protection software.
              </p>
            </div>

            <div id="no-viruses">
              <h3 className="font-bold text-lg mb-2">You must not introduce viruses</h3>
              <p className="text-slate-700">
                You must not misuse our site by knowingly introducing viruses, trojans, worms, logic bombs or other material that is malicious or technologically harmful, or otherwise harmfully interacting with our site or any part of it. You must not attempt to gain unauthorised access to our site, the server on which our site is stored or any server, computer or database connected to our site or any other equipment or network connected with our site. You must not interfere with, damage or disrupt any software used in the provision of our site or any equipment or network or software owned or used by any third party on which this site relies in any way. You must not attack our site via a denial-of-service attack or a distributed denial-of-service attack. By breaching this provision, you would commit a criminal offence under the Cybercrimes (Prohibition, Prevention, etc.) Act, 2015. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use our site will cease immediately.
              </p>
            </div>

            <div id="liability">
              <h3 className="font-bold text-lg mb-2">Limitation of Liability</h3>
              <p className="text-slate-700 mb-2">
                By using our site you agree and accept that we are not legally responsible for any loss or damage you might suffer related to your use of the site, whether from errors or from omissions in our documents or information, any goods or services we may offer or from any other use of the website. This includes your use or reliance on any third-party content, links, comments or advertisements. Your use of, or reliance on, any information or materials on this website is entirely at your own risk, for which we shall not be liable.
              </p>
              <p className="text-slate-700">
                It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific, personal requirements. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
              </p>
            </div>

            <div id="governing-law">
              <h3 className="font-bold text-lg mb-2">Which country's laws apply to any disputes?</h3>
              <p className="text-slate-700">
                Please note that these terms of service, their subject matter and their formation, are governed by the laws of the Federal Republic of Nigeria. We both agree to the exclusive jurisdiction of the courts of Nigeria.
              </p>
            </div>

          </div>
        </section>

        
        <section className="mb-16 bg-slate-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide border-l-4 border-[#1C1B0B] pl-4 text-[#1C1B0B]">
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