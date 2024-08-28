"use client";

import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

import Image from "next/image";

import { CiSearch } from "react-icons/ci";

interface PhoneInputProps {
  isError: boolean;
  errors: string[];
  countries: any;
  setCountry: any;
  country: number;
  required: boolean;
}

export default function PhoneInput({
  isError,
  required,
  errors,
  countries,
  country,
  setCountry,
}: PhoneInputProps) {
  const { name, flags, countryCallingCode } = countries[country];

  return (
    <div className="relative flex flex-col w-full">
      <div className="flex w-full">
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button
              ripple={false}
              variant="text"
              color="blue-gray"
              className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
            >
              <Image
                width={5}
                height={5}
                src={flags.svg}
                alt={name}
                className="h-4 w-4 rounded-full object-cover"
              />
              {countryCallingCode}
            </Button>
          </MenuHandler>
          <MenuList className="max-h-[20rem] max-w-[18rem]">
            {countries.map(
              ({ name, flags, countryCallingCode }: any, index: number) => {
                return (
                  <MenuItem
                    key={name}
                    value={name}
                    className="flex items-center gap-2"
                    onClick={() => setCountry(index)}
                  >
                    <Image
                      width={5}
                      height={5}
                      src={flags.svg}
                      alt={name}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    {name} <span className="ml-auto">{countryCallingCode}</span>
                  </MenuItem>
                );
              }
            )}
          </MenuList>
        </Menu>

        <Input
          required={required}
          crossOrigin=""
          type="tel"
          name="number"
          label="Mobile Number"
          className="rounded-l-none !focus:rounded-l-none"
        />
      </div>

      {/* Error messages */}
      {isError && errors.length > 0 && (
        <ul className="text-red-500 text-sm mt-2">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
