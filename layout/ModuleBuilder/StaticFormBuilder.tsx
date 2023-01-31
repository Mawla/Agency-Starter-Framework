import { PortableTextProps } from "../../components/content/PortableText";
import {
  NewsLetterSignUpFormProps,
  NewsLetterSignUpFormValues,
} from "../../forms/NewsLetterSignUpForm";
import { StaticFormApiBody } from "../../pages/api/static-form";
import {
  StaticFormOptionsType,
  StaticFormOptionType,
  StaticFormType,
  SuccessOrErrorMessage,
} from "../../types";
import { LazyLoadInView } from "./LazyLoadInView";
import ModuleErrorBoundary from "./ModuleErrorBoundary";
import React, { lazy, useState, ComponentType } from "react";
import { Suspense } from "react";

export type StaticFormBuilderProps = {
  name?: string;
  formId?: StaticFormType;
  options?: { key: StaticFormOptionType; value: string }[];
  success?: [];
  error?: [];
  className?: string;
};

const PortableText = lazy<React.ComponentType<PortableTextProps>>(
  () =>
    import(
      /* webpackChunkName: "PortableText" */ "../../components/content/PortableText"
    ) as any,
);

const NewsLetterSignUpForm = lazy<
  React.ComponentType<NewsLetterSignUpFormProps>
>(
  () =>
    import(
      /* webpackChunkName: "NewsLetterSignUpForm" */ "../../forms/NewsLetterSignUpForm"
    ),
);

export type StaticFormState = "loading" | "idle" | "success" | "error";

export const StaticFormBuilder = ({
  name,
  formId,
  options,
  success,
  error,
  className,
}: StaticFormBuilderProps) => {
  const [state, setState] = useState<StaticFormState>("idle");
  const [result, setResult] = useState<string | null>(null);

  if (!formId) return null;

  // create object of options {key:value} from array of objects
  const optionsSet: StaticFormOptionsType = Object.values(options || {}).reduce(
    (acc, curr) => ({ ...acc, [curr.key]: curr.value }),
    {},
  );

  /**
   * Post data to API
   */

  const handleSubmit = async (values: NewsLetterSignUpFormValues) => {
    setState("loading");
    setResult(null);

    const body: StaticFormApiBody = {
      values,
      formId: formId,
      options: optionsSet,
    };

    const res = await fetch(`/api/static-form`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const result: SuccessOrErrorMessage = await res.json();
    if ("success" in result) {
      setState("success");
      return setResult(result.success);
    }
    setState("error");
    setResult(result.error);
  };

  const formProps = {
    onSubmit: handleSubmit,
    result,
    state,
    success: <PortableText content={success as any} />,
    error: <PortableText content={error as any} />,
  };

  return (
    <div className={className}>
      <Suspense fallback={``}>
        <ModuleErrorBoundary>
          <LazyLoadInView>
            {formId === "newsletter-sign-up" && (
              <NewsLetterSignUpForm {...(formProps as any)} />
            )}
          </LazyLoadInView>
        </ModuleErrorBoundary>
      </Suspense>
    </div>
  );
};

export const StaticFormBuilderMemo = React.memo(StaticFormBuilder);
