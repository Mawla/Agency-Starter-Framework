import '@testing-library/jest-dom';

import { render, screen } from '../../jest.utils';
import RichText from './RichText';

describe('RichText', () => {
  it('renders title', () => {
    render(<RichText content={<p>hello</p>} />);
    expect(screen.getByText('hello', { selector: 'p' })).toBeInTheDocument();
  });
});
