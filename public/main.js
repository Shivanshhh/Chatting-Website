/* eslint-env jquery */

$(document).ready(() => {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      $.ajax({
        method: 'POST',
        url: '/login',
        data: {
          email,
          password,
        },
        success: (res) => {
          if (res.status === 'valid-password') {
            window.location.replace('/chatroom');
            return;
          }
          if (res.status === 'wrong-password') {
            document.getElementById('passerror').style.display = 'block';
            return;
          }
          if (res.status === 'invalid-email') {
            document.getElementById('emerror').style.display = 'block';
          }
        },
      });
    });
  });
  