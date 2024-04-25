// For Sigin
let SubmitBtn = document.getElementById('Submit')
SubmitBtn.addEventListener( 'click' , () => {
    event.preventDefault();
   const FirstName = document.getElementById('FirstName').value
   const LastName = document.getElementById('LastName').value
   const Email = document.getElementById('exampleInputEmail1').value
    const Password = document.getElementById('inputPassword5').value

    //ckecking input is empty or not a empty
    FirstNameVerificatioin(FirstName)
    LastNameVerification(LastName)
    EmailVerification(Email)
    PasswordVerification(Password)

});



function FirstNameVerificatioin(FirstName) {
    if (FirstName == ''){
        let FirstNameError = document.getElementById('FirstError')
        FirstNameError.textContent = 'Enter Your First Name'
    }
    else{
        console.log(FirstName);
    }
}

function LastNameVerification(LastName) {
    if (LastName == ''){
        let LastErrorError = document.getElementById('LastError')
        LastErrorError.textContent = 'Enter Your Last Name'
    }
    else{
        console.log(LastName);
    }
}

function EmailVerification(Email) {
    if(Email == ''){
        let EmailErrorError = document.getElementById('EmailtError')
        EmailErrorError.textContent = 'Enter Your Email Name'
    }
    if (Email != ''){
        const EmailFormat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (Email.match(EmailFormat)){
            console.log(Email);
        }
        else{
            let EmailErrorError = document.getElementById('EmailtError')
            EmailErrorError.textContent = 'Invalid Email'
        }
    }
}


function PasswordVerification(Password) {
    if (Password == ''){
        let EmailErrorError = document.getElementById('PasswordError')
        EmailErrorError.textContent = 'Enter your password'
    }
    if (Password != ''){
        const PasswordFprmat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if(Password.match(PasswordFprmat)){
            console.log(Password);
        }
        else{
            let EmailErrorError = document.getElementById('PasswordError')
        EmailErrorError.textContent = 'Enter Password as for the format'
        }
    }
}





