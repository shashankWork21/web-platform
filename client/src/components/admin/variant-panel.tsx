"use client";

import { pricingModelDisplay } from "@/utils/pricing.utils";
import DataActions from "./data-actions";
import { Card, Typography } from "@material-tailwind/react";

export default function VariantPanel(props: any) {
  const pricingModel = props.variant
    .pricingModel as keyof typeof pricingModelDisplay;

  const includeStatement = props.variant.includedVariant ? (
    <p>
      Includes everything in{" "}
      <span className="font-bold">{props.variant.includedVariant.title}</span>{" "}
      plus:
    </p>
  ) : (
    <p>Includes:</p>
  );

  return (
    <Card className="w-full md:w-1/2 flex flex-col items-start justify-start space-y-3 bg-stone-white text-signal-black p-5 rounded-lg">
      <div className="flex flex-row justify-between w-full items-center">
        <Typography variant="h4">{props.variant.title}</Typography>
        <DataActions
          isDisabled={props.variant.isDisabled}
          enableAction={props.enableVariantAction}
          disableAction={props.disableVariantAction}
          deleteAction={props.deleteVariantAction}
          edit={props.edit}
          setEdit={props.setEdit}
        />
      </div>
      {includeStatement}
      <ul className="list-disc list-outside pl-5 mb-4">
        {props.variant.details.map((detail: any, index: number) => {
          return <li key={index}>{detail}</li>;
        })}
      </ul>
      <div className="w-full text-right">
        Price:{" "}
        <Typography className="inline" variant="h5">
          {props.variant.currency.symbol}
          {props.variant.price}
        </Typography>{" "}
        {pricingModelDisplay[pricingModel] || ""}
      </div>
    </Card>
  );
}
