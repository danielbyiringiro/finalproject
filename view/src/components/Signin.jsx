export default ({onSignupClick}) =>
{
  return (
    <>
      <div id="login_div">
        <p id="login_title">Sign In CareerConnect</p>
        <form method="post" name="login_form" id="login_form">
            <input autoFocus placeholder="Email" type="text" name="email" id="email_login" ></input>
            <input placeholder="Password" type="password" name="password" id="password"></input>
            <button type="submit" name="signup_button" id="signup_button">Sign In</button>
        </form>
        <p id="login_ptag">No account? <a id="login_atag" href="#" onClick={onSignupClick}>Create one</a></p>
      </div>
    </>
  );
}