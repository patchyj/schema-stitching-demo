import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  title, subtitle, text, links, type, data
}) => {
  let displayData;
  if (type === 'profile') {
    displayData = data && data.map(d => <p className="card-text">{`${d[0]} : ${d[1].length}`}</p>);
  } else {
    displayData = data && <p className="card-text">{ text && `${text} : ${data.length}`}</p>;
  }

		const linkData = links.map(link => <a href={`/${link.href}`} className="btn mr-2">{link.text}</a>);

  return (
    <div className="card bg-dark text-white">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="text-muted">{subtitle}</h6>
        {displayData}
        {linkData}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({})),
  type: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

Card.defaultProps = {
  title: '',
  subtitle: '',
  text: '',
  links: [],
  type: '',
  data: []
};

export default Card;
