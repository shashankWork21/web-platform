"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import Input from "../general/input";
import InputTextArea from "../general/textarea";
import { Button, Typography } from "@material-tailwind/react";

export default function CategoryCreationForm({
  title,
  formAction,
  buttonText,
  defaultValues,
  onSuccess,
}: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, action] = useFormState(formAction, {
    errors: { title: [], description: [] },
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
    <form
      className="mt-10 w-9/10 md:w-1/2 flex flex-col space-y-5 items-center py-5 px-10 bg-stone-white-3 shadow-lg rounded-lg mx-auto"
      action={action}
      ref={formRef}
    >
      <Typography variant="h4">
        {defaultValues?.title || "Create Category"}
      </Typography>
      <Input
        type="text"
        name="title"
        placeholder="Title"
        isError={!!formState?.errors.title}
        errors={formState?.errors.title}
        defaultValue={defaultValues?.title || ""}
      />
      <InputTextArea
        name="description"
        placeholder="Description"
        isError={!!formState?.errors.description}
        errors={formState?.errors.description}
        defaultValue={defaultValues?.description || ""}
      />
      <div className="flex flex-row items-center space-x-3">
        <Button
          type="submit"
          className="bg-cypher-blue hover:bg-cypher-blue-7"
          size="md"
        >
          {buttonText}
        </Button>
        {onSuccess && (
          <Button onClick={onSuccess} variant="text" size="sm">
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
