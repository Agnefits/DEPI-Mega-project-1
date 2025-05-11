import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import React from 'react';

const TermsContent = () => {
  return (
    <>
      <Header />
    <main className="w-full bg-white min-h-[screen]">
      <article className="px-32 mt-12 max-md:px-10 max-sm:px-5">
        <header className="mb-10">
            <h1 className="text-5xl font-bold">
            <span className="text-cyan-900">JobGenius</span>
            <span className="text-blue-400">Terms and Conditions</span>
            </h1>
            <p className="mb-8 text-2xl leading-9 text-neutral-400">
            Effective Date: May 1, 2025
            <br />
            By using JobGenius, you agree to be bound by these Terms and our Privacy Policy.
            </p>
        </header>

        <section className="py-8 border border-neutral-400">
            <h2 className="mb-2.5 text-2xl font-bold text-blue-400">1. Eligibility</h2>
            <p className="text-2xl leading-9 text-cyan-900">
            You must be at least 18 years old or the age of majority in your jurisdiction to use JobGenius. By using the Service, you confirm that you meet the eligibility requirements.
            </p>
        </section>

        <section className="py-8 border border-neutral-400">
            <h2 className="mb-2.5 text-2xl font-bold text-blue-400">2. User Accounts</h2>
            <p className="text-2xl leading-9 text-cyan-900">
            You are responsible for maintaining the confidentiality of your account and password. You agree to provide accurate and complete information during registration and keep it up to date. You may not share your account credentials or access anyone else's account without authorization.
            </p>
        </section>

        <section className="py-8 border border-neutral-400">
            <h2 className="mb-2.5 text-2xl font-bold text-blue-400">3. Use of Services</h2>
            <div className="text-2xl leading-9 text-cyan-900">
            <p>JobGenius offers tools to:</p>
            <ul className="mt-4 mb-8">
                <li>• Job seekers for building profiles, uploading resumes, and applying for jobs.</li>
                <li>• Employers for posting jobs, managing applications, and searching for qualified candidates.</li>
            </ul>
            <p>You agree not to:</p>
            <ul className="mt-4">
                <li>• Use the Service for any illegal or unauthorized purpose.</li>
                <li>• Post misleading, false, or inappropriate content.</li>
                <li>• Impersonate another individual or organization.</li>
                <li>• Attempt to disrupt or compromise the functionality of the platform.</li>
            </ul>
            </div>
        </section>

        <section className="py-8 border border-neutral-400">
            <h2 className="mb-2.5 text-2xl font-bold text-blue-400">4. Content Ownership and License</h2>
            <p className="text-2xl leading-9 text-cyan-900">
            You retain all rights to content you upload (e.g., resumes, job postings). By submitting content, you grant JobGenius a non-exclusive, royalty-free, worldwide license to use, display, and share the content to provide the Service. You are solely responsible for the legality and accuracy of any content you provide.
            </p>
        </section>

        <section className="py-8 border border-neutral-400">
            <h2 className="mb-2.5 text-2xl font-bold text-blue-400">5. Prohibited Activities</h2>
            <div className="text-2xl leading-9 text-cyan-900">
            <p>You may not:</p>
            <ul className="mt-4">
                <li>• Use automated scripts or bots to access or interact with the Service.</li>
                <li>• Extract or harvest user data without consent.</li>
                <li>• Engage in unsolicited communication or spamming.</li>
                <li>• Upload or distribute malicious software or harmful code.</li>
            </ul>
            </div>
        </section>

        <section className="py-8 border border-neutral-400">
            <h2 className="mb-2.5 text-2xl font-bold text-blue-400">6. Termination</h2>
            <p className="text-2xl leading-9 text-cyan-900">
            JobGenius may suspend or terminate your account at any time if you violate these Terms or engage in conduct deemed harmful. You may also delete your account at your discretion.
            </p>
        </section>

        <section className="py-8 border border-neutral-400">
            <h2 className="mb-2.5 text-2xl font-bold text-blue-400">7. Disclaimers</h2>
            <p className="text-2xl leading-9 text-cyan-900">
            JobGenius does not guarantee job placement or hiring outcomes. JobGenius is not responsible for the actions of employers or other users. The Service is provided "as is" and "as available," without warranties of any kind.
            </p>
        </section>

        <section className="py-8 border border-neutral-400">
            <h2 className="mb-2.5 text-2xl font-bold text-blue-400">8. Limitation of Liability</h2>
            <p className="text-2xl leading-9 text-cyan-900">
            To the fullest extent permitted by law, JobGenius shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the Service.
            </p>
        </section>

        <section className="py-8 border border-neutral-400">
            <h2 className="mb-2.5 text-2xl font-bold text-blue-400">9. Privacy</h2>
            <p className="text-2xl leading-9 text-cyan-900">
            Your use of JobGenius is subject to our Privacy Policy, which outlines how we collect, use, and protect your personal information.
            </p>
        </section>

        <section className="py-8 border border-neutral-400">
            <h2 className="mb-2.5 text-2xl font-bold text-blue-400">10. Modifications</h2>
            <p className="text-2xl leading-9 text-cyan-900">
            We may update these Terms from time to time. Changes will be posted with the updated effective date. Continued use of the Service constitutes acceptance of the revised Terms.
            </p>
        </section>

        <section className="py-8 border border-neutral-400">
            <h2 className="mb-2.5 text-2xl font-bold text-blue-400">11. Governing Law</h2>
            <p className="text-2xl leading-9 text-cyan-900">
            These Terms are governed by the laws of the United States, specifically the State of California. Any legal disputes shall be resolved in the courts located in San Francisco, California.
            </p>
        </section>

        <section className="py-8 border border-neutral-400">
            <h2 className="mb-2.5 text-2xl font-bold text-blue-400">12. Contact Us</h2>
            <div className="text-2xl leading-9 text-cyan-900">
            <p>If you have any questions or concerns, please contact us at:</p>
            <p>Email: support@jobgenius.com</p>
            <p>Address: JobGenius Inc., 250 Mission Street, Cairo, CA 94105, Egypt</p>
            </div>
        </section>
        </article>
    </main>
      <Footer />
    </>
  );
};

export default TermsContent;