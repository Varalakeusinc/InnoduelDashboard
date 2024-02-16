import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Navigation } from '../components/sidebar/navigation';

describe('Navigation', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <Navigation />
      </Router>
    );
  });
});
