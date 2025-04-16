import { type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
    return [
        { title: "Terms of Service | OwenaHub" },
        { name: "description", content: "The Learner's Hub" },
    ];
};

export default function TermsOfService() {
    return (
        <div className="animate fadeIn">
            <div className="bg-primary-bg pt-20">
                <div className="container mx-auto py-5">
                    <h1 className="text-2xl font-bold leading-snug">Terms of Service</h1>
                    <span className="text-gray-500 mb-2 block">Last updated: 16th April 2025</span>
                </div>
            </div>

            <div className="container mx-auto my-12">
                <div className="mt-2">
                    <h2 className="text-lg font-semibold mt-6">Account Registration</h2>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>You must create an account to access certain features of the Platform.</li>
                        <li>You agree to provide accurate, current, and complete information during the registration process.</li>
                        <li>You are responsible for maintaining the confidentiality of your account credentials and for all
                            activities that occur under your account.</li>
                    </ul>

                    <h2 className="text-lg font-semibold mt-6">Mentorship Sessions</h2>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>The Platform facilitates mentorship sessions between mentors and mentees.</li>
                        <li>Mentors are responsible for providing accurate and helpful guidance to mentees during sessions.</li>
                        <li>Mentees are responsible for respecting mentors' time and expertise and for actively engaging in the
                            mentorship process.</li>
                    </ul>

                    <h2 className="text-lg font-semibold mt-6">User Conduct</h2>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>You agree not to use the Platform for any unlawful or unauthorized purpose.</li>
                        <li>You agree not to interfere with or disrupt the operation of the Platform or the experience of other
                            users.</li>
                        <li>You agree not to upload, post, or transmit any content that is harmful, offensive, or violates the
                            rights of others.</li>
                    </ul>

                    <h2 className="text-lg font-semibold mt-6">Intellectual Property</h2>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>The Platform and its content, including but not limited to text, graphics, logos, and images, are
                            protected by copyright and other intellectual property laws.</li>
                        <li>You agree not to reproduce, distribute, or create derivative works based on the Platform without our
                            prior written consent.</li>
                    </ul>

                    <h2 className="text-lg font-semibold mt-6">Limitation of Liability</h2>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>The Platform is provided on an "as-is" and "as-available" basis. We make no warranties or
                            representations regarding the accuracy, reliability, or availability of the Platform.</li>
                        <li>We shall not be liable for any indirect, incidental, special, or consequential damages arising out
                            of or in connection with your use of the Platform.</li>
                    </ul>

                    <h2 className="text-lg font-semibold mt-6">Indemnification</h2>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>You agree to indemnify and hold harmless [Your Tech Mentorship Platform], its affiliates, and their
                            respective officers, directors, employees, and agents from any claims, liabilities, damages, or
                            expenses arising out of or related to your use of the Platform.</li>
                    </ul>

                    <h2 className="text-lg font-semibold mt-6">Changes to the Terms</h2>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>We reserve the right to modify or update these Terms at any time. We will notify you of any changes
                            by posting the revised Terms on this page.</li>
                        <li>Your continued use of the Platform after the posting of the revised Terms constitutes your
                            acceptance of the changes.</li>
                    </ul>

                    <h2 className="text-lg font-semibold mt-6">Governing Law</h2>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction],
                            without regard to its conflict of law principles.</li>
                    </ul>

                    <hr className="my-6 border-t border-gray-300" />

                    <h2 className="text-lg font-semibold mt-6">Contact Us</h2>
                    <p className="mt-2">
                        If you have any questions, concerns, or feedback regarding these Terms or your use of the Platform,
                        please contact us at <a href="mailto:hello@owenahub.com" className="text-blue-600 hover:underline">hello@owenahub.com</a>.
                    </p>
                </div>
            </div>

        </div>
    )
}
