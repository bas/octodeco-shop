"use client";

import Input from "@/components/ui/Input";
import { BillingDetails } from "@/types";

interface BillingFormProps {
  values: BillingDetails;
  onChange: (field: keyof BillingDetails, value: string | boolean) => void;
  errors?: Partial<Record<keyof BillingDetails, string>>;
}

export default function BillingForm({ values, onChange, errors = {} }: BillingFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground tracking-tight">
        Billing Details
      </h2>

      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={values.sameAsShipping}
          onChange={(e) => onChange("sameAsShipping", e.target.checked)}
          className="w-5 h-5 rounded border-foreground/20 text-octodeco-purple focus:ring-octodeco-purple focus:ring-offset-0 cursor-pointer"
        />
        <span className="text-sm text-foreground group-hover:text-octodeco-purple transition-colors">
          Same as shipping address
        </span>
      </label>

      {!values.sameAsShipping && (
        <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={values.firstName || ""}
              onChange={(e) => onChange("firstName", e.target.value)}
              error={errors.firstName}
              placeholder="John"
              autoComplete="billing given-name"
            />
            <Input
              label="Last Name"
              value={values.lastName || ""}
              onChange={(e) => onChange("lastName", e.target.value)}
              error={errors.lastName}
              placeholder="Doe"
              autoComplete="billing family-name"
            />
          </div>

          <Input
            label="Address"
            value={values.address || ""}
            onChange={(e) => onChange("address", e.target.value)}
            error={errors.address}
            placeholder="123 Main Street, Apt 4B"
            autoComplete="billing street-address"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="City"
              value={values.city || ""}
              onChange={(e) => onChange("city", e.target.value)}
              error={errors.city}
              placeholder="San Francisco"
              autoComplete="billing address-level2"
            />
            <Input
              label="Postal Code"
              value={values.postalCode || ""}
              onChange={(e) => onChange("postalCode", e.target.value)}
              error={errors.postalCode}
              placeholder="94102"
              autoComplete="billing postal-code"
            />
            <Input
              label="Country"
              value={values.country || ""}
              onChange={(e) => onChange("country", e.target.value)}
              error={errors.country}
              placeholder="United States"
              autoComplete="billing country-name"
            />
          </div>
        </div>
      )}
    </div>
  );
}
