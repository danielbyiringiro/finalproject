import './Dashboard.css';
import plus from '../assets/plus.png';
import clip from '../assets/checklist.png';
import logout from '../assets/check-out.png';
import profile from '../assets/default.png';
import back from '../assets/back.png';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

export default () =>
{
    const history = useHistory();
    
    const handleInputChange = (e) =>
    {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }  

    const handleLogout = () =>
    {
        sessionStorage.clear();
        history.push('/signin');
    }

    const handleBackToMain = () =>
    {
        history.push('/');
    }

    const viewProfile = () => {
        return (
            <>
                <div className='secondfirst'>
                    <p className='text-2xl'>User Profile</p>
                    <div className='userdetails'>
                        <div className='name flex flex-row'>
                            <p className='text-green-600 text-xl'>Name</p>                           
                            <p>{sessionStorage.getItem('name')}</p>
                        </div>
                        <div className='role flex flex-row'>
                            <p className='text-green-600 text-xl'>Role</p>
                            <p>Job Seeker</p>
                        </div>
                        <div className='email flex flex-row gap-10'>
                            <p className='text-green-600 text-xl'>Email</p>
                            <p>{sessionStorage.getItem('email')}</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    
    const viewApplications = () =>
    {
        
    }

    return (
        <div className="mainDiv">
            <div className="first">
                <div className="company">
                    <p className='font-bold text-2xl'>CareerConnect</p>
                </div>
                <div className='second_div flex flex-col justify-between'>
                    <div className='firstfirst mt-5'>
                        <div className="flex flex-row gap-2 mt-3 items-center">
                            <img src={clip} className='w-7 h-7'/>
                            <p className="text-green-600 hover:cursor-pointer hover:text-blue-500 hover:underline">View Applications</p>
                        </div>
                        <div className="flex flex-row gap-2 mt-3 items-center">
                            <img src={back} className='w-7 h-7'/>
                            <p onClick={handleBackToMain} className="text-green-600 hover:cursor-pointer hover:text-blue-500 hover:underline">Back to Main</p>
                        </div>
                        <div className="flex flex-row gap-2 mt-3 items-center">
                            <img src={logout} className='w-7 h-7'/>
                            <p onClick={handleLogout} className="text-green-600 hover:cursor-pointer hover:text-blue-500 hover:underline">Logout</p>
                        </div>
                    </div>
                    <div className='firstsecond'>
                        <div className="flex flex-row gap-2 mt-3 mb-5 items-center">
                            <img src={profile} className='w-10 h-10'/>
                            <div>
                                <p>{sessionStorage.getItem('name')}</p>
                                <p className="text-green-600 hover:cursor-pointer hover:text-blue-500 hover:underline">View Profile</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="second">
                {viewProfile()}
            </div>
        </div>
    )
}