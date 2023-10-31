// import Chart from '../../components/chart/Chart';
// import Featured from '../../components/featured/Featured';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import SalesList from '../../components/table/Table';
import Widget from '../../components/widget/Widget';
import useFetch from '../../hooks/useFetch';
import './home.scss'
const Home = () => {
     const { apiData } = useFetch('http://localhost:5000/users/')
     const { apiData: numApprovedSchools} = useFetch('http://localhost:5000/schools/approvedSchools?approved=true')
    const { apiData: numFeaturedSchools} = useFetch('http://localhost:5000/schools/featuredSchools?featured=true')
    const {apiData: allSchools} = useFetch('http://localhost:5000/schools/count/countAllschools')

    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <div className="widgets">
                    <Widget type="user" numUser={apiData}/>
                    <Widget type="school" allSchools={allSchools}/>
                    <Widget type="approved" numApprovedSchools={numApprovedSchools}/>
                    <Widget type="featured" numFeaturedSchools= {numFeaturedSchools}/>
                </div>
                {/* <div className="charts">
                    <Featured/>
                    <Chart aspect={2/1} title="Last 6 Months(Revenue)"/>
                </div> */}
                <div className="listContainer">
                    <div className="listTitle">Featured Schools</div>
                    <SalesList/>
                </div>
            </div>
        </div>
    );
}
 
export default Home;