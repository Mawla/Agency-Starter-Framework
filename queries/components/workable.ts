import groq from 'groq';

export const jobQueryFields = `
  "slug": slug.current,
  title,
  department,
  location,
  shortcode,
  created_at
`;
export const jobsQuery = groq`*[_type == 'workable.job' && state == 'published'] {
  ${jobQueryFields}
}`;
