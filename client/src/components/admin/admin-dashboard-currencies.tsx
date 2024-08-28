import { addCurrency } from "@/actions";
import CurrencyCreationForm from "./currency-creation-form";
import CurrencyList from "./currency-list";

export default async function AdminDashboardCurrencies({ currencies }: any) {
  return (
    <div className="w-full flex flex-col items-center justify-around space-y-3">
      <div className="p-5 my-3 w-full flex flex-col items-center justify-center space-y-3">
        <h3 className="text-4xl font-bold">Existing Currencies</h3>
        <CurrencyList currencies={currencies} />
      </div>

      <CurrencyCreationForm
        formAction={addCurrency}
        title="Add Currency"
        buttonText="Create"
      />
    </div>
  );
}
