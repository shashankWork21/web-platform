"use client";

import { useState } from "react";
import DataActions from "./data-actions";
import VariantCreationForm from "./variant-create-form";
import { createResourceVariant } from "@/actions";
import { DropdownOption } from "../general/dropdown";
import VariantEditForm from "./variant-edit-form";
import { pricingModels } from "@/utils/pricing.utils";
import { Button, Typography } from "@material-tailwind/react";
import ResourceTypeChip from "../general/resource-type-chip";

export default function ResourcePanel(props: any) {
  const [includedVariantId, setIncludedVariantId] = useState("");
  const currencyOptionArray: DropdownOption[] = props.currencies.map(
    (currency: any) => {
      return {
        id: currency.id,
        imageDisplay: false,
        display: `${currency.shortform} (${currency.symbol})`,
        value: currency.name,
        selected: false,
      } as DropdownOption;
    }
  );
  const pricingModelOptionArray: DropdownOption[] = Object.values(
    pricingModels
  ).map((model: string, index: number) => {
    return {
      id: `${index}`,
      imageDisplay: false,
      display: model,
      value: model,
      selected: false,
    } as DropdownOption;
  });

  const includeVariantOptions: DropdownOption[] = props.resource.variants.map(
    (variant: any) => {
      return {
        id: variant.id,
        imageDisplay: false,
        display: variant.title,
        value: variant.title,
        selected: false,
      } as DropdownOption;
    }
  );

  const [variantOptions, setVariantOptions] = useState(includeVariantOptions);
  const [currencyOptions, setCurrencyOptions] = useState(currencyOptionArray);
  const [pricingModelOptions, setPricingModelOptions] = useState(
    pricingModelOptionArray
  );

  const selectedCurrency = currencyOptions.find(
    (currency) => currency.selected
  ) as DropdownOption;
  const selectedPricingModel = pricingModelOptions.find(
    (currency) => currency.selected
  ) as DropdownOption;
  const selectedIncludedVariant = variantOptions.find(
    (variant) => variant.selected
  ) as DropdownOption;

  const createVariantAction = createResourceVariant.bind(
    null,
    props.resource.id,
    selectedCurrency?.id || "",
    selectedPricingModel?.value || "",
    selectedIncludedVariant?.id || ""
  );

  const [openVariantForm, setOpenVariantform] = useState(false);
  return (
    <div className="w-full flex flex-col items-start justify-start space-y-5 shadow-lg bg-white p-5 rounded-lg">
      <div className="flex flex-row justify-between w-full items-center">
        <div className="flex flex-row items-center justify-center space-x-5">
          <Typography variant="h4">{props.resource.title}</Typography>
          <ResourceTypeChip
            resourceType={props.resource.resourceType}
            size="medium"
          />
        </div>
        <DataActions
          isDisabled={props.resource.isDisabled}
          enableAction={props.enableResourceAction}
          disableAction={props.disableResourceAction}
          deleteAction={props.deleteResourceAction}
          edit={props.edit}
          setEdit={props.setEdit}
        />
      </div>
      <p>{props.resource.description}</p>

      <div className="w-full flex flex-col items-center spacy-y-4">
        {props.resource.variants.length > 0 && (
          <div className="w-full flex flex-col items-center justify-between space-y-2">
            {props.resource.variants.map((variant: any) => {
              return (
                <VariantEditForm
                  key={variant.id}
                  variant={variant}
                  resource={props.resource}
                  currencies={props.currencies}
                />
              );
            })}
          </div>
        )}
        {!openVariantForm && (
          <Button
            onClick={() => {
              setOpenVariantform(!openVariantForm);
            }}
            className="mt-5"
          >
            Add Variant
          </Button>
        )}
        {openVariantForm && (
          <VariantCreationForm
            resource={props.resource}
            includedVariantId={includedVariantId}
            setIncludedVariantId={setIncludedVariantId}
            currencies={props.currencies}
            formAction={createVariantAction}
            includedVariantOptions={variantOptions}
            setIncludedVariantOptions={setVariantOptions}
            buttonText="Create"
            currencyOptions={currencyOptions}
            pricingModelOptions={pricingModelOptions}
            setPricingModelOptions={setPricingModelOptions}
            setCurrencyOptions={setCurrencyOptions}
            defaultValues={{
              title: "",
              details: [],
              currency: null,
              price: "",
              pricingModel: null,
              includeVariant: null,
              includedVariant: null,
            }}
            onSuccess={() => {
              setOpenVariantform(!openVariantForm);
            }}
          />
        )}
      </div>
      <p className="font-bold">
        Created By: {props.resource.createdBy.firstName}{" "}
        {props.resource.createdBy.lastName}
      </p>
    </div>
  );
}
