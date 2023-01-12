import { isInternalLink } from './isInternalLink';

test('test internal link', () => {
  expect(isInternalLink('/foo')).toBeTruthy();
  expect(isInternalLink('#foo')).toBeTruthy();
  expect(isInternalLink('/google.com')).toBeTruthy();
  expect(isInternalLink('/foo#foo')).toBeTruthy();
  expect(isInternalLink('google.com')).toBeFalsy();
  expect(isInternalLink('https://google.com')).toBeFalsy();
  expect(isInternalLink('https://google.com#foo')).toBeFalsy();
});
