import { NewsLetterSignUpFormValues } from "../../forms/NewsLetterSignUpForm";
import {
  StaticFormOptionsType,
  StaticFormType,
  SuccessOrErrorMessage,
} from "../../types";
import { NextApiRequest, NextApiResponse } from "next";

export type StaticFormApiBody = {
  values: NewsLetterSignUpFormValues;
  formId: StaticFormType;
  options: StaticFormOptionsType;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: string;
}

interface ExtendedNextApiResponse extends NextApiResponse {
  success?: string;
  error?: string;
}

const handler = async (
  req: ExtendedNextApiRequest,
  res: ExtendedNextApiResponse
) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { values, options, formId }: StaticFormApiBody = JSON.parse(req.body);

    if (!formId) return res.status(400).send({ error: "Missing formId" });

    let status: SuccessOrErrorMessage = { error: "Something went wrong." };

    // newsletter
    if (formId === "newsletter-sign-up") {
      status = { success: "Success!" };
    }

    if ("success" in status) {
      return res.status(200).send({ success: status.success });
    } else {
      return res.status(400).send({ error: status.error });
    }
  } catch (err) {
    res.status(500).end();
  }
};
export default handler;
