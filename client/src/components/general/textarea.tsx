import { Textarea } from "@material-tailwind/react";

interface TextAreaProps {
  required?: boolean;
  name: string;
  placeholder: string;
  defaultValue?: string;
  isError: boolean;
  errors: string[];
}

export default function InputTextArea(props: TextAreaProps) {
  return (
    <div className="flex flex-col items-center justify-start w-full">
      <Textarea
        required={props.required}
        name={props.name}
        label={props.placeholder}
        defaultValue={props.defaultValue || ""}
      />
      {props.isError &&
        props.errors.map((error: string, index: number) => {
          return (
            <ul
              key={index}
              className="w-11/12 rounded-lg py-2 px-10 text-red-700 text-let list-disc"
            >
              <li className="">{error}</li>
            </ul>
          );
        })}
    </div>
  );
}
