import groq from 'groq';

import { getImageQuery } from './image';

export const videoQueryFields = groq`
  loop,
  autoPlay,
  caption,
  provider,
  frameless,
  "videoId": coalesce(sanity.asset->url, mux.asset->playbackId, cloudinary.public_id, youtube, vimeo, static),
  "poster": ${getImageQuery('poster')}
`;

export const videoQuery = groq`
  video { ${videoQueryFields} }
`;

export const videoSourceQuery = groq`
  {
    "loop": @.loop,
    "autoPlay": @.autoPlay,
    "caption": @.caption,
    "provider": @.provider,
    "frameless": @.frameless,
    "videoId": coalesce(sanity.asset->url, mux.asset->playbackId, cloudinary.public_id, youtube, vimeo, static),
  }
`;
