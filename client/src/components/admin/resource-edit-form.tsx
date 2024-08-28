"use client";

import {
  modifyResource,
  deleteResource,
  disableResource,
  enableResource,
} from "@/actions";
import { useState } from "react";
import ResourceCreationForm from "./resource-creation-form";
import ResourcePanel from "./resource-panel";
import { DropdownOption } from "../general/dropdown";
import { resourceTypes } from "@/utils/pricing.utils";

export default function ResourceEditForm(props: any) {
  const resourceTypeOptionArray: DropdownOption[] = Object.values(
    resourceTypes
  ).map((model: string, index: number) => {
    return {
      id: `${index}`,
      imageDisplay: false,
      display: model,
      value: model,
      selected: model === props.resource.resourceType,
    } as DropdownOption;
  });

  const [resourceTypeOptions, setResourceTypeOptions] = useState(
    resourceTypeOptionArray
  );

  const selectedResourceTypeOption = resourceTypeOptions.find(
    (option) => option.selected
  ) as DropdownOption;

  const modifyResourceAction = modifyResource.bind(
    null,
    props.resource.id,
    props.resource.categoryId,
    selectedResourceTypeOption.value || ""
  );
  const deleteResourceAction = deleteResource.bind(null, props.resource.id);
  const disableResourceAction = disableResource.bind(
    null,
    props.resource.id,
    props.resource.title,
    props.resource.description,
    props.resource.categoryId,
    props.resource.resourceType
  );
  const enableResourceAction = enableResource.bind(
    null,
    props.resource.id,
    props.resource.title,
    props.resource.description,
    props.resource.categoryId,
    props.resource.resourceType
  );
  const [edit, setEdit] = useState(false);

  // Create Interface

  return !edit ? (
    <ResourcePanel
      currencies={props.currencies}
      resource={props.resource}
      deleteResourceAction={deleteResourceAction}
      disableResourceAction={disableResourceAction}
      enableResourceAction={enableResourceAction}
      edit={edit}
      setEdit={setEdit}
    />
  ) : (
    <ResourceCreationForm
      formAction={modifyResourceAction}
      buttonText="Save"
      resourceTypeOptions={resourceTypeOptions}
      setResourceTypeOptions={setResourceTypeOptions}
      defaultValues={{
        title: props.resource.title,
        description: props.resource.description,
        resourceType: props.resource.resourceType,
      }}
      onSuccess={() => {
        setEdit(!edit);
      }}
    />
  );
}
