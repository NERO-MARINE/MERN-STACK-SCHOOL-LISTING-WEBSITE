import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceLaugh} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer_content container">
            <FontAwesomeIcon icon={faFaceLaugh} />
                All Rights Resverved, &copy; Niaja School Search 2023
            </div>
        </div>
    );
}
 
export default Footer;