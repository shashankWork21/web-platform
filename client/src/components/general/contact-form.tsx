"use client";

import { useCountries } from "use-react-countries";
import { useAuth } from "@/context/authContext";
import { useFormState } from "react-dom";
import Input from "../general/input";
import PhoneInput from "./phone-input";
import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Typography } from "@material-tailwind/react";
import { createServiceRequestFromContactForm } from "@/actions";
import Dropdown, { DropdownOption } from "./dropdown";
import InputTextArea from "./textarea";
import { useRouter } from "next/navigation";

export default function ContactForm({ resources }: any) {
  const { user } = useAuth();
  const router = useRouter();
  const { countries } = useCountries();
  const countryCallingCodesCurrent = ["+1", "+91"];
  const countriesCurrent = countries.filter((country: any) =>
    countryCallingCodesCurrent.includes(country.countryCallingCode)
  );
  const [country, setCountry] = useState(0);

  const services = useMemo(() => {
    return (
      resources?.filter(
        (resource: any) => resource.resourceType === "SERVICE"
      ) || []
    );
  }, [resources]);

  const activeServiceOptions: DropdownOption[] = services.map(
    (service: any) => ({
      id: service.id,
      imageDisplay: false,
      display: service.title,
      value: service.title,
      selected: false,
    })
  );

  const [serviceOptions, setServiceOptions] = useState(activeServiceOptions);

  const [variantOptions, setVariantOptions] = useState<DropdownOption[]>([
    {
      id: "",
      imageDisplay: false,
      display: "Select a Service first",
      value: "",
      selected: false,
    },
  ]);

  const [formStatePassword, contactFormAction] = useFormState(
    createServiceRequestFromContactForm.bind(
      null,
      countriesCurrent[country].countryCallingCode as number,
      (variantOptions.find((variant) => variant.selected)?.id as string) || ""
    ),
    {
      success: false,
      errors: {},
    }
  );

  useEffect(() => {
    const selectedService = serviceOptions.find((service) => service.selected);

    if (selectedService) {
      const updatedVariants = services
        .find((service: any) => service.id === selectedService.id)
        .variants.map((variant: any) => ({
          id: variant.id,
          imageDisplay: false,
          display: variant.title,
          value: variant.title,
          selected: false,
        }));

      setVariantOptions(updatedVariants);
    }

    if (formStatePassword.success) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [serviceOptions, formStatePassword, router, services]);

  return (
    <form
      className="w-4/5 md:w-3/5 lg:w-2/5  flex flex-col space-y-5 items-center bg-stone-white-4 px-12 py-4 rounded-xl shadow-lg"
      action={contactFormAction}
    >
      <Typography variant="h3">Contact</Typography>
      <Input
        required
        type="text"
        name="firstName"
        placeholder="First Name"
        defaultValue={user.firstName || ""}
        isError={!!formStatePassword.errors?.firstName}
        errors={formStatePassword.errors?.firstName}
      />
      <Input
        required
        type="text"
        name="lastName"
        placeholder="Last Name"
        defaultValue={user.lastName || ""}
        isError={!!formStatePassword.errors?.lastName}
        errors={formStatePassword.errors?.lastName}
      />
      <Input
        required
        type="email"
        name="email"
        placeholder="Email"
        defaultValue={user.email || ""}
        isError={!!formStatePassword.errors?.email}
        errors={formStatePassword.errors?.email}
      />
      <PhoneInput
        required
        countries={countriesCurrent}
        country={country}
        setCountry={setCountry}
        isError={!!formStatePassword.errors?.phoneNumber}
        errors={formStatePassword.errors?.phoneNumber}
      />
      <Input
        required
        type="text"
        name="organisation"
        placeholder="Organisation"
        isError={!!formStatePassword.errors?.organisation}
        errors={formStatePassword.errors?.organisation}
      />
      <Input
        required
        type="text"
        name="orgRole"
        placeholder="Role in your Organisation"
        isError={!!formStatePassword.errors?.orgRole}
        errors={formStatePassword.errors?.orgRole}
      />
      <Dropdown
        itemLabel="Service"
        defaultValue={
          serviceOptions.find((service) => service.selected) || {
            id: "",
            imageDisplay: false,
            display: "Select",
            value: "",
            selected: true,
          }
        }
        options={serviceOptions}
        setOptions={setServiceOptions}
      />
      &quot;
      <Dropdown
        itemLabel="Type"
        defaultValue={
          variantOptions.find((variant) => variant.selected) || {
            id: "",
            imageDisplay: false,
            display: "Select",
            value: "",
            selected: true,
          }
        }
        options={variantOptions}
        setOptions={setVariantOptions}
      />
      <Input
        required
        type="text"
        name="subject"
        placeholder="Brief Context of what you're looking for"
        isError={!!formStatePassword.errors?.subject}
        errors={formStatePassword.errors?.subject}
      />
      <InputTextArea
        name="description"
        placeholder="Tell us more (Optional)"
        isError={false}
        errors={[]}
      />
      <Button
        type="submit"
        className=" bg-cypher-blue hover:bg-cypher-blue-4 text-white text-md transition-all duration-300"
      >
        Submit
      </Button>
      {formStatePassword.success && (
        <Alert color="green" className="text-center">
          Your details have been captured successfully! We&apos;ll reach out
          soon!
        </Alert>
      )}
    </form>
  );
}
