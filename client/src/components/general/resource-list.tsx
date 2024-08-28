"use client";

import { Typography, Card, CardBody, Button } from "@material-tailwind/react";
import Link from "next/link";
import ResourceTypeChip from "./resource-type-chip";

export default function ResourceList({ activeResources }: any) {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <Typography variant="h3" className="text-center mb-6">
        Resources
      </Typography>
      <div className="grid grid-cols-1 gap-8">
        {activeResources.map((resource: any) => (
          <Card
            key={resource.id}
            className="shadow-lg p-6 w-full lg:w-3/4 bg-stone-white-5 mx-auto"
          >
            <CardBody>
              <div className="flex flex-row items-start mb-4 space-x-3">
                <Typography variant="h4">{resource.title}</Typography>
                <ResourceTypeChip
                  resourceType={resource.resourceType}
                  size="md"
                />
              </div>
              <Typography className="font-medium mb-4">
                {resource.description}
              </Typography>
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {resource.variants.map((variant: any) => (
                  <Card
                    key={variant.id}
                    className="shadow-md p-4 h-full flex flex-col justify-between"
                  >
                    <CardBody className="flex flex-col justify-between h-full">
                      <div>
                        <Typography variant="h5" className="mb-2">
                          {variant.title}
                        </Typography>
                        {variant.includedVariant ? (
                          <Typography className="mb-2 font-medium">
                            Includes everything in{" "}
                            <span className="font-bold">
                              {variant.includedVariant.title}
                            </span>{" "}
                            plus:
                          </Typography>
                        ) : (
                          <Typography className="mb-2 font-medium">
                            Includes:
                          </Typography>
                        )}
                        <ul className="list-disc pl-5 mb-4">
                          {variant.details.map(
                            (detail: string, index: number) => (
                              <li className="mb-1" key={index}>
                                {detail}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div className="mt-auto">
                        <Typography className="mt-16 mb-4" variant="h4">
                          Price: {variant.currency.symbol}
                          {variant.price} ({variant.pricingModel})
                        </Typography>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
              <div className="w-full flex justify-center">
                <Link href="/contact">
                  <Button className="mx-auto mt-5" size="lg">
                    Contact
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
