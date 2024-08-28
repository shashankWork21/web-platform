"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import Input from "../general/input";
import TextInput from "../general/input";
import { Card, Typography } from "@material-tailwind/react";

export default function CurrencyCreationForm({
  title,
  formAction,
  buttonText,
  defaultValues,
  onSuccess,
}: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, action] = useFormState(formAction, {
    errors: { name: [], shortform: [], inrConversion: [], symbol: [] },
    submitted: false,
  });

  useEffect(() => {
    if (formState?.submitted) {
      formRef.current?.reset();
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [formState, onSuccess]);

  return (
    <Card className="mt-10 w-full md:w-1/2 lg:w-1/3 border border-stone-white-8">
      <form
        className="w-full flex flex-col space-y-5 items-center py-5 px-10  bg-stone-white-3"
        action={action}
        ref={formRef}
      >
        <Typography variant="h4">{title}</Typography>
        <TextInput
          type="text"
          name="name"
          placeholder="Currency Name"
          isError={!!formState?.errors.name}
          errors={formState?.errors.name}
          defaultValue={defaultValues?.name || ""}
        />
        <div className="flex flex-col justify-between space-y-3 items-center w-full">
          <TextInput
            type="text"
            name="shortform"
            placeholder="Shortform"
            isError={!!formState?.errors.shortform}
            errors={formState?.errors.shortform}
            defaultValue={defaultValues?.shortform || ""}
          />
          <TextInput
            type="number"
            name="inrConversion"
            placeholder="INR Conversion rate"
            isError={!!formState?.errors.inrConversion}
            errors={formState?.errors.inrConversion}
            defaultValue={defaultValues?.inrConversion || ""}
          />
          <TextInput
            type="text"
            name="symbol"
            placeholder="Symbol"
            isError={!!formState?.errors.symbol}
            errors={formState?.errors.symbol}
            defaultValue={defaultValues?.symbol || ""}
          />
        </div>
        <div className="flex flex-row items-center space-x-3">
          <button
            type="submit"
            className="px-10 py-3 rounded-xl shadow-xl bg-cypher-blue hover:bg-cypher-blue-4 text-white transition-all cursor-pointer duration-300"
          >
            {buttonText}
          </button>
          {onSuccess && (
            <button
              className="px-10 py-3 rounded-xl shadow-xl bg-signal-black hover:bg-signal-black-5 text-white transition-all cursor-pointer duration-300"
              onClick={onSuccess}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </Card>
  );
}
