"use client";

import { useState } from "react";
import DataActions from "./data-actions";
import { createResource } from "@/actions";
import { DropdownOption } from "../general/dropdown";
import ResourceCreationForm from "./resource-creation-form";
import { resourceTypes } from "@/utils/pricing.utils";
import ResourceEditForm from "./resource-edit-form";
import { Button, Typography } from "@material-tailwind/react";

export default function CategoriesPanel(props: any) {
  const resourceTypesOptionArray: DropdownOption[] = Object.values(
    resourceTypes
  ).map((model: string, index: number) => {
    return {
      id: `${index}`,
      imageDisplay: false,
      display: model,
      value: model,
      selected: false,
    } as DropdownOption;
  });

  const [resourceTypeOptions, setResourceTypeOptions] = useState(
    resourceTypesOptionArray
  );

  const selectedResourceType = resourceTypeOptions.find(
    (resourceType) => resourceType.selected
  ) as DropdownOption;

  const createResourceAction = createResource.bind(
    null,
    props.category.id,
    selectedResourceType?.value || ""
  );

  const [openResourceForm, setOpenResourceform] = useState(false);
  return (
    <div className="w-full flex flex-col items-start justify-start space-y-5 shadow-lg bg-stone-white-4 p-5 rounded-lg border border-stone-white-8">
      <div className="flex flex-row justify-between w-full items-center">
        <h4 className="text-2xl font-semibold w-1/2">{props.category.title}</h4>
        <DataActions
          isDisabled={props.category.isDisabled}
          enableAction={props.enableResourceAction}
          disableAction={props.disableResourceAction}
          deleteAction={props.deleteResourceAction}
          edit={props.edit}
          setEdit={props.setEdit}
        />
      </div>
      <p>{props.category.description}</p>

      <div className="w-full flex flex-col items-center spacy-y-4">
        {props.category.resources.length > 0 && (
          <div className="w-full flex flex-col items-center justify-between space-y-2">
            <Typography variant="h4">Resources</Typography>
            {props.category.resources.map((resource: any) => {
              return (
                <ResourceEditForm
                  key={resource.id}
                  resource={resource}
                  currencies={props.currencies}
                />
              );
            })}
          </div>
        )}
        {!openResourceForm && (
          <Button
            className="mt-10"
            onClick={() => {
              setOpenResourceform(!openResourceForm);
            }}
          >
            Add Resource
          </Button>
        )}
        {openResourceForm && (
          <ResourceCreationForm
            currencies={props.currencies}
            formAction={createResourceAction}
            resourceTypeOptions={resourceTypeOptions}
            setResourceTypeOptions={setResourceTypeOptions}
            buttonText="Create"
            defaultValues={{
              title: "",
              description: "",
              resourceType: null,
            }}
            onSuccess={() => {
              setOpenResourceform(!openResourceForm);
            }}
          />
        )}
      </div>
      <p className="font-bold">
        Created By: {props.category.createdBy.firstName}{" "}
        {props.category.createdBy.lastName}
      </p>
    </div>
  );
}
