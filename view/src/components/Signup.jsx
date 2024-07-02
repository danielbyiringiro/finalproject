import { useState } from "react";
import { useHistory, Link } from "react-router-dom"; 
import './Signup.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    class: 'select',
    major: 'select',
    student_id: '',
    confirm_password: ''
  });

  const history = useHistory();
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.username) 
    {
      newErrors.username = 'Please enter your username.';
    }
    else
    {
      try
      {
        const response = await fetch('http://localhost/thewell/actions/check_username.php', 
        {
          method: 'POST',
          headers: 
          {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: formData.username })
        });

        if (!response.ok) {
          throw new Error('Failed to check username');
        }

        const data = await response.json();

        if (data.status === 'error') 
        {
          newErrors.username = 'Username is already in use.';
        }

      }
      catch (error)
      {
        console.error('Error checking username:', error.message);
        newErrors.email = 'Error checking username.';
      }

    }

    if (!formData.email) 
    {
      newErrors.email = 'Please enter your email.';
    } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) 
    {
      newErrors.email = 'Please enter a valid email address.';
    }
    else if (!formData.email.endsWith("ashesi.edu.gh"))
    {
        newErrors.email = 'Please use your Ashesi email address.';
    }
    else {
      try {
        const response = await fetch('http://localhost/thewell/actions/check_email.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: formData.email })
        });

        if (!response.ok) {
          throw new Error('Failed to check email');
        }

        const data = await response.json();

        if (data.status === 'error') 
        {
          newErrors.email = 'Email address is already in use.';
        }
      } catch (error) {
        console.error('Error checking email:', error.message);
        newErrors.email = 'Error checking email.';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = 'Please confirm your password.';
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match.';
    }

    if (formData.class === 'select') {
      newErrors.class = 'Please select a class.';
    }

    if (formData.major === 'select') {
      newErrors.major = 'Please select a major.';
    }

    if (!formData.student_id) {
      newErrors.student_id = 'Please enter your student ID.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try 
    {
      const response = await fetch('http://localhost/thewell/actions/signup_user.php', 
      {
        method: 'POST',
        headers: 
        {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) 
      {
        throw new Error('Failed to submit form data for signup');
      }

      const data = await response.json();
      if (data.status === 'success') 
      {
        setFormData({
          name: '',
          username: '',
          class: 'select',
          major: 'select',
          student_id: '',
          email: '',
          password: '',
          confirm_password: ''
        });
        setErrors({});
        history.push('/auth');
      } 
      else 
      {
        console.log(data.message)
        setErrors({ form: 'Signup failed. Please try again.' });
      }
    } 
    catch (error) 
    {
      console.error('Error submitting form data:', error.message);
    }
  }

  return (
    <div id="signup_div">
      <p id="signup_title">Sign up for TheWell</p>
      <form method="post" name="signup_form" id="signup_form" onSubmit={handleSubmit}>
        <input
          autoFocus
          placeholder='Name'
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          className={errors.name ? 'input-error shake' : ''}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
        <input
          placeholder='User Name'
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleInputChange}
          className={errors.username ? 'input-error shake' : ''}
        />
        {errors.username && <div className="error-message">{errors.username}</div>}
        <input
          placeholder="Email"
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? 'input-error shake' : ''}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
        <input
          placeholder="Student ID"
          type="number"
          name="student_id"
          id="student_id"
          value={formData.student_id}
          onChange={handleInputChange}
          className={errors.student_id ? 'input-error shake' : ''}
        />
        {errors.student_id && <div className="error-message">{errors.student_id}</div>}
        <select
          name="class"
          id="class"
          value={formData.class}
          onChange={handleInputChange}
          className={errors.class ? 'input-error shake' : ''}
        >
          <option disabled value="select">Class</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
        {errors.class && <div className="error-message">{errors.class}</div>}
        <select
          name="major"
          id="major"
          value={formData.major}
          onChange={handleInputChange}
          className={errors.major ? 'input-error shake' : ''}
        >
          <option disabled value="select">Major</option>
          <option value="ba">Business Administration</option>
          <option value="cs">Computer Science</option>
          <option value="me">Mechanical Engineering</option>
          <option value="mis">Management Information Science</option>
          <option value="mec">Mechatronics Engineering</option>
          <option value="ce">Computer Engineering</option>
          <option value="eee">Electrical and Electronics Engineering</option>
        </select>
        {errors.major && <div className="error-message">{errors.major}</div>}
        <input
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
          className={errors.password ? 'input-error shake' : ''}
        />
        {errors.password && <div className="error-message">{errors.password}</div>}
        <input
          placeholder="Confirm Password"
          type="password"
          name="confirm_password"
          id="confirm_password"
          value={formData.confirm_password}
          onChange={handleInputChange}
          className={errors.confirm_password ? 'input-error shake' : ''}
        />
        {errors.confirm_password && <div className="error-message">{errors.confirm_password}</div>}
        <button type="submit" name="signup_button" id="signup_button">Sign Up</button>
        {errors.form && <div className="error-message">{errors.form}</div>}
      </form>
      <p id="login_ptag">
        Already have an account? <Link id="login_atag" to="/signin">Sign In</Link>
      </p>
    </div>
  );
}
