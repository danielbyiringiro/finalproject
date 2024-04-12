import { useState } from "react";
import { useHistory, Link } from "react-router-dom"; 
import './Signup.css';

export default () =>
{

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    role: 'select'
  });

  const history = useHistory();

  const handleInputChange = (e) =>
  {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const [errors, setErrors] = useState({}); // Track input errors

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    // console.log(formData);

    // Validate form fields
    const newErrors = {};

    if (!formData.name) 
    {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email) 
    {
      newErrors.email = 'Please enter your email.';
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    {
      newErrors.email = 'Please enter a valid email address.';
    }
    else
    {
      const response = await fetch('http://localhost/finalproject/actions/check_email.php', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email })
      });

      if (!response.ok) 
      {
        throw new Error('Failed to submit form data');
      }

      const data = await response.json();

      if (data.status === 'error') 
      {
        newErrors.email = 'Email address is already in use.';
      }
    }

    if (!formData.password) 
    {
      newErrors.password = 'Please enter your password.';
    }
    else if (formData.password.length < 8)
    {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    if (!formData.confirm_password) 
    {
      newErrors.confirm_password = 'Please confirm your password.';
    }

    if (formData.password !== formData.confirm_password) 
    {
      newErrors.confirm_password = 'Passwords do not match.';
    }

    if (formData.role === 'select') 
    {
      newErrors.role = 'Please select a role.';
    }

    if (Object.keys(newErrors).length > 0)
    {
      setErrors(newErrors);
      return;
    }

    try
    {
      const response = await fetch('http://localhost/finalproject/actions/signup_user.php', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) 
      {
        throw new Error('Failed to submit form data');
      }

      const data = await response.json();
      if (data.status === 'success')
      {
        setFormData({
          name: '',
          email: '',
          password: '',
          confirm_password: '',
          role: 'select'
        });
        setErrors({});
        history.push('/signin');
      }
    }
    catch (error)
    {
      console.error('Error submitting form data:', error.message);
    }
  }

  return (
    <>
      <div id="signup_div">
        <p id="signup_title">Sign up for CareerConnect</p>
        <form method="post" name="signup_form" id="signup_form">
          <input autoFocus placeholder='Name' type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className={errors.name ? 'input-error shake' : ''}/>
          {errors.name && <div className="error-message">{errors.name}</div>}
          <input placeholder="Email" type="text" name="email" id="email" value={formData.email} onChange={handleInputChange} className={errors.email ? 'input-error shake' : ''}/>
          {errors.email && <div className="error-message">{errors.email}</div>}
          <input placeholder="Password" type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} className={errors.password ? 'input-error shake' : ''}/>
          {errors.password && <div className="error-message">{errors.password}</div>}
          <input placeholder="Confirm Password" type="password" name="confirm_password" id="confirm_password" value={formData.confirm_password} onChange={handleInputChange} className={errors.confirm_password ? 'input-error shake' : ''}/>
          {errors.confirm_password && <div className="error-message">{errors.confirm_password}</div>}
          <select name="role" id="role" value={formData.role} onChange={handleInputChange} className={errors.role ? 'input-error shake' : ''}>
            <option disabled value="select">Role</option>
            <option value="student">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
          {errors.role && <div className="error-message">{errors.role}</div>}
          <button type="submit" name="signup_button" id="signup_button" onClick={handleSubmit}>Sign Up</button>
        </form>
        <p id="login_ptag">
          Already have an account? <Link id="login_atag" to="/signin">Sign In</Link>
        </p>
      </div>
    </>
  );
}