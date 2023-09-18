import PropTypes from 'prop-types';

export const metadata = {
  title: 'Your Investment Positions',
  description: 'List of your positions',
}

const PositionsLayout = ({ children }) => {
  return (
    <div>
      <h2>Positions</h2>
      <h2>Here is your positions</h2>
      {children}
    </div>
  );
};

PositionsLayout.propTypes = {
  children: PropTypes.node,
};

export default PositionsLayout;