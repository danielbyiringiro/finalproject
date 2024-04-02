<?php

session_start();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link crossorigin="anonymous" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" rel="stylesheet">
    <script crossorigin="anonymous" src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"></script>
</head>
<body>
    <div id="login_div">
        <p id="login_title">Sign up for Chores</p>
        <form action="../actions/register_user_action.php" method="post" name="login_form" id="login_form">
            <?php 
                if (!empty($_SESSION["errors"])) {
                    echo "<div>";
                    foreach($_SESSION["errors"] as $error)
                    {
                        echo "<p id='error_paragraph'>$error</p><br>";
                    }
                    echo "</div>";
                } 
            ?>
            <div class="name">
                <div class="first_name">
                    <label for="first_name"><strong>First Name</strong></label>
                    <input autofocus placeholder="John" type="text" name="first_name" id="first_name" value="<?php echo isset($_SESSION['signup_data']['first_name']) ? htmlspecialchars($_SESSION['signup_data']['first_name']) : ''; ?>">
                </div>
                <div class="last_name">
                    <label for="last_name"><strong>Last Name</strong></label>
                    <input placeholder="Doe" type="text" name="last_name" id="last_name" value="<?php echo isset($_SESSION['signup_data']['last_name']) ? htmlspecialchars($_SESSION['signup_data']['last_name']) : ''; ?>">
                </div>
            </div>
            <div id="gender_family">
                <div id="gender">
                    <p><strong>Gender</strong></p>
                    <label>
                        <input type="radio" id="male" name="gender">
                        Male
                    </label>
            
                    <label>
                        <input type="radio" id="female" name="gender">
                        Female
                    </label>
                </div>
                <div id="family">
                    <label for="family_role"><strong>Family Role</strong></label>
                    <?php include "../functions/select_role_fxn.php"?>
                </div>
            </div>
            <div class="dob_phone">
                <div class="dob">
                    <label for="DOB"><strong>Date of Birth</strong></label>
                    <input placeholder="Date of Birth" id="DOB" name="DOB" type="date" value="<?php echo isset($_SESSION['signup_data']['DOB']) ? htmlspecialchars($_SESSION['signup_data']['DOB']) : ''; ?>">
                </div>
                <div class="phone">
                    <label for="phone"><strong>Phone Number</strong></label>
                    <input placeholder="+233-12-345-6789" id="phone" name="phone" type="tel" value="<?php echo isset($_SESSION['signup_data']['phone']) ? htmlspecialchars($_SESSION['signup_data']['phone']) : ''; ?>">
                </div>
            </div>
            <input autofocus placeholder="Email" type="text" name="email" id="email" value="<?php echo isset($_SESSION['signup_data']['email']) ? htmlspecialchars($_SESSION['signup_data']['email']) : ''; ?>">
            <input placeholder="Password" type="password" name="password" id="password" value="<?php echo isset($_SESSION['signup_data']['password']) ? htmlspecialchars($_SESSION['signup_data']['password']) : ''; ?>">
            <input placeholder="Confirm Password" type="password" name="confirm_password" id="confirm_password" value="<?php echo isset($_SESSION['signup_data']['confirm_password']) ? htmlspecialchars($_SESSION['signup_data']['confirm_password']) : ''; ?>">
            <input type="hidden" id="genderValue" name="genderValue">
            <button type="submit" name="login_button" id="login_button">Sign Up</button>
        </form>
        <p id="login_ptag">Already have an account? <a href="login_view.php">Sign In</a></p>
    </div>
</body>
</html>
<script>
    function validation()
    {
        const first_name = document.getElementById("first_name");
        const last_name = document.getElementById("last_name");


    }

    document.getElementById("login_form").addEventListener("submit", function(event) {
        var maleChecked = document.getElementById("male").checked;
        var femaleChecked = document.getElementById("female").checked;

        if (maleChecked) {
            document.getElementById("genderValue").value = "0";
        } else if (femaleChecked) {
            document.getElementById("genderValue").value = "1";
        } else {
            // If no gender is selected, prevent form submission
            event.preventDefault();
            alert("Please select your gender.");
        }
    });
</script>
