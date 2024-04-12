import { useHistory, useParams } from "react-router-dom"; // Correct import statement
import { useState } from "react";
import './Signin.css';

export default () => {
  const { jobId } = useParams();

  const [formData, setFormData] = useState({
    years: '',
    motivation: '',
    jobId: jobId, 
    applicantId: sessionStorage.getItem('id')
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/finalproject/actions/applyjob.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }

      const data = await response.json();

      if (data.status === 'error') {
        setErrors({ password: data.message });
        return;
      } else if (data.status === 'success') {
        setFormData({
          years: '',
          motivation: '',
          jobId: '',
          applicantId: ''
        });
        history.push('/');
      }
    } catch (error) {
      console.error('Error submitting form data:', error.message);
    }
  }

  return (
    <>
      <div id="login_div">
        <p id="login_title">Apply</p>
        <form method="post" name="login_form" id="login_form" onSubmit={handleSubmit}>
          <input autoFocus placeholder="Years of Experience" type="text" name="years" id="years" value={formData.years} onChange={handleInputChange} />
          <input autoComplete="off" placeholder="Motivation to apply" type="text" name="motivation" id="motivation" value={formData.motivation} onChange={handleInputChange} />
          <button type="submit" name="signup_button" id="signup_button">Submit Application</button>
        </form>
      </div>
    </>
  );
}
