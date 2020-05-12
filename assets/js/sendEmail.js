
function sendEmail(contactForm) {
    console.log("this ehat I get",contactForm);
     emailjs.send("r_preiks_gmail_com", "holiday", 
     {"from_name":contactForm.name.value,
        "from_email":contactForm.email.value,
        "holiday_request":contactForm.textarea.value
    })
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
  return false;
}