import React from "react";
const Header = (props) => {
  return (
    <div className="header">
      <div className="container">
        <h1 className="header__title"> {props.title} </h1>
        <h2 className="header__subtitle">{props.subtitle}</h2>
        <h3 className="header__subsubtitle">Made by Carlo Fichera</h3>
      </div>
    </div>
  );
};
export default Header;
