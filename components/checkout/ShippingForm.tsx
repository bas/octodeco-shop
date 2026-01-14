"use client";

import Input from "@/components/ui/Input";
import { ShippingDetails } from "@/types";

interface ShippingFormProps {
  values: ShippingDetails;
  onChange: (field: keyof ShippingDetails, value: string) => void;
  errors?: Partial<Record<keyof ShippingDetails, string>>;
}

export default function ShippingForm({ values, onChange, errors = {} }: ShippingFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground tracking-tight">
        Shipping Details
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={values.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          error={errors.firstName}
          placeholder="John"
          autoComplete="given-name"
        />
        <Input
          label="Last Name"
          value={values.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          error={errors.lastName}
          placeholder="Doe"
          autoComplete="family-name"
        />
      </div>

      <Input
        label="Email"
        type="email"
        value={values.email}
        onChange={(e) => onChange("email", e.target.value)}
        error={errors.email}
        placeholder="john@example.com"
        autoComplete="email"
      />

      <Input
        label="Address"
        value={values.address}
        onChange={(e) => onChange("address", e.target.value)}
        error={errors.address}
        placeholder="123 Main Street, Apt 4B"
        autoComplete="street-address"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="City"
          value={values.city}
          onChange={(e) => onChange("city", e.target.value)}
          error={errors.city}
          placeholder="San Francisco"
          autoComplete="address-level2"
        />
        <Input
          label="Postal Code"
          value={values.postalCode}
          onChange={(e) => onChange("postalCode", e.target.value)}
          error={errors.postalCode}
          placeholder="94102"
          autoComplete="postal-code"
        />
        <Input
          label="Country"
          value={values.country}
          onChange={(e) => onChange("country", e.target.value)}
          error={errors.country}
          placeholder="United States"
          autoComplete="country-name"
        />
      </div>
    </div>
  );
}
