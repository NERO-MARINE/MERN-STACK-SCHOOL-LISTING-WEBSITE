import './advertisementModal.css'
import ReactModal from 'react-modal';

const AdvertisementModal = ({ isOpen, closeModal }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Advertisement Modal"
      className="advertisement-modal" // Apply a class for styling
      appElement={document.getElementById('root')} 
    >
      {/* Your advertisement content goes here */}
      <div>
        <h2>Special Offer!</h2>
        <p>Don't miss out on our exclusive deals!</p>
        <p>Do you need an <b>AFFORDABLE</b> school website, school portal, school management system or a business website?</p>
        <p>Do you need a Data Analyst to help you collect data from your <span style={{color: "red"}}>targeted audience</span>, or to extract insights from your data?</p>
        <p>Contact us today!</p>
      </div>
      <button onClick={closeModal}>Close</button>
    </ReactModal>
  );
};

// modal is used in the home page

export default AdvertisementModal;

