import Link from "next/link";

export default function SuperLink({ active, ...rest }: any) {
  return (
    <Link
      {...rest}
      className={`${
        active ? "bg-stone-white-11 text-white" : "bg-stone-white-3"
      } px-8 py-4 rounded-t-lg cursor-pointer`}
    ></Link>
  );
}
