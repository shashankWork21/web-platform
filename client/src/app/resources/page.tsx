import { getActiveResources } from "@/actions/resources";
import ResourceList from "@/components/general/resource-list";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import Link from "next/link";

export default async function ResourcesPage() {
  const activeResources = await getActiveResources();
  console.log(JSON.stringify(activeResources));
  return <ResourceList activeResources={activeResources} />;
}

[
  {
    id: "cm09hvx310005979u880s8bka",
    createdById: "clxmzipxj00005qplb9jup0e6",
    title: "Consulting",
    description:
      "A one-on-one session with you to understand the needs of your business and how technology needs to be implemented in the best possible manner",
    resourceType: "SERVICE",
    isDisabled: null,
    createdAt: "2024-08-25T11:37:28.381Z",
    updatedAt: "2024-08-26T09:56:02.042Z",
    categoryId: "cm09huk4l0003979us9wf0tsz",
    createdBy: {
      firstName: "Shashank",
      lastName: "B R",
      email: "shashank@smartalgorhythm.com",
    },
    variants: [
      {
        id: "cm09mov930007979ul12x9ias",
        resourceId: "cm09hvx310005979u880s8bka",
        title: "Standard",
        details: [
          "Process automation guidance for routine and repetitive tasks",
          "Software Integration Consulting",
          "Team Training & Documentation Consulting",
          "Setup of Reports and Analytics",
          "Technical Support & Problem Solving Guidance",
        ],
        price: 4000,
        isDisabled: null,
        createdAt: "2024-08-25T13:51:57.496Z",
        updatedAt: "2024-08-25T14:12:08.147Z",
        currencyId: "clyrdnczs000169iglyufro3u",
        pricingModel: "HOURLY",
        unitCount: null,
        overages: null,
        includedVariantId: null,
        currency: { symbol: "₹", shortform: "INR", inrConversion: 1 },
      },
      {
        id: "cm0aobv76000f979uhqkbo15a",
        resourceId: "cm09hvx310005979u880s8bka",
        title: "Advanced",
        details: [
          "Advanced Automation Strategy",
          "Comprehensive Technical Infrastructure Consulting",
          "Custom Software Integration Consulting",
          "DevOps and CI/CD Pipeline Consulting",
          "Data Strategy and Advanced Analytics Consulting",
          "Ongoing Optimization and Strategic Support",
        ],
        price: 6000,
        isDisabled: null,
        createdAt: "2024-08-26T07:25:36.305Z",
        updatedAt: "2024-08-26T07:25:36.305Z",
        currencyId: "clyrdnczs000169iglyufro3u",
        pricingModel: "HOURLY",
        unitCount: null,
        overages: null,
        includedVariantId: "cm09mov930007979ul12x9ias",
        currency: { symbol: "₹", shortform: "INR", inrConversion: 1 },
      },
    ],
  },
];
