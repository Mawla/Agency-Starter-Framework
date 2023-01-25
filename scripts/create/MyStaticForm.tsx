import { Formik, Field, ErrorMessage } from 'formik';
import { motion } from 'framer-motion';
import React from 'react';
import * as Yup from 'yup';

import { Button } from '../components/buttons/Button';
import { StaticFormState } from '../layout/ModuleBuilder/StaticFormBuilder';

export type MyStaticFormValues = {
  name?: string;
  email?: string;
};

export type MyStaticFormProps = {
  success?: React.ReactNode | React.ReactElement;
  error?: React.ReactNode | React.ReactElement;
  state?: StaticFormState;
  onSubmit?: (values: MyStaticFormValues) => void;
  result?: string;
};

const DisplayingmessagesSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('Invalid email').required('This field is required'),
});

export const MyStaticForm = ({
  success,
  error,
  onSubmit,
  result,
  state,
}: MyStaticFormProps) => {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={DisplayingmessagesSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="inline-block w-full">
          {state === 'success' && (
            <motion.div
              className="prose prose-sm p-3 border bg-white bg-opacity-50 rounded-md"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ ease: 'circOut', delay: 0.25 }}
            >
              {success}
            </motion.div>
          )}

          {state === 'error' && (
            <div className="prose prose-sm mb-2 border border-red-100 bg-red-50 bg-opacity-50 py-1 px-2">
              {result || error}
            </div>
          )}

          {state !== 'success' && (
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'circOut' }}
            >
              <div className="mb-4">
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="border bg-white border-neutral-95 placeholder-neutral-50 md:text-md w-full"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-2 text-sm text-red-400 text-left"
                />
              </div>

              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className="border bg-white border-neutral-95 placeholder-neutral-50 md:text-md w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-2 text-sm text-red-400 text-left"
                />
              </div>

              <div className="">
                <Button
                  label="Send"
                  size="md"
                  as="button"
                  onClick={() => handleSubmit()}
                  disabled={state === 'loading'}
                  loading={state === 'loading'}
                />
              </div>
            </motion.div>
          )}
        </form>
      )}
    </Formik>
  );
};

export default React.memo(MyStaticForm);
