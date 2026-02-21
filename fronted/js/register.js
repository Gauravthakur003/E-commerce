const registerForm = document.getElementById("registerForm");
const registerCard = document.getElementById("registerCard");
const otpCard = document.getElementById("otpCard");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registerCard.classList.add("hidden");
  otpCard.classList.remove("hidden");
});

/* Auto move OTP input */
const otpInputs = document.querySelectorAll(".otp-box input");

otpInputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    if (input.value && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
  });
});


document.getElementById("registerForm").addEventListener("submit", async e => {
  e.preventDefault();

  const user = {
    name: name.value,
    email: email.value,
    password: password.value
  };

  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (res.ok) {
    alert("Registered Successfully");
    window.location.href = "login.html";
  }
});
