import { useHistory, Link } from "react-router-dom"; 
import { useState } from "react";
import './Signin.css';

export default () =>
{

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    code: ''
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

    const newErrors = {};

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
      const response = await fetch('http://localhost/thewell/actions/check_email.php', 
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

      if (data.status === 'success')
      {
        newErrors.email = 'No account found with this email. Please sign up.';
      }
    }

    if (!formData.password)
    {
      newErrors.password = 'Please enter your password.';
    }

    if (!formData.code)
    {
      newErrors.code = 'Please enter the authentication code.'
    }

    else
    {
      const response = await fetch("http://localhost/thewell/actions/check_code.php",
        {
          method: 'POST',
          headers: 
          {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: formData.email, code: formData.code })
        });
      
        if (!response.ok)
          {
            throw new Error("Failed to submit form")
          }

        const data = await response.json()

        if (data.status ==='error')
          {
            newErrors.code = data.message
          }
    }

    if (Object.keys(newErrors).length > 0)
    {
      setErrors(newErrors);
      return;
    }

    try
    {
      const response = await fetch('http://localhost/thewell/actions/auth_user.php',
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

      if (data.status === 'error')
      {
        setErrors({ password: data.message });
        return;
      }
      else if (data.status === 'success')
      {
        setFormData({
          email: '',
          password: '',
          code: ''
        });
        setErrors({});
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('name', data.user_data['NAME']);
        sessionStorage.setItem('username', data.user_data['USERNAME']);
        sessionStorage.setItem('id', data.user_data['ID']);
        sessionStorage.setItem('email', data.user_data['EMAIL']);
        history.push('/');
      }
    }
    catch (error)
    {
      console.error('Error submitting form data:', error.message);
    }
  }

  return (
    <>
      <div id="login_div">
        <p id="login_title">Authenticate Email</p>
        <form method="post" name="login_form" id="login_form" onSubmit={handleSubmit}>
            <input autoFocus placeholder="Email" type="text" name="email" id="email_login" value={formData.email} onChange={handleInputChange} className={errors.email ? 'input-error shake' : ''}/>
            {errors.email && <div className="error-message">{errors.email}</div>}
            <input autoFocus placeholder="Auth Code" type="number" name="code" id="code" value={formData.code} onChange={handleInputChange} className={errors.code ? 'input-error shake' : ''}/>
            {errors.code && <div className="error-message">{errors.code}</div>}
            <input autoComplete="off" placeholder="Password" type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} className={errors.password ? 'input-error shake' : ''}/>
            {errors.password && <div className="error-message">{errors.password}</div>}
            <button type="submit" name="signup_button" id="signup_button">Authenticate</button>
        </form>
        <p id="login_ptag">
          No account? <Link id="login_atag" to="/signup">Create one</Link>
        </p>
      </div>
    </>
  );
}