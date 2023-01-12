import '@testing-library/jest-dom';

import { render, screen } from '../../jest.utils';
import Billboard from './Billboard';

const DEMO_IMAGE = {
  crop: null,
  height: 2400,
  hotspot: null,
  src: 'https://cdn.sanity.io/images/h6z8r05l/development/1b2721e94193ac7e282d9b9ddda8a8b653546c53-2400x1600.jpg',
  width: 1600,
  alt: 'hello',
};

describe('Billboard', () => {
  it('renders title', () => {
    render(<Billboard title="Hello" />);
    expect(screen.getByText('Hello', { selector: 'h2' })).toBeInTheDocument();
  });

  it('renders content', () => {
    render(<Billboard content={<p>Hello</p>} />);
    expect(screen.getByText('Hello', { selector: 'p' })).toBeInTheDocument();
  });

  it('renders image', () => {
    render(<Billboard image={DEMO_IMAGE} />);
    expect(screen.getAllByAltText('hello'));
  });

  it('renders button', () => {
    render(<Billboard buttons={[{ label: 'hello' }]} />);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
