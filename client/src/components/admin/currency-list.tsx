import CurrencyEditForm from "./currency-edit-form";

export default function CurrencyList({ currencies }: any) {
  return (
    <div className="w-full flex flex-col md:flex-row md:flex-wrap items-center md:justify-start md:space-x-12 p-3">
      {currencies ? (
        currencies.map((item: any) => {
          return <CurrencyEditForm key={item.id} currency={item} />;
        })
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
