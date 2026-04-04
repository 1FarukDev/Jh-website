'use client'


import { useState } from "react";

const exclusiveSections = [
    {
        number: "1",
        title: "Definitions",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">"Design"</span> means the specific surface pattern selected for licence.</p>
                <p><span className="font-semibold text-gray-900">"Effective Date"</span> means the date on which the Licensee pays the License Fee.</p>
                <p><span className="font-semibold text-gray-900">"Field of Use"</span> means the specific commercial application selected by the Licensee at checkout and confirmed in the Order Confirmation email/invoice, or two-dimensional surface pattern application to textiles and apparel only.</p>
                <p><span className="font-semibold text-gray-900">"Intellectual Property Rights"</span> means patents, rights to inventions, copyright, trademarks, business names and domain names, rights in get-up, goodwill and the right to sue for passing off, rights in designs, database rights, rights to use and protect the confidentiality of confidential information (including know-how and trade secrets), and all other intellectual property rights, in each case whether registered or unregistered and including all applications and rights to apply for and be granted, renewals or extensions of, and rights to claim priority from, such rights and all similar or equivalent rights or forms of protection which subsist or will subsist now or in the future in any part of the world.</p>
                <p><span className="font-semibold text-gray-900">"Licence Fee"</span> means the amount paid at purchase.</p>
            </div>
        ),
    },
    {
        number: "2",
        title: "Formation and Electronic Acceptance",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> This Agreement is concluded electronically and becomes binding when the Licensee: (a) affirmatively accepts these Terms, and (b) completes payment.</p>
                <p><span className="font-semibold text-gray-900">b.</span> No rights under this Agreement shall be granted to the Licensee until the steps in 2(a) above are completed.</p>
            </div>
        ),
    },
    {
        number: "3",
        title: "Grant of License, Term & Scope",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> Subject to your payment of the License Fee and compliance with this Agreement, the Licensor hereby grants to you an <span className="font-semibold text-gray-900">exclusive, non-transferable, non-sublicensable, worldwide, perpetual license</span> to use the Design only for the Field of Use.</p>
                <p><span className="font-semibold text-gray-900">b.</span> The License is strictly limited to use as a two-dimensional surface decoration and does not include any right to use the Design as a trademark, logo, brand identifier, standalone artwork, digital asset, template, or for any purpose outside the Field of Use.</p>
            </div>
        ),
    },
    {
        number: "4",
        title: "Licensor's Obligations and Rights",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span>The Licensor shall, within 24 hours of receiving the License Fee, send a downloadable file containing an image of the Design (“Image”) to the email address provided by the Licensee at checkout. The Licensor shall send the Image in JPEG, PDF, PNG, or other standard format, at a resolution that the Licensor determines will be suitable for the Licensee’s intended use. </p>
                <p><span className="font-semibold text-gray-900">b.</span> In the event that the resolution of the Image contained in the file is not suitable for your use, you shall notify the Licensor within 3 (three) business days of receipt of the file. In this event, the Licensor’s only obligation will be to provide Licensee with another copy of the Image in a suitable resolution, but in no event, will the Licensor be liable for poor reproduction quality, delays, or any consequential damages.</p>
                <p><span className="font-semibold text-gray-900">c.</span> The Licensor expressly retains all rights in, or in relation to the Design that are not expressly granted to the Licensee under this Agreement (“Reserved Rights”) for her own and third-party exploitation. It is understood that the Licensor retains the right use the Design for marketing and promotional purposes.</p>
            </div>
        ),
    },
    {
        number: "5",
        title: "Licensee's Obligations and Rights",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> The Licensee has the right to use the Design in accordance with this Agreement.</p>
                <p><span className="font-semibold text-gray-900">b.</span> The Licensee shall comply with all applicable laws in performing its obligations and exercising its rights under this Agreement.</p>
                <p><span className="font-semibold text-gray-900">c.</span> The Licensee shall not change, amend, alter, modify, adapt or create derivative works from the Design without the Licensor’s prior written consent. Where you require a modification of the Design, you may contact the Licensor to modify the Design for an additional fee, which will be determined by the Licensor.
                </p>
                <p><span className="font-semibold text-gray-900">d.</span>The Licensee shall not use the Design in any way that is or renders the Design obscene, defamatory or in breach of the privacy or any other rights of a third party or of any law in any territory in which the Design is used.</p>
            </div>
        ),
    },
    {
        number: "6",
        title: "Artificial Intelligence Restrictions",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span>The Licensee shall not, and shall not permit any third party to, upload, input, submit, transfer, or otherwise make the Design available to any artificial intelligence, machine learning, generative AI, algorithmic training system, or similar technology for the purpose of modifying, adapting, generating derivative works from, analyzing, reverse engineering, or otherwise altering the Design.</p>
                <p><span className="font-semibold text-gray-900">b.</span>The Licensee agrees that the Design shall not be used, in whole or in part, for the training, fine-tuning, development, or improvement of any artificial intelligence or machine learning models, systems, or datasets, whether commercial or non-commercial.</p>
                <p><span className="font-semibold text-gray-900">c.</span>Any use of the Design in violation of this clause shall constitute a material breach of this Agreement, entitling the Licensor to immediate termination of the License, injunctive relief, and any other remedies available at law or in equity.</p>
            </div>
        ),
    },
    {
        number: "7",
        title: "Intellectual Property Rights",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> All Intellectual Property and Intellectual Property Rights in respect of the Design shall remain the sole and exclusive property of the Licensor and the Licensor shall have the right to exploit such retained rights.</p>
                <p><span className="font-semibold text-gray-900">b.</span>The Licensee acknowledges that all right, title, and interest in and to the Design, including all intellectual property rights therein (subject only to the rights expressly licensed under this Agreement), are and shall remain vested in the Licensor.</p>
                <p><span className="font-semibold text-gray-900">c.</span> The Licensee shall not: (i) apply for, register, or attempt to register the Design, or any design, mark, artwork, or element derived from or confusingly similar to the Design, as a trademark, design right, copyright, or other intellectual property right in any jurisdiction in the Licensee’s own name or in the name of any third party;(ii) claim ownership of, or assert any proprietary interest in, the Design or any intellectual property rights therein, except as expressly granted under this Agreement; or (iii) take any action, or omit to take any action, that would infringe, impair, encumber, dilute, misappropriate, or otherwise adversely affect the Licensor’s intellectual property rights in the Design.</p>
                <p><span className="font-semibold text-gray-900">d.</span>The Licensee further agrees not to challenge, oppose, or assist any third party in challenging or opposing the validity, ownership, or enforceability of the Licensor’s intellectual property rights in the Design.
                </p>
                <p><span className="font-semibold text-gray-900">e.</span>In the event the Licensee files or obtains any registration in breach of this clause, the Licensee shall promptly assign such registration and all associated rights to the Licensor at no cost and execute all documents necessary to give effect to such assignment.</p>
            </div>
        ),
    },
    {
        number: "8",
        title: "Warranties, Representations & Indemnity",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span>Each Party warrants to the other that it has full power and authority to enter into and perform its obligations under this Agreement.</p>
                <p><span className="font-semibold text-gray-900">b.</span> You hereby warrant that: (i) the information you have provided in your order is accurate and complete; and (ii) you will be able to accept delivery of the Design.</p>
                <p><span className="font-semibold text-gray-900">c.</span>The Licensor hereby warrants and represents that:
                    (i) she is the creator and owner of the Design;
                    (ii) the Design has not been previously exclusively licensed to any other person;
                    (iii) the Design does not infringe any copyright or other legal rights of a third party; and
                    (iv) the Design does not contain any unlawful material. </p>
                <p><span className="font-semibold text-gray-900">d.</span>The Licensee agrees not to sell, assign or sub-license the Design or any of their rights under this Agreement to any third party without the Licensor’s express agreement.</p>
                <p><span className="font-semibold text-gray-900">e.</span>The Licensee hereby warrants that its use of the Design:
                    (i) will not infringe any third party's Intellectual Property Rights;
                    (ii) will not be defamatory, libelous, obscene, or otherwise unlawful; and
                    (iii) will not violate any applicable law, legislation or subordinate legislation;
                </p>
                <p><span className="font-semibold text-gray-900">f.</span>Each Party agrees to indemnify the other Party for any loss, liabilities, damages, expenses and claims incurred by the Party arising out of the other Party’s negligence, failure to comply with laws applicable to performance of this Agreement, breach of its obligations, warranties and representations. </p>
            </div>
        ),
    },
    {
        number: "9",
        title: "Limitation of Liability",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span>To the fullest extent permitted by applicable law, the Licensor shall not be liable to the Licensee for any: (i) indirect, incidental, special, punitive or consequential loss or damage; (ii) loss of profit; (iii) loss of sales or revenue; (iv) loss of business opportunity; (v) loss of anticipated savings; (vi) loss of goodwill; (vii) loss or corruption of data; (viii) business interruption; or (ix) costs of procuring substitute goods or services, arising out of or in connection with this Agreement or the use of the Design.</p>
                <p><span className="font-semibold text-gray-900">b.</span>Subject to Clause 9(a), the Licensor’s total aggregate liability to the Licensee arising out of or in connection with this Agreement, whether in contract, tort (including negligence), breach of statutory duty or otherwise, shall in no event exceed the total Licence Fee actually paid by the Licensee for the Design giving rise to the claim.</p>
                <p><span className="font-semibold text-gray-900">c.</span>The Licensor makes no representation or warranty regarding: (i) the commercial success or market acceptance of products incorporating the Design; (ii) the suitability of the Design for any particular manufacturing process, material, substrate, fabric type, garment construction, finishing process, or production method; (iii) the compatibility of the Design with the Licensee’s printing equipment, technical specifications, colour profiles, or production systems. The Licensor shall not be liable or held responsible for any deficiencies in the quality, appearance, colour accuracy, durability, performance, shrinkage, fading, distortion, misalignment, or overall finish of any products on which the Design is applied where such deficiencies arise from: (i) the materials, fabrics, substrates, inks, dyes, coatings, or other components selected by the Licensee; (ii) the printing methods, colour calibration settings, resolution adjustments, scaling, modifications, or technical specifications chosen by the Licensee; (iii) the acts or omissions of any manufacturer, printer, converter, production facility, contractor, or other third party engaged by or on behalf of the Licensee; or (iv) deviations from recommended file specifications or industry-standard production practices.</p>
                <p><span className="font-semibold text-gray-900">d.</span>You acknowledge and agree that you are solely responsible for: (i) selecting appropriate materials, manufacturers, printers, and production partners; (ii) conducting sampling, strike-offs, test prints, and quality control checks; (iii) approving print specifications, colour matching, and production standards; and (iv) ensuring that all manufacturing choices meet your commercial, durability, safety, and quality expectations. The Licensee assumes all risk relating to production outcomes and product performance once the Design file has been delivered in functional format.</p>
                <p><span className="font-semibold text-gray-900">e.</span> Nothing in this Agreement shall exclude or limit liability: (i) for fraud or fraudulent misrepresentation; (ii) for death or personal injury caused by negligence; or (iii) for any liability which cannot lawfully be excluded or limited under applicable law.</p>
            </div>
        ),
    },
    {
        number: "10",
        title: "Termination",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span>Either Party may terminate this agreement immediately if the other Party breaches any term of this Agreement and such breach is incapable of remedy or continues for a period of 30 days after written notice requiring the same to be remedied has been given.</p>
                <p><span className="font-semibold text-gray-900">b.</span>On the termination of this Agreement, all rights and authorisations granted by the Licensor to the Licensee under this Agreement shall automatically terminate and immediately revert to the Licensor.</p>
                <p><span className="font-semibold text-gray-900">c.</span>Clauses relating to intellectual property rights, warranties, representations, indemnity and dispute resolution shall survive termination of this Agreement.</p>
            </div>
        ),
    },
    {
        number: "11",
        title: "No Refunds",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span>Due to the digital nature of the product, all sales shall be final once the digital file(s) have been made available for download. No refunds, returns, cancellations, or exchanges shall be permitted.</p>
                <p><span className="font-semibold text-gray-900">b.</span> A refund shall only be considered where the digital file(s) delivered is demonstrably corrupted or contains a material technical defect that renders it incapable of being opened or used as intended. In such circumstances, you must provide written notice within seven (7) days of receiving the digital file(s), together with reasonable evidence substantiating the alleged defect.</p>
                <p><span className="font-semibold text-gray-900">c.</span>The Licensor shall use reasonable commercial efforts to remedy the issue, including, where appropriate, re-supplying the file or providing a corrected replacement. If the Licensor is unable to rectify the defect within a reasonable period of time, the Licensor may, at her sole discretion, issue a refund.</p>
            </div>
        ),
    },
    {
        number: "12",
        title: "Exclusivity and Removal of Design",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> In consideration of the exclusive rights granted herein, the Licensor shall, within three (3) business days of making the digital file(s) available for download, remove the Design from the Website, online catalogue, and any other publicly accessible listing or marketplace where the Design is offered for license or sale. The Licensor shall ensure that the Design is no longer advertised, displayed for commercial availability, or otherwise held out as available for licensing or purchase by any third party.</p>
                <p><span className="font-semibold text-gray-900">b.</span>The Licensor will not license the Design to any other person during the Term.</p>
                <p><span className="font-semibold text-gray-900">c.</span> c.The Licensor may retain archival copies of the Design solely for record-keeping purposes, provided that such copies are not made publicly accessible, marketed, distributed, or otherwise exploited in any manner inconsistent with the exclusive rights granted to you under this Agreement.</p>
            </div>
        ),
    },
    {
        number: "13",
        title: "Option of Assignment",
        content: (
            <p className="text-gray-700 leading-relaxed">Where you wish to be assigned all the intellectual property rights (“Rights”) in the Design, you should inform the Licensor in writing and where the Licensor is inclined to assign the Rights to you, terms for the assignment of the Rights will be mutually agreed upon by both Parties. </p>
        ),
    },
    {
        number: "14",
        title: "Miscellaneous",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> You shall not assign or sub-license your rights under this Agreement.</p>
                <p><span className="font-semibold text-gray-900">b.</span> You confirm that you are acting on your own behalf and not for the benefit of any other person.</p>
                <p><span className="font-semibold text-gray-900">c.</span> No action of either party, other than in writing agreed to by the parties, may be construed to waive any provision of this Agreement and a single or partial exercise by either party of any such action will not preclude further exercise of other rights or remedies in this Agreement.</p>
                <p><span className="font-semibold text-gray-900">d.</span>All notices to be served in accordance with this Agreement may be served by email. The Licensor’s email address shall be as displayed on the Website from time to time and your email address shall be as submitted by you to the Website upon the purchase of the license to use the Design.</p>
                <p><span className="font-semibold text-gray-900">e.</span>The Licensor shall not be in breach of this Agreement or otherwise liable for any failure or delay in the performance of her obligations if such delay or failure results from events, circumstances or causes beyond her reasonable control. The time for performance of such obligations shall be extended accordingly. If the period of delay or non-performance continues for 14 days, the Licensee may terminate this Agreement by giving 7 days written notice to the Licensor. </p>
                <p><span className="font-semibold text-gray-900">f.</span>Nothing in this Agreement is intended to or shall be deemed to establish any partnership or joint venture between the Parties, constitute any Party the agent of the other Party, or authorize one Party to make or enter into any commitments for or on behalf of the other Party.</p>
                <p><span className="font-semibold text-gray-900">g.</span>If any provision or part-provision of this agreement is or becomes invalid, illegal or unenforceable, it shall be deemed modified to the minimum extent necessary to make it valid, legal and enforceable. If such modification is not possible, the relevant provision or part-provision shall be deemed deleted. Any modification to or deletion of a provision or part-provision under this clause shall not affect the validity and enforceability of the rest of this agreement.</p>
                <p><span className="font-semibold text-gray-900">h.</span>This Agreement constitutes the entire agreement between you and the Licensor and supersedes all previous all prior agreements, written or oral, relating to its subject matter.
                </p>
                <p><span className="font-semibold text-gray-900">i.</span>This Agreement and any dispute or claim arising out of or in connection with it or its subject matter or formation shall be governed by and construed in accordance with the Laws of Federal Republic of Nigeria. If any dispute shall arise between the Parties regarding this Agreement, the Parties will first attempt to resolve such dispute amicably and if the dispute remains unresolved within 15 business days of notice of such dispute, the Parties shall submit the matter to Mediation at the Lagos Multi-Door Courthouse (LMDC) and each Party shall pay its respective costs. Where parties are unable to resolve the dispute within 20 business days of submission of the dispute to Mediation, either Party may initiate proceedings in a court of competent jurisdiction.
                </p>
            </div>
        ),
    },
];

const nonExclusiveSections = [
    {
        number: "1",
        title: "Definitions",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">"Design"</span> means the specific surface pattern selected for licence.</p>
                <p><span className="font-semibold text-gray-900">"Effective Date"</span> means the date on which the Licensee pays the License Fee;</p>
                <p><span className="font-semibold text-gray-900">"Field of Use"</span> means the specific commercial application selected by the Licensee at checkout and confirmed in the Order Confirmation email/invoice Or means two-dimensional surface pattern application to textiles and apparel only.</p>
                <p><span className="font-semibold text-gray-900">"Intellectual Property Rights"</span> means patents, rights to inventions, copyright, trademarks, business names and domain names, rights in get-up, goodwill and the right to sue for passing off, rights in designs, database rights, rights to use and protect the confidentiality of, confidential information (including know-how and trade secrets), and all other intellectual property rights, in each case whether registered or unregistered and including all applications and rights to apply for and be granted, renewals or extensions of, and rights to claim priority from, such rights and all similar or equivalent rights or forms of protection which subsist or will subsist now or in the future in any part of the world.</p>
                <p><span className="font-semibold text-gray-900">"Licence Fee"</span> means the amount paid at purchase.</p>
            </div>
        ),
    },
    {
        number: "2",
        title: "Formation and Electronic Acceptance",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> This Agreement is concluded electronically and becomes binding when the Licensee: (a) affirmatively accepts these Terms, and (b) completes payment.</p>
                <p><span className="font-semibold text-gray-900">b.</span> No rights under this Agreement shall be granted to the Licensee until the steps in 2(a) above are completed.</p>
            </div>
        ),
    },
    {
        number: "3",
        title: "Grant of License, Term & Scope",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> Subject to your payment of the License Fee and compliance with this Agreement, the Licensor hereby grants to you a <span className="font-semibold text-gray-900">non-exclusive, non-transferable, non-sublicensable, worldwide license</span> to use the Design only for the Field of Use for an initial term of three (3) years commencing on the Effective Date (the "Initial Term") (the "License").</p>
                <p><span className="font-semibold text-gray-900">b.</span> Upon expiry of the Initial Term, the License may be renewed for further fixed terms by written agreement of the parties, subject to agreement on a renewal fee. In the absence of such written renewal agreement, all rights granted to the Licensee shall automatically revert to the Licensor upon expiry of the Initial Term.</p>
                <p><span className="font-semibold text-gray-900">c.</span> The Initial Term and further fixed terms (if any) shall be individually or collectively referred to as the "Term".</p>
                <p><span className="font-semibold text-gray-900">d.</span> Continued use of the Design after the expiration of the Term constitutes an infringement of the Licensor's rights.</p>
                <p><span className="font-semibold text-gray-900">e.</span> The License is strictly limited to use as a two-dimensional surface decoration and does not include any right to use the Design as a trademark, logo, brand identifier, standalone artwork, digital asset, template, or for any purpose outside the Field of Use.</p>
                <p><span className="font-semibold text-gray-900">f.</span> The Licensor reserves the unrestricted right to license the Design to other parties, including competitors of the Licensee, and to use and exploit the Design herself.</p>
            </div>
        ),
    },
    {
        number: "4",
        title: "Licensor's Obligations and Rights",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> The Licensor shall, within 24 hours of receiving the License Fee, send a downloadable file containing an image of the Design ("Image") to the email address provided by the Licensee at checkout. The Licensor shall send the Image in JPEG, PDF, PNG, or other standard format, at a resolution that the Licensor determines will be suitable for the Licensee's intended use.</p>
                <p><span className="font-semibold text-gray-900">b.</span> In the event that the resolution of the Image contained in the file is not suitable for your use, you shall notify the Licensor within 3 (three) business days of receipt of the file. In this event, the Licensor's only obligation will be to provide Licensee with another copy of the Image in a suitable resolution, but in no event, will the Licensor be liable for poor reproduction quality, delays, or any consequential damages.</p>
                <p><span className="font-semibold text-gray-900">c.</span> The Licensor expressly retains all rights in, or in relation to the Design that are not expressly granted to the Licensee under this Agreement ("Reserved Rights") for her own and third-party exploitation. It is understood that the Licensor retains the right use the Design for marketing and promotional purposes.</p>
            </div>
        ),
    },
    {
        number: "5",
        title: "Licensee's Obligations and Rights",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> The Licensee has the right to use the Design in accordance with this Agreement.</p>
                <p><span className="font-semibold text-gray-900">b.</span> The Licensee shall comply with all applicable laws in performing its obligations and exercising its rights under this Agreement.</p>
                <p><span className="font-semibold text-gray-900">c.</span> The Licensee shall not change, amend, alter, modify, adapt or create derivative works from the Design without the Licensor's prior written consent. Where you require a modification of the Design, you may contact the Licensor to modify the Design for an additional fee, which will be determined by the Licensor.</p>
                <p><span className="font-semibold text-gray-900">d.</span> The Licensee shall not use the Design in any way that is or renders the Design obscene, defamatory or in breach of the privacy or any other rights of a third party or of any law in any territory in which the Design is used.</p>
            </div>
        ),
    },
    {
        number: "6",
        title: "Artifial Intelligence Restrictions",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> The Licensee shall not, and shall not permit any third party to, upload, input, submit, transfer, or otherwise make the Design available to any artificial intelligence, machine learning, generative AI, algorithmic training system, or similar technology for the purpose of modifying, adapting, generating derivative works from, analyzing, reverse engineering, or otherwise altering the Design.</p>
                <p><span className="font-semibold text-gray-900">b.</span> The Licensee agrees that the Design shall not be used, in whole or in part, for the training, fine-tuning, development, or improvement of any artificial intelligence or machine learning models, systems, or datasets, whether commercial or non-commercial.</p>
                <p><span className="font-semibold text-gray-900">c.</span> Any use of the Design in violation of this clause shall constitute a material breach of this Agreement, entitling the Licensor to immediate termination of the License, injunctive relief, and any other remedies available at law or in equity.</p>
            </div>
        ),
    },
    {
        number: "7",
        title: "Intellectual Property Rights",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> All Intellectual Property and Intellectual Property Rights in respect of the Design shall remain the sole and exclusive property of the Licensor and the Licensor shall have the right to exploit such retained rights.</p>
                <p><span className="font-semibold text-gray-900">b.</span> The Licensee acknowledges that all right, title, and interest in and to the Design, including all intellectual property rights therein (subject only to the rights expressly licensed under this Agreement), are and shall remain vested in the Licensor.</p>
                <p><span className="font-semibold text-gray-900">c.</span> The Licensee shall not:</p>
                <p>(i) apply for, register, or attempt to register the Design, or any design, mark, artwork, or element derived from or confusingly similar to the Design, as a trademark, design right, copyright, or other intellectual property right in any jurisdiction in the Licensee's own name or in the name of any third party;</p>
                <p>(ii) claim ownership of, or assert any proprietary interest in, the Design or any intellectual property rights therein, except as expressly granted under this Agreement; or</p>
                <p>(iii) take any action, or omit to take any action, that would infringe, impair, encumber, dilute, misappropriate, or otherwise adversely affect the Licensor's intellectual property rights in the Design.</p>
                <p><span className="font-semibold text-gray-900">d.</span> The Licensee further agrees not to challenge, oppose, or assist any third party in challenging or opposing the validity, ownership, or enforceability of the Licensor's intellectual property rights in the Design.</p>
                <p><span className="font-semibold text-gray-900">e.</span> In the event the Licensee files or obtains any registration in breach of this clause, the Licensee shall promptly assign such registration and all associated rights to the Licensor at no cost and execute all documents necessary to give effect to such assignment.</p>
            </div>
        ),
    },
    {
        number: "8",
        title: "Warranties, Representations & Indemnity",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> Each Party warrants to the other that it has full power and authority to enter into and perform its obligations under this Agreement.</p>
                <p><span className="font-semibold text-gray-900">b.</span> You hereby warrant that: (i) the information you have provided in your order is accurate and complete; and (ii) you will be able to accept delivery of the Design.</p>
                <p><span className="font-semibold text-gray-900">c.</span> The Licensor hereby warrants and represents that:</p>
                <p>(i) she is the creator and owner of the Design;</p>
                <p>(ii) the Design has not been exclusively licensed to any other person in a manner that would prevent the Licensor from granting this non-exclusive licence;</p>
                <p>(iii) the Design does not infringe any copyright or other legal rights of a third party; and</p>
                <p>(iv) the Design does not contain any unlawful material.</p>
                <p><span className="font-semibold text-gray-900">d.</span> The Licensee agrees not to sell, assign or sub-license the Design or any of their rights under this Agreement to any third party without the Licensor's express agreement.</p>
                <p><span className="font-semibold text-gray-900">e.</span> The Licensee hereby warrants that its use of the Design:</p>
                <p>(i) will not infringe any third party's Intellectual Property Rights;</p>
                <p>(ii) will not be defamatory, libelous, obscene, or otherwise unlawful; and</p>
                <p>(iii) will not violate any applicable law, legislation or subordinate legislation;</p>
                <p><span className="font-semibold text-gray-900">f.</span> Each Party agrees to indemnify the other Party for any loss, liabilities, damages, expenses and claims incurred by the Party arising out of the other Party's negligence, failure to comply with laws applicable to performance of this Agreement, breach of its obligations, warranties and representations.</p>
            </div>
        ),
    },
    {
        number: "9",
        title: "Limitation of Liability",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> To the fullest extent permitted by applicable law, the Licensor shall not be liable to the Licensee for any: (i) indirect, incidental, special, punitive or consequential loss or damage; (ii) loss of profit; (iii) loss of sales or revenue; (iv) loss of business opportunity; (v) loss of anticipated savings; (vi) loss of goodwill; (vii) loss or corruption of data; (viii) business interruption; or (ix) costs of procuring substitute goods or services, arising out of or in connection with this Agreement or the use of the Design.</p>
                <p><span className="font-semibold text-gray-900">b.</span> Subject to Clause 9(a), the Licensor's total aggregate liability to the Licensee arising out of or in connection with this Agreement, whether in contract, tort (including negligence), breach of statutory duty or otherwise, shall in no event exceed the total Licence Fee actually paid by the Licensee for the Design giving rise to the claim.</p>
                <p><span className="font-semibold text-gray-900">c.</span> The Licensor makes no representation or warranty regarding: (i) the commercial success or market acceptance of products incorporating the Design; (ii) the suitability of the Design for any particular manufacturing process, material, substrate, fabric type, garment construction, finishing process, or production method; (iii) the compatibility of the Design with the Licensee's printing equipment, technical specifications, colour profiles, or production systems. The Licensor shall not be liable or held responsible for any deficiencies in the quality, appearance, colour accuracy, durability, performance, shrinkage, fading, distortion, misalignment, or overall finish of any products on which the Design is applied where such deficiencies arise from: (i) the materials, fabrics, substrates, inks, dyes, coatings, or other components selected by the Licensee; (ii) the printing methods, colour calibration settings, resolution adjustments, scaling, modifications, or technical specifications chosen by the Licensee; (iii) the acts or omissions of any manufacturer, printer, converter, production facility, contractor, or other third party engaged by or on behalf of the Licensee; or (iv) deviations from recommended file specifications or industry-standard production practices.</p>
                <p><span className="font-semibold text-gray-900">d.</span> You acknowledge and agree that you are solely responsible for: (i) selecting appropriate materials, manufacturers, printers, and production partners; (ii) conducting sampling, strike-offs, test prints, and quality control checks; (iii) approving print specifications, colour matching, and production standards; and (iv) ensuring that all manufacturing choices meet your commercial, durability, safety, and quality expectations. The Licensee assumes all risk relating to production outcomes and product performance once the Design file has been delivered in functional format.</p>
                <p><span className="font-semibold text-gray-900">e.</span> Nothing in this Agreement shall exclude or limit liability: (i) for fraud or fraudulent misrepresentation; (ii) for death or personal injury caused by negligence; or (iii) for any liability which cannot lawfully be excluded or limited under applicable law.</p>
            </div>
        ),
    },
    {
        number: "10",
        title: "No Exclusivity or Market Protection",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> The Licensee acknowledges that the license granted under this Agreement is non-exclusive. Accordingly, the Licensor may license the Design to multiple third parties.</p>
                <p><span className="font-semibold text-gray-900">b.</span> The Licensor does not grant territorial, industry, customer, or competitive protection.</p>
                <p><span className="font-semibold text-gray-900">c.</span> The Licensee shall have no claim arising from similar or identical use of the Design by other licensees.</p>
                <p><span className="font-semibold text-gray-900">d.</span> The Licensee acknowledges that similar or identical products incorporating the Design may be manufactured, marketed, and sold by other licensees.</p>
            </div>
        ),
    },
    {
        number: "11",
        title: "Termination",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> Either Party may terminate this agreement immediately if the other Party breaches any term of this Agreement and such breach is incapable of remedy or continues for a period of 30 days after written notice requiring the same to be remedied has been given.</p>
                <p><span className="font-semibold text-gray-900">b.</span> On the termination of this Agreement, all rights and authorisations granted by the Licensor to the Licensee under this Agreement shall automatically terminate and immediately revert to the Licensor.</p>
                <p><span className="font-semibold text-gray-900">c.</span> Clauses relating to intellectual property rights, warranties, representations, indemnity and dispute resolution shall survive termination of this Agreement.</p>
            </div>
        ),
    },
    {
        number: "12",
        title: "No Refunds",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> Due to the digital nature of the product, all sales shall be final once the digital file(s) have been made available for download. No refunds, returns, cancellations, or exchanges shall be permitted.</p>
                <p><span className="font-semibold text-gray-900">b.</span> A refund shall only be considered where the digital file(s) delivered is demonstrably corrupted or contains a material technical defect that renders it incapable of being opened or used as intended. In such circumstances, you must provide written notice within seven (7) days of receiving the digital file(s), together with reasonable evidence substantiating the alleged defect.</p>
                <p><span className="font-semibold text-gray-900">c.</span> The Licensor shall use reasonable commercial efforts to remedy the issue, including, where appropriate, re-supplying the file or providing a corrected replacement. If the Licensor is unable to rectify the defect within a reasonable period of time, the Licensor may, at her sole discretion, issue a refund.</p>
            </div>
        ),
    },
    {
        number: "13",
        title: "Miscellaneous",
        content: (
            <div className="space-y-3 text-gray-700 leading-relaxed">
                <p><span className="font-semibold text-gray-900">a.</span> You shall not assign or sub-license your rights under this agreement.</p>
                <p><span className="font-semibold text-gray-900">b.</span> You confirm that you are acting on your own behalf and not for the benefit of any other person.</p>
                <p><span className="font-semibold text-gray-900">c.</span> No action of either party, other than in writing agreed to by the parties, may be construed to waive any provision of this Agreement and a single or partial exercise by either party of any such action will not preclude further exercise of other rights or remedies in this Agreement.</p>
                <p><span className="font-semibold text-gray-900">d.</span> All notices to be served in accordance with this Agreement may be served by email. The Licensor's email address shall be as displayed on the Website from time to time and your email address shall be as submitted by you to the Website upon the purchase of the license to use the Design.</p>
                <p><span className="font-semibold text-gray-900">e.</span> The Licensor shall not be in breach of this Agreement or otherwise liable for any failure or delay in the performance of her obligations if such delay or failure results from events, circumstances or causes beyond her reasonable control. The time for performance of such obligations shall be extended accordingly. If the period of delay or non-performance continues for 14 days, the Licensee may terminate this Agreement by giving 7 days written notice to the Licensor.</p>
                <p><span className="font-semibold text-gray-900">f.</span> Nothing in this Agreement is intended to or shall be deemed to establish any partnership or joint venture between the Parties, constitute any Party the agent of the other Party, or authorize one Party to make or enter into any commitments for or on behalf of the other Party.</p>
                <p><span className="font-semibold text-gray-900">g.</span> If any provision or part-provision of this agreement is or becomes invalid, illegal or unenforceable, it shall be deemed modified to the minimum extent necessary to make it valid, legal and enforceable. If such modification is not possible, the relevant provision or part-provision shall be deemed deleted. Any modification to or deletion of a provision or part-provision under this clause shall not affect the validity and enforceability of the rest of this agreement.</p>
                <p><span className="font-semibold text-gray-900">h.</span> This Agreement constitutes the entire agreement between you and the Licensor and supersedes all previous all prior agreements, written or oral, relating to its subject matter.</p>
                <p><span className="font-semibold text-gray-900">i.</span> This Agreement and any dispute or claim arising out of or in connection with it or its subject matter or formation shall be governed by and construed in accordance with the Laws of Federal Republic of Nigeria. If any dispute shall arise between the Parties regarding this Agreement, the Parties will first attempt to resolve such dispute amicably and if the dispute remains unresolved within 15 business days of notice of such dispute, the Parties shall submit the matter to Mediation at the Lagos Multi-Door Courthouse (LMDC) and each Party shall pay its respective costs. Where parties are unable to resolve the dispute within 20 business days of submission of the dispute to Mediation, either Party may initiate proceedings in a court of competent jurisdiction.</p>
            </div>
        ),
    },
];

const comparisonRows = [
    {
        feature: "Exclusivity",
        exclusive: "Sole rights — only you can use the Design within the Field of Use",
        nonExclusive: "Shared rights — Licensor may license the Design to multiple parties",
    },
    {
        feature: "Term",
        exclusive: "Perpetual (no expiry)",
        nonExclusive: "3 years initial term, renewable by written agreement",
    },
    {
        feature: "Design removal from website",
        exclusive: "Yes — removed within 3 business days of download",
        nonExclusive: "No — Design remains available for others to license",
    },
    {
        feature: "Licensor can license to others",
        exclusive: "No — Licensor will not license to any other person",
        nonExclusive: "Yes — including competitors of the Licensee",
    },
    {
        feature: "Competitor / market protection",
        exclusive: "Full — no other licensee can use the Design",
        nonExclusive: "None — no territorial, industry, or competitive protection",
    },
    {
        feature: "Option of Assignment",
        exclusive: "Yes — IP rights assignment can be negotiated separately",
        nonExclusive: "No — not included in non-exclusive licence",
    },
    {
        feature: "Transfer / sub-license",
        exclusive: "No — non-transferable, non-sublicensable",
        nonExclusive: "No — non-transferable, non-sublicensable",
    },
    // {
    //     feature: "Field of Use",
    //     exclusive: "Limited to selected application or textiles/apparel",
    //     nonExclusive: "Limited to selected application or textiles/apparel",
    // },
];

const Badge = ({ type }: { type: string }) => {
    if (type === "summary") return null;
    const isExclusive = type === "exclusive";
    return (
        <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full tracking-wide ${isExclusive
                ? "bg-amber-50 text-amber-700 border border-amber-200"
                : "bg-[#D4F8D4]/60 text-black border border-[#D4F8D4]"
                }`}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full ${isExclusive ? "bg-amber-500" : "bg-[#1C1B0B]/20"}`}
            />
            {isExclusive ? "Exclusive Rights" : "Non-Exclusive Rights"}
        </span>
    );
};

export default function LicensePage() {
    const [activeTab, setActiveTab] = useState("summary");
    const sections = activeTab === "exclusive" ? exclusiveSections : nonExclusiveSections;

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-6 sm:px-12 lg:px-24 font-sans font-satoshi pt-30">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white p-8 md:p-12 shadow-sm rounded-lg mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">Design Licence Agreement</h1>
                            <p className="text-sm text-gray-500">J.H Textiles · Last Updated: January 19, 2026</p>
                        </div>
                        <Badge type={activeTab} />
                    </div>

                    <p className="text-gray-700 leading-relaxed text-sm mb-6 p-4 bg-amber-50 border border-amber-100 rounded-md">
                        <strong className="font-semibold">PLEASE READ CAREFULLY BEFORE PURCHASING AND ENTERING INTO THIS AGREEMENT</strong>. THIS AGREEMENT IS A LEGAL AGREEMENT BETWEEN YOU, THE PURCHASER OF THE DESIGN, IDENTIFIED AT CHECKOUT (“LICENSEE”) AND JESUDARA HINMIKAIYE (TRADING UNDER THE NAME AND STYLE OF J.H TEXTILES) (“LICENSOR”) OWNER OF THE WEBSITE <a href="https://jesudarahinmikaiye.com/" className="underline">jesudarahinmikaiye.com</a> (“WEBSITE”)
                    </p>

                    <p className="text-gray-700 leading-relaxed text-sm mb-6 p-4 bg-amber-50 border border-amber-100 rounded-md">
                        IF YOU WISH TO ORDER A DESIGN FROM THE WESBITE, YOU MUST INDICATE YOUR ACCEPTANCE OF THE TERMS CONTAINED IN THIS AGREEMENT BY CLICKING THE ‘I ACCEPT’ BUTTON BELOW OR TICKING THE BOX INDICATING YOUR ACCEPTANCE. YOU WILL BE DEEMED TO HAVE ENTERED INTO THIS AGREEMENT WITH THE LICENSOR ONCE YOU HAVE CLICKED ‘I ACCEPT’.
                    </p>

                    <p className="text-gray-700 leading-relaxed text-sm mb-6 p-4 bg-amber-50 border border-amber-100 rounded-md">
                        IF YOU DO NOT AGREE, YOU MUST NOT PROCEED WITH THE PURCHASE.

                        IF YOU DO NOT AGREE TO THE TERMS OF THIS AGREEMENT, YOU WILL NOT HAVE ANY RIGHT TO USE ANY DESIGN AVAILABLE TO BE LICENSED ON THE WEBSITE

                        WE MAY UPDATE THE VERSION OF THIS LICENSE AGREEMENT FROM TIME TO TIME, AND WE DO NOT GUARANTEE THAT THE VERSION YOU HAVE AGREED TO WILL REMAIN ACCESSIBLE. WE THEREFORE RECOMMEND THAT YOU DOWNLOAD, PRINT AND RETAIN A COPY OF THIS AGREEMENT FOR YOUR RECORDS.</p>

                    <p className="text-xs text-gray-500 italic">
                        We recommend you download, print, and retain a copy of this Agreement for your records, as the version you have agreed to may be updated from time to time.
                    </p>
                </div>

                <div className="bg-white shadow-sm rounded-lg mb-6 p-1.5 flex gap-1.5">
                    <button
                        onClick={() => setActiveTab("summary")}
                        className={`flex-1 py-3 px-6 rounded-md text-sm font-semibold transition-all duration-200 ${activeTab === "summary"
                            ? "bg-gray-900 text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                            }`}
                    >
                        Summary
                    </button>
                    <button
                        onClick={() => setActiveTab("exclusive")}
                        className={`flex-1 py-3 px-6 rounded-md text-sm font-semibold transition-all duration-200 ${activeTab === "exclusive"
                            ? "bg-gray-900 text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                            }`}
                    >
                        Exclusive Licence
                    </button>
                    <button
                        onClick={() => setActiveTab("non-exclusive")}
                        className={`flex-1 py-3 px-6 rounded-md text-sm font-semibold transition-all duration-200 ${activeTab === "non-exclusive"
                            ? "bg-gray-900 text-white shadow-sm"
                            : "text-black hover:text-gray-800 hover:bg-gray-50"
                            }`}
                    >
                        Non-Exclusive Licence
                    </button>
                </div>

                {/* Tab Description */}
                {activeTab !== "summary" && (
                    <div
                        className={`rounded-lg p-5 mb-6 border text-sm leading-relaxed ${activeTab === "exclusive"
                            ? "bg-amber-50 border-amber-100 text-amber-900"
                            : "bg-[#D4F8D4]/60 border-[#D4F8D4] text-black"
                            }`}
                    >
                        {activeTab === "exclusive" ? (
                            <p>
                                <strong>Exclusive Licence:</strong> This licence grants you sole and exclusive rights to use the Design within the Field of Use. The Design will be removed from the website and will not be licensed to any other party. Assignment of intellectual property rights may be negotiated separately.
                            </p>
                        ) : (
                            <p>
                                <strong>Non-Exclusive Licence:</strong> This licence grants you rights to use the Design within the Field of Use. The Licensor retains the right to license the same Design to other parties. The Design will remain available for purchase by others on the website.
                            </p>
                        )}
                    </div>
                )}

                {/* Summary: Comparison Table */}
                {activeTab === "summary" && (
                    <div className="bg-white p-8 md:p-12 shadow-sm rounded-lg mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Exclusive vs Non-Exclusive Rights — At a Glance</h2>
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                                        <th className="text-left py-4 px-4 font-semibold text-amber-800 bg-white/60">Exclusive Rights</th>
                                        <th className="text-left py-4 px-4 font-semibold text-[#1C1B0B] bg-white/60">Non-Exclusive Rights</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonRows.map((row, i) => (
                                        <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                                            <td className="py-4 px-4 font-medium text-gray-800">{row.feature}</td>
                                            <td className="py-4 px-4 text-gray-700 bg-amber-50/30">{row.exclusive}</td>
                                            <td className="py-4 px-4 text-gray-700 bg-[#D4F8D4]/60">{row.nonExclusive}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-6 text-xs text-gray-500 italic">
                            This summary is for quick reference only. Please read the full licence terms above for complete details.
                        </p>
                        <hr className="my-8 border-gray-200" />
                        <div className="bg-[#1C1B0B]/10 p-6 rounded-md">
                            <h2 className="text-xl font-semibold text-[#1C1B0B] mb-2">Contact Us</h2>
                            <p className="text-[#1C1B0B] text-sm">
                                If you have questions about this licence, please reach out:
                            </p>
                            <p className="mt-2 font-medium text-[#1C1B0B]">
                                Email:{" "}
                                <a href="mailto:jhtextiles@icloud.com" className="underline">
                                    jhtextiles@icloud.com
                                </a>
                            </p>
                        </div>
                    </div>
                )}

                {/* Sections */}
                {activeTab !== "summary" && (
                <div className="bg-white p-8 md:p-12 shadow-sm rounded-lg">
                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <section key={section.number}>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                    {section.number}. {section.title}
                                </h2>
                                {section.content}
                                {index < sections.length - 1 && <hr className="mt-8 border-gray-100" />}
                            </section>
                        ))}
                    </div>

                    <hr className="my-8 border-gray-200" />

                    {/* Contact */}
                    <div className="bg-[#D4F8D4]/60 p-6 rounded-md">
                        <h2 className="text-xl font-semibold text-black mb-2">Contact Us</h2>
                        <p className="text-black text-sm">
                            If you have questions about this licence, please reach out:
                        </p>
                        <p className="mt-2 font-medium text-black">
                            Email:{" "}
                            <a href="mailto:jhtextiles@icloud.com" className="underline">
                                jhtextiles@icloud.com
                            </a>
                        </p>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}