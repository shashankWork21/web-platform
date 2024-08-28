"use client";

import { useCountries } from "use-react-countries";
import { registerUser } from "@/actions";
import { useAuth } from "@/context/authContext";
import { useFormState } from "react-dom";
import Input from "../general/input";
import PhoneInput from "../general/phone-input";
import { useState } from "react";

export default function RegisterForm() {
  const { user } = useAuth();
  const { countries } = useCountries();
  const countryCallingCodesCurrent = ["+1", "+91"];
  const countriesCurrent = countries.filter((country: any) =>
    countryCallingCodesCurrent.includes(country.countryCallingCode)
  );
  const [country, setCountry] = useState(0);
  const [formStatePassword, passwordAaction] = useFormState(
    registerUser.bind(
      null,
      "",
      countriesCurrent[country].countryCallingCode as number
    ),
    {
      errors: {},
    }
  );
  const [formStateGoogle, googleAction] = useFormState(
    registerUser.bind(
      null,
      user.id as string,
      countries[country].countryCallingCode as number
    ),
    { errors: {} }
  );

  console.log(formStatePassword);

  return (
    <form
      className="w-4/5 md:w-3/5 lg:w-2/5  flex flex-col space-y-5 items-center bg-stone-white-4 px-3 py-8 rounded-xl shadow-lg"
      action={!!user.id ? googleAction : passwordAaction}
    >
      <h3 className="text-3xl font-semibold">Register</h3>
      <Input
        required
        type="text"
        name="firstName"
        placeholder="First Name"
        defaultValue={user.firstName || ""}
        isError={
          !!formStatePassword.errors.firstName ||
          !!formStateGoogle.errors.firstName
        }
        errors={
          formStatePassword.errors.firstName || formStateGoogle.errors.firstName
        }
      />
      <Input
        required
        type="text"
        name="lastName"
        placeholder="Last Name"
        defaultValue={user.lastName || ""}
        isError={
          !!formStatePassword.errors.password ||
          !!formStatePassword.errors.oAuthProfile
        }
        errors={
          formStatePassword.errors.lastName || formStateGoogle.errors.lastName
        }
      />
      <Input
        required
        type="email"
        name="email"
        placeholder="Email"
        defaultValue={user.email || ""}
        isError={
          !!formStatePassword.errors.email || !!formStateGoogle.errors.email
        }
        errors={formStatePassword.errors.email || formStateGoogle.errors.email}
      />

      <PhoneInput
        required
        countries={countries.filter((country: any) =>
          countryCallingCodesCurrent.includes(country.countryCallingCode)
        )}
        country={country}
        setCountry={setCountry}
        isError={
          !!formStatePassword.errors.phoneNumber ||
          !!formStateGoogle.errors.phoneNumber
        }
        errors={
          formStatePassword.errors.phoneNumber ||
          formStateGoogle.errors.phoneNumber
        }
      />

      <Input
        type="text"
        name="organisation"
        placeholder="Organisation"
        isError={
          !!formStatePassword.errors.organisation ||
          !!formStateGoogle.errors.organisation
        }
        errors={
          formStatePassword.errors.organisation ||
          formStateGoogle.errors.organisation
        }
      />
      <Input
        type="text"
        name="orgRole"
        placeholder="Role in your Organisation"
        isError={
          !!formStatePassword.errors.orgRole || !!formStateGoogle.errors.orgRole
        }
        errors={
          formStatePassword.errors.orgRole || formStateGoogle.errors.orgRole
        }
      />
      {!user.oAuthProfile && (
        <>
          <Input
            required
            type="password"
            name="password"
            placeholder="Password"
            isError={
              !!formStatePassword.errors.password ||
              !!formStatePassword.errors.oAuthProfile
            }
            errors={
              formStatePassword.errors.password || [
                "You must use a password if you are not logging in through google",
              ]
            }
          />
          <Input
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            isError={!!formStatePassword.errors.passwordMismatch}
            errors={formStatePassword.errors.passwordMismatch}
          />
        </>
      )}
      <button
        type="submit"
        className="px-10 py-3 rounded-xl shadow-xl bg-cypher-blue hover:bg-cypher-blue-4 text-white text-lg transition-all duration-300"
      >
        Register
      </button>
    </form>
  );
}
