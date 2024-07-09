import React from 'react';
import './style.css';
import StreetviewOutlinedIcon from '@mui/icons-material/StreetviewOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
const Contact = () => {
  return (
    <section className="contact-page-sec section-1">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <StreetviewOutlinedIcon />
                </div>
                <div className="contact-info-text">
                  <h2>Address</h2>
                  <span>1215 Lorem Ipsum, Ch 176080 </span>
                  <span>Chandigarh, INDIA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                 <EmailOutlinedIcon/>
                </div>
                <div className="contact-info-text">
                  <h2>E-mail</h2>
                  <span>info@LoremIpsum.com</span>
                  <span>yourmail@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  < AccessTimeFilledOutlinedIcon/>
                </div>
                <div className="contact-info-text">
                  <h2>Office Time</h2>
                  <span>Mon - Thu  9:00 am - 4.00 pm</span>
                  <span>Thu - Mon  10.00 pm - 5.00 pm</span>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="contact-page-form">
              <h2>Get in Touch</h2>
              <form action="contact-mail.php" method="post">
                <div className="row">
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="single-input-field">
                      <input type="text" placeholder="Your Name" name="name" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="single-input-field">
                      <input type="email" placeholder="E-mail" name="email" required />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="single-input-field">
                      <input type="text" placeholder="Phone Number" name="phone" />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="single-input-field">
                      <input type="text" placeholder="Subject" name="subject" />
                    </div>
                  </div>
                  <div className="col-md-12 message-input">
                    <div className="single-input-field">
                      <textarea placeholder="Write Your Message" name="message"></textarea>
                    </div>
                  </div>
                  <div className="single-input-fieldsbtn">
                    <input type="submit" value="Send Now" />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-page-map">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?q=First+Floor,+Ivory+Building,+Opposite+Palace+Mall,+22+Nii+Martey+Tsuru+St,+Accra&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                width="100%"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                title="Company Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
