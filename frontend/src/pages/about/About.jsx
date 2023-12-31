import { useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./about.css";

const About = () => {
    useEffect(() => {
        document.title = 'Naija School Search - About';
      }, []);
  return (
    <div className="about">
      <Navbar type="notHomePage" />
      <div className="about-container">
        <section className="about-section">
          <h1>Welcome to Naija School Search</h1>
          <p className="para">
            Your FREE go-to platform for discovering and
            exploring schools across Nigeria that offer quality education.
          </p>
          <p className="para">
            Our mission is to help you discover schools/training centers where you can enroll your child to get training by providing a
            comprehensive list of schools and training centers in your desired location (state and local government), ensuring that parents make informed decisions about their children's education
          </p>
          <p className="para">
            Explore the diverse range of schools and training centers available on our platform and
            empower yourself with the knowledge to make informed decisions about
            your child's education.
          </p>
          <p className="para">
            If you have any questions, feedback, or if you'd like to contribute
            to our growing list of schools, feel free to reach out to us. Thank
            you for choosing Naija School Search!
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
