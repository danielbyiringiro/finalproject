import { useState } from "react";

export default () =>
{

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    role: 'select'
  });

  const handleInputChange = (e) =>
  {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    console.log(formData);

    const response = await fetch('http://localhost/finalproject/actions/signup_user.php', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <>
    <div id="signup_div">
        <p id="signup_title">Sign up for CareerConnect</p>
        <form method="post" name="signup_form" id="signup_form">
            <input autoFocus placeholder='Name' type="text" name="name" id="name" value={formData.name} onChange={handleInputChange}/>
            <input placeholder="Email" type="text" name="email" id="email" value={formData.email} onChange={handleInputChange}/>
            <input placeholder="Password" type="password" name="password" id="password" value={formData.password} onChange={handleInputChange}/>
            <input placeholder="Confirm Password" type="password" name="confirm_password" id="confirm_password" value={formData.confirm_password} onChange={handleInputChange}/>
            <select name="role" id="role" value={formData.role} onChange={handleInputChange}>
                <option disabled value="select">Role</option>
                <option value="student">Job Seeker</option>
                <option value="employer">Employer</option>
            </select>
            <button type="submit" name="signup_button" id="signup_button" onClick={handleSubmit}>Sign Up</button>
        </form>
        <p id="login_ptag">Already have an account? <a id="login_atag" href="">Sign In</a></p>
    </div>
    </>
  );
}