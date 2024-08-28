export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold w-full text-center mb-4">
        Privacy Policy
      </h1>

      <section>
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p>
          SmartAlgorhythm ("we", "our", or "us") is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you visit our website or use our
          services, including data collected via OAuth. By accessing our
          services, you agree to the collection and use of your data in
          accordance with this policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">
          2. Information We Collect
        </h2>
        <p>
          We collect personal information in various ways:
          <ul className="list-disc pl-5">
            <li>
              <strong>Directly from You:</strong> When you register, fill out
              forms, or communicate with us, we collect information such as your
              name, email address, phone number, and payment details.
            </li>
            <li>
              <strong>Automatically:</strong> We collect information such as IP
              addresses, browser type, operating system, and usage data through
              cookies and similar technologies.
            </li>
            <li>
              <strong>Through OAuth:</strong> When you use OAuth to log in or
              access our services, we may collect profile information, email
              addresses, and other data permitted by the OAuth provider.
            </li>
          </ul>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">
          3. How We Use Your Information
        </h2>
        <p>
          We use your information for the following purposes:
          <ul className="list-disc pl-5">
            <li>
              <strong>Service Provision:</strong> To provide, operate, maintain,
              and improve our services, including processing transactions and
              managing accounts.
            </li>
            <li>
              <strong>Authentication:</strong> To verify your identity when
              using OAuth to access our services.
            </li>
            <li>
              <strong>Communication:</strong> To send you updates, marketing
              communications, service information, and respond to your
              inquiries.
            </li>
            <li>
              <strong>Compliance:</strong> To comply with legal obligations,
              resolve disputes, and enforce our agreements.
            </li>
          </ul>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">
          4. Sharing Your Information
        </h2>
        <p>
          We do not sell your personal information. We may share your
          information with:
          <ul className="list-disc pl-5">
            <li>
              <strong>Service Providers:</strong> Third-party vendors that
              perform functions on our behalf, such as payment processing, data
              analysis, and email delivery.
            </li>
            <li>
              <strong>Legal Requirements:</strong> Authorities if required by
              law, such as in response to a subpoena or court order.
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with a merger,
              sale, or transfer of assets.
            </li>
          </ul>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">
          5. User Consent and Control
        </h2>
        <p>
          By using our services, you consent to the collection and use of your
          information as described. You have control over your data:
          <ul className="list-disc pl-5">
            <li>
              <strong>Access and Update:</strong> You can access and update your
              personal information through your account settings.
            </li>
            <li>
              <strong>Revoke OAuth Access:</strong> You can revoke OAuth access
              via your OAuth provider settings, which may limit some
              functionalities.
            </li>
            <li>
              <strong>Data Deletion:</strong> You can request deletion of your
              personal data by contacting us at privacy@smartalgorhythm.com.
            </li>
          </ul>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">6. Security</h2>
        <p>
          We implement a variety of security measures to protect your personal
          information. This includes encryption, firewalls, and secure access
          protocols. However, no security system is impenetrable, and we cannot
          guarantee the absolute security of your data.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">7. Your Rights</h2>
        <p>
          You have the right to:
          <ul className="list-disc pl-5">
            <li>
              <strong>Access:</strong> Request a copy of the personal data we
              hold about you.
            </li>
            <li>
              <strong>Correction:</strong> Correct inaccuracies in your personal
              data.
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your personal data
              under certain circumstances.
            </li>
            <li>
              <strong>Objection:</strong> Object to certain types of processing,
              such as direct marketing.
            </li>
          </ul>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">
          8. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy periodically to reflect changes in
          our practices or for other operational, legal, or regulatory reasons.
          We will notify you of significant changes by posting the new policy on
          our website and updating the "Last Updated" date at the top of this
          policy.
        </p>
      </section>

      <p>
        For more information or to exercise your rights, please contact us at
        support@smartalgorhythm.com.
      </p>
    </div>
  );
}
