import React from 'react';
import * as PropTypes from 'prop-types';
// import logo from '../../img/ica-logo.png';
// import footer from '../../img/ica-footer.png';
import { IRawContainerProps } from '../../Interfaces/shared/common';

const RawContainer: React.FC<IRawContainerProps> = ({ children }: IRawContainerProps) => (
  <>
    <div className="custom-page-container">
      <div className="custom-raw-logo">
        <img src="" alt="ICA Logo" />
      </div>
      {children}
    </div>
    <img className="custom-raw-footer" src="" alt="ICA footer" />
  </>
);

RawContainer.propTypes = {
  children: PropTypes.any
};

export default RawContainer;