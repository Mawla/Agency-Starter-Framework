import { Button } from "../components/buttons/Button";
import { StaticFormState } from "../layout/ModuleBuilder/StaticFormBuilder";
import { Formik, Field, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";

export type NewsLetterSignUpFormValues = {
  email?: string;
};

export type NewsLetterSignUpFormProps = {
  success?: React.ReactNode | React.ReactElement;
  error?: React.ReactNode | React.ReactElement;
  state?: StaticFormState;
  onSubmit?: (values: NewsLetterSignUpFormValues) => void;
  result?: string;
};

const DisplayingmessagesSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("This field is required"),
});

export const NewsLetterSignUpForm = ({
  success,
  error,
  onSubmit,
  result,
  state,
}: NewsLetterSignUpFormProps) => {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={DisplayingmessagesSchema}
      onSubmit={onSubmit as any}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="inline-block w-full">
          {state === "success" && (
            <div className="prose prose-sm p-3 border bg-white bg-opacity-50 rounded-md">
              {success}
            </div>
          )}

          {state === "error" && (
            <div className="prose prose-sm mb-2 border border-red-100 bg-white bg-opacity-50 rounded-md">
              {result || error}
            </div>
          )}

          {state !== "success" && (
            <div>
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Join our blog"
                    className="border bg-white border-neutral-100 placeholder-neutral-500 md:text-md w-full"
                  />
                </div>
                <span className="flex-shrink-0">
                  <Button
                    label="Subscribe"
                    as="button"
                    // onClick={() => handleSubmit()}
                    disabled={state === "loading"}
                    loading={state === "loading"}
                  />
                </span>
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="mt-2 text-sm text-red-400 text-left"
              />
            </div>
          )}
        </form>
      )}
    </Formik>
  );
};

export default React.memo(NewsLetterSignUpForm);
