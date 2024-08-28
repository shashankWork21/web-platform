"use client";

import { useState } from "react";
import { deleteCurrency, modifyCurrency, toggleCurrency } from "@/actions";
import CurrencyCreationForm from "./currency-creation-form";
import CurrencyPanel from "./currency-panel";

export default function CurrencyEditForm(props: any) {
  const modifyCurrencyAction = modifyCurrency.bind(
    null,
    props.currency.id,
    props.currency.isDisabled
  );
  const deleteCurrencyAction = deleteCurrency.bind(null, props.currency.id);
  const disableCurrencyAction = toggleCurrency.bind(
    null,
    props.currency.id,
    true,
    props.currency.name,
    props.currency.shortform,
    props.currency.inrConversion,
    props.currency.symbol
  );
  const enableCurrencyAction = toggleCurrency.bind(
    null,
    props.currency.id,
    false,
    props.currency.name,
    props.currency.shortform,
    props.currency.inrConversion,
    props.currency.symbol
  );
  const [edit, setEdit] = useState(false);

  // Create Interface

  return !edit ? (
    <CurrencyPanel
      currency={props.currency}
      deleteCurrencyAction={deleteCurrencyAction}
      disableCurrencyAction={disableCurrencyAction}
      enableCurrencyAction={enableCurrencyAction}
      edit={edit}
      setEdit={setEdit}
    />
  ) : (
    <CurrencyCreationForm
      formAction={modifyCurrencyAction}
      buttonText="Save"
      title={`Edit Currency "${props.currency.name}"`}
      defaultValues={{
        name: props.currency.name,
        shortform: props.currency.shortform,
        inrConversion: props.currency.inrConversion,
        symbol: props.currency.symbol,
      }}
      onSuccess={() => {
        setEdit(!edit);
      }}
    />
  );
}
