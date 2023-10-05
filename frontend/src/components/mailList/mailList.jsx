import './mailList.css'

const MailList = () => {
    return (
      <div className="mailList">
          <div className="mail container">
            <h1 className="mailTitle">save time, save money</h1>
            <span className="mailDesc">Sign up to get the best schools near you</span>
            <form className="mailInputContainer flex">
                <input type="text" placeholder='Your Email' />
                <input type="text" placeholder='Your Location' />
                <button>Subscribe</button>
            </form>
        </div>
      </div>
    );
}
 
export default MailList;