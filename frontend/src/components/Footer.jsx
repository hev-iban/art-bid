import React from 'react';
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
        </section>

        {/* Newsletter Signup */}
        <section>
          <form action=''>
            <MDBRow className='d-flex justify-content-center'>
              <MDBCol size="auto">
                <p className='pt-2'><strong>Sign up for our newsletter</strong></p>
              </MDBCol>

              <MDBCol md='5' start>
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
          <MDBRow>
            <MDBCol lg='3' md='6' className='mb-4'>
              <h5 className='text-uppercase'>Explore</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='/' className='text-white'>Home</a></li>
                <li><a href='/about' className='text-white'>About Us</a></li>
                <li><a href='/auctions' className='text-white'>Live Auctions</a></li>
                <li><a href='/contact' className='text-white'>Contact</a></li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4'>
              <h5 className='text-uppercase'>Support</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='/help' className='text-white'>Help Center</a></li>
                <li><a href='/faq' className='text-white'>FAQs</a></li>
                <li><a href='/privacy' className='text-white'>Privacy Policy</a></li>
                <li><a href='/terms' className='text-white'>Terms of Service</a></li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4'>
              <h5 className='text-uppercase'>Artists</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='/artists' className='text-white'>Find Artists</a></li>
                <li><a href='/sell' className='text-white'>Sell Your Art</a></li>
                <li><a href='/collections' className='text-white'>Collections</a></li>
                <li><a href='/events' className='text-white'>Upcoming Events</a></li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4'>
              <h5 className='text-uppercase'>Get in Touch</h5>
              <ul className='list-unstyled mb-0'>
                <li><a href='/contact' className='text-white'>Customer Support</a></li>
                <li><a href='/feedback' className='text-white'>Give Feedback</a></li>
                <li><a href='/partnerships' className='text-white'>Partnerships</a></li>
                <li><a href='/careers' className='text-white'>Careers</a></li>
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
