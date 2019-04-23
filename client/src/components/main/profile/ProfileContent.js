import React from 'react';
import PropTypes from 'prop-types';

import Dashboard from './profileSections/Dashboard';
import Experience from './profileSections/Experience';
import Education from './profileSections/Education';
import Skills from './profileSections/Skills';

const ProfileContent = (props) => {
  const { page } = props;
  return (
    <div className="container-fluid">
      {page === 'Dashboard' && <Dashboard {...props} />}
      {page === 'Experience' && <Experience />}
      {page === 'Education' && <Education />}
      {page === 'Skills' && <Skills />}
    </div>
  );
};

ProfileContent.propTypes = {
  page: PropTypes.string.isRequired
}

export default ProfileContent;
