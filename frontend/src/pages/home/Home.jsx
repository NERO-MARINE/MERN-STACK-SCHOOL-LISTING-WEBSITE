import FeaturedState from '../../components/featured/FeaturedState';
import FeaturedSchool from '../../components/featuredSchool/FeaturedSchool';
import Footer from '../../components/footer/Footer';
import MailList from '../../components/mailList/mailList';
import Navbar from '../../components/navbar/Navbar';
import Search from '../../components/search/Search';
import './home.css'

const Home = () => {
  
    return (
        <div className="home">
            <Navbar/>
            <Search/>
            <FeaturedState/>
            <FeaturedSchool/>
            <MailList/>
            <Footer/>
        </div>
    );
}
 
export default Home;