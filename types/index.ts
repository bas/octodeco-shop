export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface BillingDetails {
  sameAsShipping: boolean;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface CheckoutFormData {
  shipping: ShippingDetails;
  billing: BillingDetails;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description?: string;
}
