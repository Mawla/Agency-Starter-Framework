import React from 'react';

import { LoadingAnimation } from '../../components/loaders/LoadingAnimation';
import { Wrapper } from '../../components/module/Wrapper';
import { Footer } from '../Footer/Footer';
import { Nav } from '../Nav/Nav';

export const LoadingPage = () => {
  return (
    <>
      <Nav items={[]} buttons={[]} showSearch={false} />

      <Wrapper>
        <LoadingAnimation />
      </Wrapper>

      <Footer links={[]} socials={[]} copyright="" />
    </>
  );
};
