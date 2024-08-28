import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import DataActions from "./data-actions";

export default function CurrencyPanel(props: any) {
  return (
    <Card className="w-full md:w-1/3 flex flex-col items-start justify-start space-y-3 bg-stone-white-4 p-5 rounded-lg shadow-lg border border-stone-white-8">
      <CardHeader className="mt-3 px-3 shadow-none bg-inherit text-signal-black">
        <Typography variant="h4">{props.currency.name}</Typography>
      </CardHeader>
      <CardBody className="flex flex-col items-start text-signal-black">
        <Typography variant="paragraph">
          Shortform: {props.currency.shortform}
        </Typography>
        <Typography variant="paragraph">
          Conversion factor for INR: {props.currency.inrConversion}
        </Typography>
        <Typography variant="paragraph">
          Symbol: {props.currency.symbol}
        </Typography>
        <Typography variant="paragraph">
          Created By: {props.currency.createdBy.firstName}{" "}
          {props.currency.createdBy.lastName}
        </Typography>
      </CardBody>
      <CardFooter className="flex flex-col items-start space-y-3">
        <DataActions
          isDisabled={props.currency.isDisabled}
          enableAction={props.enableCurrencyAction}
          disableAction={props.disableCurrencyAction}
          deleteAction={props.deleteCurrencyAction}
          edit={props.edit}
          setEdit={props.setEdit}
        />
      </CardFooter>
    </Card>
  );
}
