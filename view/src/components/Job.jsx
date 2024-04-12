import logo from '../assets/logo.png';
import bookmark from '../assets/bookmark.png';
import dollar from '../assets/dollar.png';
import bag from '../assets/bag.png';
import './Home.css'; 

export default () =>
{
    return (
        <div className='jobcard'>
            <div className='jobheader'>
                <div>
                    <img src={logo} id='logo'></img>
                </div>
                <div className='jobright'>
                    <button id='jobbutton'>Apply</button>
                    <img src={bookmark} id='bookmark' />
                </div>
            </div>
            <div className='jobtitle'>
                <p id='jobtitle'>Oracle EBS Developer</p>
                <p id='companyinfo'>InfoTech Innovators | Westminster, California, United States</p>
            </div>
            <div className='extrainfo'>
                <p id='salary'>
                    <img src={dollar} id='dollar'></img>
                    $30 per hour
                </p>
                <p id='jobtype'>
                    <img src={bag} id='bag'></img>
                    Contractor | On-site
                </p>
            </div>
            <div className='jobdescribe'>
                <p>As an oracle EBS Developer, you will be responsible for developing, customising, maintaining and supporting Oracle E-Business setup.</p>
                <button id='view_details'>View Details</button>
            </div>
        </div>

    )
}