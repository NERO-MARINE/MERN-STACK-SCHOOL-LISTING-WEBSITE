import { useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./privacyPolicy.css";

const PrivacyPolicy = () => {
    useEffect(() => {
        document.title = 'Naija School Search - Privacy Policy';
      }, []);
  return (
    <div className="PrivacyPolicy">
      <Navbar type="notHomePage" />
      <div className="privacy-policy-container">
        <section className="privacy-policy-section">
          <h1>Privacy Policy</h1>
          <p className="para">
            At Naija School Search, we take your privacy seriously. This Privacy
            Policy explains how we collect, use, and protect your personal
            information when you use our website.
          </p>
          <h2>Information We Collect</h2>
          <p className="para">
            We collect information you provide when using our services,
            including your name, email address, and any additional information
            you choose to share with us.
          </p>
          <h2>How We Use Your Information</h2>
          <p className="para">
            We use the information you provide to deliver our services,
            personalize your experience, and improve our website. Your
            information is kept confidential and is not shared with third
            parties without your consent.
          </p>
          <h2>Security</h2>
          <p className="para">
            We implement security measures to protect your information. However,
            please be aware that no method of transmission over the internet or
            electronic storage is 100% secure, and we cannot guarantee absolute
            security.
          </p>
          <h2>Changes to this Privacy Policy</h2>
          <p className="para">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p className="para">
            If you have any questions or concerns about our Privacy Policy,
            please contact us.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
