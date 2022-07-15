import classes from './newsletter-registration.module.css';
import { useState, useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';


function NewsletterRegistration() {
  const emailRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  const [registrationResponse, setRegistrationResponse] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    // if email is not valid, do not submit
    if (!email || !email.includes('@')) {
      return;
    }

    notificationCtx.showNotification({
      title: 'Signing Up',
      message: `Registering ${email}`,
      status: 'pending'
    });
    // submit email to /api/newsletter-registration and read response from server

    fetch('/api/newsletter-registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        // if response is not valid, do not submit
        if (!data || !data.message) {
          return;
        }
        // log message to console
        console.log(data.message);
        notificationCtx.showNotification({
          title: 'Success!',
          message: `Successful Registration for ${email}`,
          status: 'success'
        });
        // set registration response to message
        setRegistrationResponse(data.message);
      }
        // if error, log error to console
      ).catch((err) => console.log(err));


  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button>Register</button>

        </div>
      </form>
      <br />
      <span id="registration-response">{registrationResponse}</span>

    </section>
  );
}

export default NewsletterRegistration;
