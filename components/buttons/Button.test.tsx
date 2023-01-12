import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import singletonRouter from "next/router";

import { render, fireEvent, screen } from "../../jest.utils";
import { Button } from "./Button";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

// describe('Button', () => {
//   it('fires onClick', () => {
//     mockRouter.setCurrentUrl('/');

//     render(
//       <Button onClick={() => mockRouter.setCurrentUrl('/foo')} label={'Foo'} />,
//     );

//     fireEvent.click(screen.getByText('Foo'));
//     expect(singletonRouter).toMatchObject({ asPath: '/foo' });
//   });

//   it('does not fire onClick when disabled', () => {
//     mockRouter.setCurrentUrl('/');

//     render(
//       <Button
//         disabled
//         onClick={() => mockRouter.setCurrentUrl('/foo')}
//         label={'Foo'}
//       />,
//     );

//     fireEvent.click(screen.getByText('Foo'));
//     expect(singletonRouter).toMatchObject({ asPath: '/' });
//   });
// });
