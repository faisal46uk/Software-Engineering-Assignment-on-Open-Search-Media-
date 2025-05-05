import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './HomePage.css';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <>
    <div className="home-container">
      <div className="overlay"></div>

      <div className="home-content">
        <div className="home-left">
          <h1 className="home-heading">
            Discover Free & Open Media
          </h1>
          <p className="home-text">
            Search and explore high-quality, open-source media assets.
          </p>
          <p className="home-text">
            You are successfully logged in and ready to explore the world of creativity!
          </p>
          <p className="home-subtext">Ready to search through Openverse?</p>
          <Link to="/search" className="home-button">
            <FaSearch /> Go to Search Page
          </Link>
        </div>

        <div className="home-right">
          <img
            src="https://img.freepik.com/free-photo/homepage-concept-with-search-bar_23-2149416732.jpg?ga=GA1.1.1534122042.1736402083&semt=ais_hybrid&w=740"
            alt="Explore"
            className="home-image"
          />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default HomePage;
