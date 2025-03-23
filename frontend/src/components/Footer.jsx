// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() { 
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: 'black' }}>
      <MDBContainer className='p-4'>
        {/* Social Media Links */}
        <section className='mb-4'>
          <MDBRow className='justify-content-center'>
            <MDBBtn outline color="light" floating className='m-1' href='https://facebook.com' role='button'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='https://twitter.com' role='button'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='https://instagram.com' role='button'>
              <MDBIcon fab icon='instagram' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='https://linkedin.com' role='button'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='https://github.com' role='button'>
              <MDBIcon fab icon='github' />
            </MDBBtn>
          </MDBRow>
        </section>

        {/* Newsletter Signup */}
        <section>
          <form action=''>
            <MDBRow className='d-flex justify-content-center'>
              <MDBCol size="auto">
                <p className='pt-2'><strong>Sign up for our newsletter</strong></p>
              </MDBCol>

              <MDBCol md='5'>
                <MDBInput contrast type='email' label='Email address' className='mb-4' />
              </MDBCol>

              <MDBCol size="auto">
                <MDBBtn outline color='light' type='submit' className='mb-4'>
                  Subscribe
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
        </section>

        {/* Informational Text */}
        <section className='mb-4'>
          <p>
            Join our community and explore exclusive artwork. Get notified about upcoming auctions and new releases.
          </p>
        </section>

        {/* Navigation Links */}
        <section>
          <MDBRow className='justify-content-center'>
            <MDBCol lg='3' md='6' className='mb-4'>
              <h5 className='text-uppercase'>Explore</h5>
              <ul className='list-unstyled mb-0 text-center'>
                <li><Link to='/about' className='text-white'>About Us</Link></li>
                <li><Link to='/contact' className='text-white'>Contact</Link></li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4'>
              <h5 className='text-uppercase'>Support</h5>
              <ul className='list-unstyled mb-0 text-center'>
                <li><Link to='/privacy' className='text-white'>Privacy Policy  </Link></li>
                <li><Link to='/terms' className='text-white'>Terms of Service</Link></li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4'>
              <h5 className='text-uppercase'>Get in Touch</h5>
              <ul className='list-unstyled mb-0 text-center'>
                <li>Email: <a href='mailto:support@artbid.com' className='text-white'>support@artbid.com</a></li>
                <li>Phone: <a href='tel:+123456789' className='text-white'>(+1) 234-567-89</a></li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      {/* Copyright */}
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} ArtBid. All rights reserved. 
        <a className='text-white' href='/'> ArtBid.com</a>
      </div>
    </MDBFooter>
  );
}