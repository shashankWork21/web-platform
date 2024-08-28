"use client";

import {
  modifyCategory,
  deleteCategory,
  disableCategory,
  enableCategory,
} from "@/actions";
import { useState } from "react";
import CategoriesPanel from "./category-panel";
import CategoryCreationForm from "./category-creation-form";

export default function CategoryEditForm(props: any) {
  const modifyCategoryAction = modifyCategory.bind(null, props.category.id);
  const deleteCategoryAction = deleteCategory.bind(null, props.category.id);
  const disableCategoryAction = disableCategory.bind(
    null,
    props.category.id,
    props.category.title,
    props.category.description
  );
  const enableCategoryAction = enableCategory.bind(
    null,
    props.category.id,
    props.category.title,
    props.category.description
  );
  const [edit, setEdit] = useState(false);

  // Create Interface

  return !edit ? (
    <CategoriesPanel
      currencies={props.currencies}
      category={props.category}
      deleteResourceAction={deleteCategoryAction}
      disableResourceAction={disableCategoryAction}
      enableResourceAction={enableCategoryAction}
      edit={edit}
      setEdit={setEdit}
    />
  ) : (
    <CategoryCreationForm
      formAction={modifyCategoryAction}
      buttonText="Save"
      defaultValues={{
        title: props.category.title,
        description: props.category.description,
      }}
      onSuccess={() => {
        setEdit(!edit);
      }}
    />
  );
}
