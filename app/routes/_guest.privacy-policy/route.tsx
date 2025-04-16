import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
    return [
        { title: "Privacy Policy | OwenaHub" },
        { name: "description", content: "The Learner's Hub" },
    ];
};
export default function PrivacyPolicy() {
    return (
        <div className="animate fadeIn">
            <div className="bg-primary-bg pt-20">
                <div className="container mx-auto py-12 px-4">
                    <h1 className="text-3xl font-bold leading-tight">
                        Privacy Policy
                    </h1>
                    <span className="text-gray-500 block mb-2">
                        Last updated: 16th April 2025
                    </span>
                </div>
            </div>

            <div className="container mx-auto my-12">
                <div className="mt-2">
                    <div className="mt-2 space-y-6 text-base text-gray-800">
                        <p>
                            OwenaHub ("we," "us," or "our") respects the privacy of our users ("you" or "your"). This Privacy
                            Policy describes how we collect, use, disclose, and secure your information when you use our
                            mentorship platform ("Platform"). We are committed to protecting your privacy and ensuring the
                            security of your personal information.
                        </p>

                        <h2 className="text-xl font-semibold mt-6 text-gray-800">Information We Collect</h2>

                        <p className="font-medium">Personal Information</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>When you register for an account, we may collect personal information such as your name, email address, and contact details.</li>
                            <li>If you choose to provide additional information in your profile or during interactions with mentors/mentees, we may collect that information as well.</li>
                        </ul>

                        <p className="font-medium mt-4">Usage Information</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>We may collect information about how you interact with the Platform, including your session history, activity logs, and preferences.</li>
                            <li>This may include data such as the pages you visit, the duration of your sessions, and the frequency of your interactions.</li>
                        </ul>

                        <p className="font-medium mt-4">Device Information</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>We may collect information about the device you use to access the Platform, including its unique identifiers, IP address, browser type, and operating system.</li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6 text-gray-800">How We Use Your Information</h2>

                        <p className="font-medium">Providing Services</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>We use your personal information to create and manage your account, facilitate mentorship sessions, and provide support services.</li>
                        </ul>

                        <p className="font-medium mt-4">Improving the Platform</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>We analyze usage data and feedback to enhance the functionality, performance, and user experience of the Platform.</li>
                        </ul>

                        <p className="font-medium mt-4">Communicating with You</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>We may use your contact information to send you important updates, notifications, and promotional materials related to the Platform.</li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6 text-gray-800">Information Sharing and Disclosure</h2>

                        <p className="font-medium">Third-Party Service Providers</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>We may share your information with third-party service providers who assist us in operating the Platform, such as hosting providers, analytics providers, and communication tools.</li>
                        </ul>

                        <p className="font-medium mt-4">Legal Compliance</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>We may disclose your information when required by law, court order, or other legal process, or to protect our rights, property, or safety, or the rights, property, or safety of others.</li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6 text-gray-800">Data Security</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>We implement appropriate technical and organizational measures to safeguard your information against unauthorized access, disclosure, alteration, or destruction.</li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6 text-gray-800">Data Retention</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6 text-gray-800">Your Choices and Rights</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>You may update or delete your account information at any time by accessing your account settings.</li>
                            <li>You have the right to access, correct, or delete your personal information. Please contact us if you would like to exercise these rights or have any questions about your data.</li>
                        </ul>

                        <h2 className="text-xl font-semibold mt-6 text-gray-800">Changes to this Privacy Policy</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</li>
                        </ul>

                        <p className="mt-4">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our Platform.</p>

                        <hr className="my-8 border-t border-gray-300" />

                        <h2 className="text-xl font-semibold text-gray-800">Contact Us</h2>
                        <p>
                            If you have any questions, concerns, or feedback regarding this Privacy Policy or our data practices,
                            please contact us at <a href="mailto:hello@owenahub.com" className="text-blue-600 hover:underline">hello@owenahub.com</a>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}
