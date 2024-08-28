"use client";

import {
  modifyResourceVariant,
  deleteVariant,
  toggleVariantAvailability,
} from "@/actions";
import { useState } from "react";

import VariantCreationForm from "./variant-create-form";
import VariantPanel from "./variant-panel";
import { pricingModels } from "@/utils/pricing.utils";
import { DropdownOption } from "../general/dropdown";

export default function VariantEditForm(props: any) {
  const currencyOptionArray: DropdownOption[] = props.currencies.map(
    (currency: any) => {
      return {
        id: currency.id,
        imageDisplay: false,
        display: `${currency.shortform} (${currency.symbol})`,
        value: currency.name,
        selected: currency.id === props.variant.currencyId,
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
      selected: model === props.variant.pricingModel,
    } as DropdownOption;
  });

  const includeVariantOptions: DropdownOption[] =
    props.resource.variants?.map((variant: any) => {
      return {
        id: variant.id,
        imageDisplay: false,
        display: variant.title,
        value: variant.title,
        selected: variant.id === props.variant.includedVariantId,
      } as DropdownOption;
    }) || null;

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

  const modifyVariantAction = modifyResourceVariant.bind(
    null,
    props.variant.id,
    selectedCurrency?.id || "",
    selectedPricingModel?.value || "",
    selectedIncludedVariant?.id || ""
  );
  const deleteVariantAction = deleteVariant.bind(null, props.variant.id);

  const disableVariantAction = toggleVariantAvailability.bind(
    null,
    props.variant.id,
    props.variant.title,
    props.variant.details,
    props.variant.price,
    props.variant.currency.id,
    props.variant.pricingModel,
    props.variant.includedVariantId,
    true
  );
  const enableVariantAction = toggleVariantAvailability.bind(
    null,
    props.variant.id,
    props.variant.title,
    props.variant.details,
    props.variant.price,
    props.variant.currency.id,
    props.variant.pricingModel,
    props.variant.includedVariantId,
    false
  );
  const [edit, setEdit] = useState(false);

  // Create Interface

  return !edit ? (
    <VariantPanel
      variant={props.variant}
      deleteVariantAction={deleteVariantAction}
      disableVariantAction={disableVariantAction}
      enableVariantAction={enableVariantAction}
      edit={edit}
      setEdit={setEdit}
    />
  ) : (
    <VariantCreationForm
      resource={props.resource}
      currencies={props.currencies}
      formAction={modifyVariantAction}
      buttonText="Save"
      includedVariantOptions={variantOptions}
      setIncludedVariantOptions={setVariantOptions}
      currencyOptions={currencyOptions}
      pricingModelOptions={pricingModelOptions}
      setPricingModelOptions={setPricingModelOptions}
      setCurrencyOptions={setCurrencyOptions}
      defaultValues={{
        title: props.variant.title,
        details: props.variant.details,
        currency: props.variant.currency,
        price: props.variant.price,
        pricingModel: props.variant.pricingModel,
        includeVariant: props.variant.includedVariantId !== null,
        includedVariant: props.variant.includedVariant || null,
      }}
      onSuccess={() => {
        setEdit(!edit);
      }}
    />
  );
}
