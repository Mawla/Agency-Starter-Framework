import '@testing-library/jest-dom';

import { render, screen } from '../../jest.utils';
import TextImage from './TextImage';

describe('TextImage', () => {
  it('renders title', () => {
    render(<TextImage title="Hello" />);
    expect(screen.getByText('Hello', { selector: 'h2' })).toBeInTheDocument();
  });

  it('renders intro', () => {
    render(<TextImage intro={<p>Hello</p>} />);
    expect(screen.getByText('Hello', { selector: 'p' })).toBeInTheDocument();
  });

  it('renders image', () => {
    render(
      <TextImage
        image={{
          height: 2400,
          src: 'https://cdn.sanity.io/images/h6z8r05l/development/1b2721e94193ac7e282d9b9ddda8a8b653546c53-2400x1600.jpg',
          width: 1600,
          alt: 'hello',
        }}
      />,
    );
    expect(screen.getAllByAltText('hello'));
  });

  it('renders button', () => {
    render(<TextImage buttons={[{ label: 'hello' }]} />);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
