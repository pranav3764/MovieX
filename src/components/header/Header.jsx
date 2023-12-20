import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

function Header() {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  
  const controlNavbar = () => {
    if(window.scrollY > 450){
      if(window.scrollY > lastScrollY){
        setShow("hide");
      }
      else{
        setShow("show");
      }
    }
    else{
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  }

  useEffect((() => {
    window.addEventListener("scroll", controlNavbar);
  }), [lastScrollY])

  return (
    <div className={`header ${mobileMenu ? 'mobileView' : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" onClick={() => {navigate("/")}}/>
        </div>
        <ul className="menu-list">
          <li className="menu-item" onClick={() => {
            navigate("/explore/movie");
            setMobileMenu(false);
          }}>Movies</li>
          <li className="menu-item" onClick={() => {
            navigate("/explore/tv");
            setMobileMenu(false)
          }}>TV Shows</li>
          <li className="menu-item"><HiOutlineSearch onClick={() => openSearch()} /></li>
        </ul>
        <div className="mobile-menu-items">
          <HiOutlineSearch onClick={() => openSearch()}/>
          {mobileMenu ? <VscChromeClose onClick={() => {
            setMobileMenu(false);
          }}/> : <SlMenu onClick={() => {
            setMobileMenu(true);
            setShowSearch(false);
          }}/>}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
              <div className="searchInput">
                <input
                  type="text"
                  placeholder="Search for a movie or tv show...."
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={searchQueryHandler}
                />
                <VscChromeClose
                  onClick={() => setShowSearch(false)}
                />
              </div>
          </ContentWrapper>
        </div>
        )}
    </div>
  )
}

export default Header