import { useEffect, useState } from 'react';
import FeaturedState from '../../components/featured/FeaturedState';
import FeaturedSchool from '../../components/featuredSchool/FeaturedSchool';
import Footer from '../../components/footer/Footer';
// import MailList from '../../components/mailList/mailList';
import Navbar from '../../components/navbar/Navbar';
import Search from '../../components/search/Search';
import './home.css'
import AdvertisementModal from '../../components/advertisementModal/AdvertisementModal';

const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);
  
    useEffect(() => {
        document.title = 'Naija School Search -Home ';
        setModalOpen(true);
      },[]);

      const closeModal = () => {
        setModalOpen(false);
      };
    
    return (
        <div className="home">
            <Navbar/>
            <Search/>
            <FeaturedState/>
            <FeaturedSchool/>
            {/* <MailList/> */}
            <AdvertisementModal isOpen={isModalOpen} closeModal={closeModal} />
            <Footer/>

        </div>
    );
}
 
export default Home;