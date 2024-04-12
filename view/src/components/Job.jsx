import logo from '../assets/logo.png';
import bookmark from '../assets/bookmark.png';
import dollar from '../assets/dollar.png';
import bag from '../assets/bag.png';
import './Home.css'; 
import { useHistory } from 'react-router-dom';

export default ({ job }) => 
{
    const history = useHistory();
    
    const applyForJob = () => 
    {
        history.push(`/apply/${job.ID}`);
    };

    const handleApplyButtonClick = () => {
        applyForJob();
    };
    return (
        <div className='jobcard'>
            <div className='jobheader'>
                <div>
                    <img src={logo} id='logo' alt="Company Logo" />
                </div>
                <div className='jobright'>
                    <button id='jobbutton' onClick={handleApplyButtonClick}>Apply</button>
                    <img src={bookmark} id='bookmark' alt="Bookmark" />
                </div>
            </div>
            <div className='jobtitle'>
                <p id='jobtitle'>{job.TITLE}</p>
                <p id='companyinfo'>{job.LOCATION}</p>
            </div>
            <div className='extrainfo'>
                <p id='salary'>
                    <img src={dollar} id='dollar' alt="Salary" />
                    {job.SALARY} per hour
                </p>
                <p id='jobtype'>
                    <img src={bag} id='bag' alt="Job Type" />
                    {job.TYPE} | {job.ARRANGEMENT}
                </p>
            </div>
            <div className='jobdescribe'>
                <p>{job.DESCRIPTION}</p>
                <button id='view_details'>View Details</button>
            </div>
        </div>
    );
}
