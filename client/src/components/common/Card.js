import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, subtitle, text, link, linkText}) => {
  return (
    <div className="card bg-dark text-white">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="text-muted">{subtitle}</h6>
        <p className="card-text">{text}</p>
        <a href={`/${link}`} className="btn btn-primary">{linkText}</a>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
  linkText: PropTypes.string
};

Card.defaultProps = {
  title: '',
  subtitle: '',
  text: '',
  link: '',
  linkText: 'See more'
};

export default Card;
