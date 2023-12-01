import React, { useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./termsAndConditions.css";

const TermsAndConditions = () => {
    useEffect(() => {
        document.title = 'Naija School Search - Terms and Conditions';
    }, []);

    return (
        <div className="TermsAndConditions">
            <Navbar type="notHomePage" />
            <div className="terms-and-conditions-container">
                <section className="terms-and-conditions-section">
                    <h1>Terms and Conditions for Naija School Search</h1>
                    <p className="para">
                        Welcome to Naija School Search (NSS)! By accessing or using our website, you agree to comply with and be bound by the following terms and conditions of use. If you disagree with any part of these terms, please do not use our website.
                    </p>
                    <h2>1. Acceptance of Terms</h2>
                    <p className="para">
                        By using the Naija School Search website, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. NSS reserves the right to update, change, or replace any part of these terms without prior notice. Your continued use of the website following any changes constitutes acceptance of those changes.
                    </p>
                    <h2>2. User Eligibility</h2>
                    <p className="para">
                        You must be 18 years or older to use our website. By using the website, you represent and warrant that you have the right, authority, and capacity to enter into this agreement and to abide by all of the terms and conditions.
                    </p>
                    <h2>3. School Listings</h2>
                    <p className="para">
                        NSS provides a platform for school owners to list their educational institutions. All information provided in school listings must be accurate and up-to-date. NSS reserves the right to remove or modify any school listing that violates our guidelines or terms.
                    </p>
                    <h2>4. User Responsibilities</h2>
                    <p className="para">
                        Users are responsible for maintaining the confidentiality of their account information and passwords. Users are prohibited from engaging in any unlawful or harmful activities on the NSS website. Users are responsible for the content they submit, including reviews, comments, and other user-generated content.
                    </p>
                    <h2>5. Privacy Policy</h2>
                    <p className="para">
                        Your use of the NSS website is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
                    </p>
                    <h2>6. Intellectual Property</h2>
                    <p className="para">
                        All content on the NSS website, including text, graphics, logos, and images, is the property of NSS and is protected by intellectual property laws. Users may not use, reproduce, or distribute any content without prior written permission from NSS.
                    </p>
                    <h2>7. Limitation of Liability</h2>
                    <p className="para">
                        NSS is not liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use or inability to use the website.
                    </p>
                    <h2>8. Governing Law</h2>
                    <p className="para">
                        These terms and conditions are governed by and construed in accordance with the laws of Nigeria, and you irrevocably submit to the exclusive jurisdiction of the courts in Nigeria.
                    </p>
                    <h2>Contact Information:</h2>
                    <p className="para">
                        If you have any questions about these terms and conditions, please contact us with [+2347056961743].
                    </p>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default TermsAndConditions;
