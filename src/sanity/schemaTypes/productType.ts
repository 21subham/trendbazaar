import { TrolleyIcon } from "@sanity/icons";
import { defineField } from "sanity";

export default {
  name: "product",
  title: "Product",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "description",
      type: "BlockContent",
    }),
    defineField({
      name: "price",
      title: "price",
      type: "number",
      validation: (Rule: any) => Rule.required().min(0),
    }),
  ],
};
