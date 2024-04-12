import { useEffect, useState } from 'react';
import Job from './Job';

export default () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost/finalproject/actions/get_all_jobs.php');
                if (!response.ok) {
                    throw new Error('Failed to fetch job data');
                }
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching job data:', error.message);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="body">
            {jobs.map(job => (
                <Job key={job.ID} job={job} />
            ))}
        </div>
    );
}
