import { Option, Select } from "@material-tailwind/react";
import { useState, useEffect } from "react";

export interface DropdownOption {
  id: string;
  imageDisplay: boolean;
  display: string;
  value: string;
  selected: boolean;
}

export default function Dropdown({
  defaultValue,
  options,
  setOptions,
  itemLabel,
}: any) {
  const [selectedOption, setSelectedOption] = useState(defaultValue.value);

  const handleOptionClick = (value: string) => {
    setOptions(
      options.map((option: DropdownOption) => ({
        ...option,
        selected: option.value === value,
      }))
    );
    setSelectedOption(value);
  };

  return (
    <Select
      key={selectedOption}
      label={`Select ${itemLabel}`}
      value={selectedOption}
      onChange={(value) => handleOptionClick(value as string)}
    >
      {options.map((option: DropdownOption) => (
        <Option key={option.id} value={option.value}>
          {option.display}
        </Option>
      ))}
    </Select>
  );
}
