import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Navigation } from '../components/sidebar/navigation';

// Very basic test to see if the Navigation component renders without crashing
describe('Navigation', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <Navigation />
      </Router>
    );
  });
});
