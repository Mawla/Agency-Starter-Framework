import '@testing-library/jest-dom';

import { act, render, screen } from '../../jest.utils';
import { demoImage2 } from '../../stories/content';
import Slides from './Slides';

describe('Slides', () => {
  it('renders title', () => {
    render(<Slides title="Hello" />);
    expect(screen.getByText('Hello', { selector: 'h2' })).toBeInTheDocument();
  });

  it('renders intro', () => {
    render(<Slides intro={<p>Hello</p>} />);
    expect(screen.getByText('Hello', { selector: 'p' })).toBeInTheDocument();
  });

  it('renders items', async () => {
    await act(() => {
      render(
        <Slides
          items={[
            {
              image: demoImage2,
              _key: 'x',
              label: 'label',
              title: 'title',
              text: 'text',
            },
          ]}
        />,
      );
    });
    expect(screen.getAllByAltText('demoimage2'));
    expect(screen.getByText('label', { selector: 'span' })).toBeInTheDocument();
    expect(screen.getByText('title', { selector: 'h3' })).toBeInTheDocument();
    expect(screen.getByText('text', { selector: 'p' })).toBeInTheDocument();
  });
});
