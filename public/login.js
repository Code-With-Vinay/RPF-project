const loadani = document.querySelector('.loadani');
console.log(loadani);
loadani.addEventListener('click', () => {
    loadani.classList.add('active');
    setTimeout(() => {
        loadani.classList.remove('active');
        generateCaptcha()
    }, 1000);
});



document.addEventListener('DOMContentLoaded', async function() {
  generateCaptcha();
  checkName();

    let email ='ipfvskpwat@wat.railnet.gov.in'
    let password ='password'
});


document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const captchaText = document.getElementById('captcha-text').textContent;
  const input = document.getElementById('captcha-input').value
  const email = document.getElementById('username').value 
  const password = document.getElementById('password').value

  if (input !== captchaText) {
      document.querySelector('.error').innerHTML = 'Captcha does not match';
      setTimeout(() => {
          document.querySelector('.error').innerHTML = '';
          document.getElementById('captcha-input').value = ''

      }, 5000);
      generateCaptcha();
      return;
  }

  document.querySelector('.login').style.display = 'none';
  document.querySelector('.loading').style.display = 'flex';

  try {
    const response = await fetch("", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
  });
      setTimeout(() => {
          document.querySelector('.loading').style.display = 'none';
          if (response.ok) {
            response.json().then((data) => {
                console.log(data);
                  const keysToSet = ['name', 'role', 'designation', 'branch', 'username', 'zone', 'email'];
                  keysToSet.forEach(key => {
                      if (data[key]) {
                          localStorage.setItem(key, data[key]);
                      }
                  });
                  setExpiration();
                  window.location.href = 'form.html';
              });
          } else {
              document.querySelector('.login').style.display = 'flex';
              document.querySelector('.loading').style.display = 'none';
              generateCaptcha();
              document.getElementById('captcha-input').value = '';
              document.querySelector('.error').innerHTML = 'Invalid Credentials or Captcha';
              setTimeout(() => {
                  document.querySelector('.error').innerHTML = '';
              }, 5000);
          }
      }, 500);
  } catch (error) {
      console.error('Error:', error);
      document.querySelector('.login').style.display = 'flex';
      document.querySelector('.loading').style.display = 'none';
      generateCaptcha();
      document.getElementById('captcha-input').value = '';
      document.querySelector('.error').innerHTML = 'An error occurred. Please try again.';
      setTimeout(() => {
          document.querySelector('.error').innerHTML = '';
      }, 5000);
  }
});

function generateCaptcha() {
  const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVZ';
  let captcha = chars[Math.floor(Math.random() * chars.length)];

  for (let i = 0; i < 4; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
  }
  document.getElementById('captcha-text').textContent = captcha;
}

function setExpiration() {
  const now = new Date();
  const expires = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime();
  localStorage.setItem('expiration', expires);
}

function checkName() {
  const expiration = localStorage.getItem('name');
  let currenttime = new Date().getTime()
  if (expiration) {
      // window.location.href = 'index.html';
      navigateToHome()
  } else {
   return
  }
}

function navigateToHome() {
  const linkHref = 'form.html'
  document.querySelector('.loading').style.display = 'flex';
  document.querySelector('.container').style.display = 'none';
  setTimeout(() => {
  document.querySelector('.loading').style.display = 'none';
  window.location.href = linkHref;
  }, 2000);
}
