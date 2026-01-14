import { z } from "zod";

export const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

export const billingSchema = z.object({
  sameAsShipping: z.boolean(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
}).refine(
  (data) => {
    if (!data.sameAsShipping) {
      return (
        data.firstName &&
        data.lastName &&
        data.address &&
        data.city &&
        data.postalCode &&
        data.country
      );
    }
    return true;
  },
  {
    message: "Billing address is required when not same as shipping",
    path: ["firstName"],
  }
);

export const checkoutSchema = z.object({
  shipping: shippingSchema,
  billing: billingSchema,
});

export type ShippingFormData = z.infer<typeof shippingSchema>;
export type BillingFormData = z.infer<typeof billingSchema>;
export type CheckoutFormDataValidated = z.infer<typeof checkoutSchema>;
