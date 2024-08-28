"use client";

import { useState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import Input from "../general/input";
import { IoIosClose } from "react-icons/io";
import Dropdown from "../general/dropdown";
import { Button, Checkbox } from "@material-tailwind/react";

export default function VariantCreationForm({
  formAction,
  buttonText,
  resource,
  defaultValues,
  onSuccess,
  currencyOptions,
  setCurrencyOptions,
  pricingModelOptions,
  includedVariantOptions,
  setIncludedVariantOptions,
  setPricingModelOptions,
}: any) {
  const initialDetailArray =
    defaultValues.details.length > 0
      ? defaultValues.details.map((item: string, index: number) => index + 1)
      : [1];
  const [detailArray, setDetailArray] = useState(initialDetailArray);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, action] = useFormState(formAction, {
    errors: { title: [], details: [], price: [], currency: [] },
    submitted: false,
  });

  const [includeVariant, setIncludeVariant] = useState(
    defaultValues.includeVariant
  );

  useEffect(() => {
    if (formState?.submitted) {
      formRef.current?.reset();
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [formState, onSuccess]);

  const includeVariantSection = (
    <div className="flex flex-col w-full items-start justify-around space-y-5 mb-3">
      <div className="flex flex-row items-center justify-start space-x-2 w-full">
        <Checkbox
          crossOrigin=""
          defaultChecked={includeVariant}
          label="Include an existing variant?"
          onChange={() => {
            setIncludeVariant(!includeVariant);
          }}
        />
      </div>
      {includeVariant && (
        <Dropdown
          itemLabel="variant to include"
          defaultValue={
            defaultValues.includedVariant
              ? {
                  id: defaultValues.includedVariant.id,
                  imageDisplay: false,
                  display: defaultValues.includedVariant.title,
                  value: defaultValues.includedVariant.title,
                  selected: true,
                }
              : {
                  id: "",
                  imageDisplay: false,
                  display: "",
                  value: "",
                  selected: true,
                }
          }
          options={includedVariantOptions}
          setOptions={setIncludedVariantOptions}
        />
      )}
    </div>
  );

  return (
    <form
      className="mt-10 w-full md:w-1/2 flex flex-col space-y-5 items-center p-5 bg-stone-white rounded-xl shadow-lg"
      action={action}
      ref={formRef}
    >
      <h3 className="text-3xl font-semibold">
        {defaultValues.title || "Add a new variant"}
      </h3>
      {resource.variants.length > 0 ? includeVariantSection : null}
      <Input
        type="text"
        name="title"
        placeholder="Title"
        isError={!!formState?.errors.title}
        errors={formState?.errors.title}
        defaultValue={defaultValues?.title || ""}
      />
      {detailArray.map((item: string, index: number) => {
        return (
          <div
            key={index}
            className="w-full flex flex-row justify-center items-center space-x-2"
          >
            <Input
              type="text"
              name="detail"
              placeholder="What's included?"
              isError={!!formState?.errors.details}
              errors={formState?.errors.details}
              defaultValue={defaultValues?.details[index] || ""}
            />
            <IoIosClose
              className="text-lg font-bold cursor-pointer"
              onClick={() => {
                setDetailArray(
                  detailArray.filter(
                    (arrItem: string, arrIndex: number) => arrIndex !== index
                  )
                );
              }}
            />
          </div>
        );
      })}
      <div className="w-full flex flex-row items-center justify-end">
        <Button
          variant="text"
          className="text-xs"
          color="gray"
          onClick={() => {
            setDetailArray([
              ...detailArray,
              detailArray[detailArray.length - 1] + 1,
            ]);
          }}
        >
          Add Detail
        </Button>
      </div>
      <div className="flex flex-row items-center justify-between space-x-5 w-full">
        <Input
          type="number"
          name="price"
          placeholder="Price"
          isError={!!formState?.errors.price}
          errors={formState?.errors.price}
          defaultValue={defaultValues?.price || 0}
        />
        <Dropdown
          itemLabel="currency"
          options={currencyOptions}
          setOptions={setCurrencyOptions}
          defaultValue={
            defaultValues.currency
              ? {
                  id: defaultValues.currency.id,
                  imageDisplay: false,
                  display: `${defaultValues.currency.shortform} (${defaultValues.currency.symbol})`,
                  value: defaultValues.currency.name,
                  selected: true,
                }
              : {
                  id: "",
                  imageDisplay: false,
                  display: "",
                  value: "",
                  selected: true,
                }
          }
        />
      </div>

      <Dropdown
        itemLabel="pricing model"
        defaultValue={
          defaultValues.pricingModel
            ? {
                id: defaultValues.pricingModel,
                imageDisplay: false,
                display: defaultValues.pricingModel,
                value: defaultValues.pricingModel,
                selected: true,
              }
            : {
                id: "",
                imageDisplay: false,
                display: "",
                value: "",
                selected: true,
              }
        }
        options={pricingModelOptions}
        setOptions={setPricingModelOptions}
      />
      <div className="flex flex-row items-center space-x-3">
        <Button type="submit" className="bg-cypher-blue hover:bg-cypher-blue-7">
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
