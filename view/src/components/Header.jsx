import location from '../assets/location.png';
import search from '../assets/search.jpg';
import { Link } from 'react-router-dom';
import './Home.css';

export default () => {
    return (
        <div className="header">
            <div className='left'>
                <form className='formLeft'>
                    <div className='input-container'>
                        <input type='text' id='title' placeholder='Job title or keyword' />
                        <img src={search} className="input-image" alt="Search Image"></img>
                    </div>
                    <div className='input-container'>
                        <input type='text' id='location' placeholder='Location' />
                        <img src={location} className="input-image" alt="Search Location"></img>
                    </div>
                    <div>
                        <button id='button' type='submit'>Search</button>
                    </div>
                </form>
            </div>
            <div className='right'>
                {sessionStorage.getItem('role') === 'student' ? <Link to="/dashboards">Profile</Link> : <Link to="/dashboard">Profile</Link>}
            </div>
        </div>
    );
}
