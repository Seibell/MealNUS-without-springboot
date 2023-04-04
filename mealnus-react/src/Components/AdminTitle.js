import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

function AdminTitle(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" style={{ overflow: 'hidden' }} gutterBottom>
      {props.children}
    </Typography>
  );
}

AdminTitle.propTypes = {
  children: PropTypes.node,
};

export default AdminTitle;
