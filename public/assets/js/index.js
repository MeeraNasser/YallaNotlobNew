$("#signInBtn").click(function () {
    var logInEmail = $(".logEmail").val()
    console.log("name ",logInEmail);
    localStorage.setItem("LogInEmail",logInEmail);
});


$("#signUpBtn").click(function () {
    var logInEmail = $(".logEmail").val()
    console.log("name ",logInEmail);
    localStorage.setItem("LogInEmail",logInEmail);
});
