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

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
        workArrangement: 'select',
        jobType: 'select',
        employerID: sessionStorage.getItem('id')
      });

    const [errors, setErrors] = useState({});
    
    const handleInputChange = (e) =>
    {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        console.log(formData);

        const newErrors = {};

        if (!formData.title) 
        {
          newErrors.title = 'Please enter the job name.';
        }
    
        if (!formData.description) 
        {
          newErrors.description = 'Please enter the job description.';
        }
    
        if (!formData.location) 
        {
          newErrors.location = 'Please enter the job location.';
        }
    
        if (!formData.salary) 
        {
          newErrors.salary = 'Please enter the job salary';
        }
    
        if (formData.jobType === 'select') 
        {
          newErrors.jobType = 'Please enter the job type';
        }
    
        if (formData.workArrangement === 'select') 
        {
          newErrors.workArrangement = 'Please select the working arrangement.';
        }
    
        if (Object.keys(newErrors).length > 0)
        {
          setErrors(newErrors);
          return;
        }

        try
        {
            const response = await fetch('http://localhost/finalproject/actions/create_job.php', 
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
        }

        catch (error)
        {
          console.error('Error submitting form data:', error.message);
        }

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

    const createNewJob = () =>
    {
        return(
            <>
                <div className='secondfirst'>
                    <p className='text-2xl'>Create a New Job</p>
                    <form>
                        <div className='flex flex-col'>
                            <label htmlFor='title'>Title</label>
                            <input name="title" value={formData.title} onChange={handleInputChange} className={`pl-4 outline-none mt-2 mb-2 ${errors.title ? 'input-error shake' : ''}`} type='text' placeholder='Software Engineer'/>
                            {errors.title && <div className="error-message">{errors.title}</div>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='location'>Location</label>
                            <input name="location" value={formData.location} onChange={handleInputChange} className={`pl-4 outline-none mt-2 mb-2 ${errors.location ? 'input-error shake' : ''}`} type='text' placeholder='Westminster, California, United States'/>
                            {errors.location && <div className="error-message">{errors.location}</div>}
                        </div>
                        <div className='flex flex-col mt-2'>
                            <label htmlFor="jobType">Job Type:</label>
                            <select className={`pl-4 outline-none mt-2 mb-2 ${errors.jobType ? 'input-error shake' : ''}`} id="jobType" name="jobType" value={formData.jobType} onChange={handleInputChange}>
                            <option value="select">Select</option>
                            <option value="fullTime">Full Time</option>
                            <option value="contract">Contract</option>
                            <option value="partTime">Part Time</option>
                            <option value="internship">Internship</option>
                            </select>
                            {errors.jobType && <div className="error-message">{errors.jobType}</div>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="description">Job Description</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} className={`pl-4 resize-none border-2 border-black outline-none ${errors.description ? 'input-error shake' : ''}`} id='textarea'/>
                            {errors.description && <div className="error-message">{errors.description}</div>}
                        </div>
                        <div className='flex flex-col mt-2'>
                            <label htmlFor="workArrangement">Work Arrangement</label>
                            <select className={`mt-2 mb-2 ${errors.workArrangement ? 'input-error shake' : ''}`} id="workArrangement" name="workArrangement" value={formData.workArrangement} onChange={handleInputChange}>
                                <option value="select">Select</option>
                                <option value="onsite">On-site</option>
                                <option value="remote">Remote</option>
                            </select>
                            {errors.workArrangement && <div className="error-message">{errors.workArrangement}</div>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='title'>Salary per Hour in ($)</label>
                            <input name="salary" value={formData.salary} onChange={handleInputChange} type='text' className={`pl-4 outline-none mt-2 ${errors.salary ? 'input-error shake' : ''}`} placeholder='$15'/>
                            {errors.salary && <div className="error-message">{errors.salary}</div>}
                        </div>
                        <div className='mt-2 items-center'>
                            <button onClick={handleSubmit} type='submit' className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>Create</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }

    return (
        <div className="mainDiv">
            <div className="first">
                <div className="company">
                    <p className='font-bold text-2xl'>CareerConnect</p>
                </div>
                <div className='second_div flex flex-col justify-between'>
                    <div className='firstfirst mt-5'>
                        <div className="flex flex-row gap-2 items-center">
                            <img src={plus} className='w-7 h-7'/>
                            <p className="text-green-600 hover:cursor-pointer hover:text-blue-500 hover:underline">Create a Job</p>
                        </div>
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
                {createNewJob()}
            </div>
        </div>
    )
}