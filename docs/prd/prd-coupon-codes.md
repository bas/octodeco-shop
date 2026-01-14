# PRD: Discount Coupon Code Feature

## 1. Product overview

### 1.1 Document title and version

- PRD: Discount Coupon Code Feature
- Version: 1.0

### 1.2 Product summary

This feature adds discount coupon code functionality to the Octodeco checkout experience. Users will be able to enter a coupon code during checkout to receive a percentage-based discount on their order. The feature integrates seamlessly with the existing checkout flow and order summary.

The implementation will use hardcoded coupon codes for demonstration purposes, with percentage-based discounts as the primary coupon type. Additionally, the free shipping threshold will be dynamically adjusted based on the discounted order total—orders over $25 after the coupon is applied will qualify for free shipping (reduced from the current $50 threshold).

## 2. Goals

### 2.1 Business goals

- Increase conversion rates by providing discount incentives
- Enable promotional campaigns through coupon distribution
- Provide a foundation for future coupon management features

### 2.2 User goals

- Easily apply discount codes during checkout
- See immediate feedback on discount savings
- Understand updated totals including discounts and shipping eligibility

### 2.3 Non-goals

- Admin interface for coupon management (future enhancement)
- Database-backed coupon storage (hardcoded for now)
- Multiple coupon stacking (only one coupon per order)
- Product-specific or category-specific restrictions
- Usage limits or expiration dates
- Fixed-amount discount coupons

## 3. User personas

### 3.1 Key user types

- Shoppers browsing and purchasing Octocat stickers
- Promotional campaign recipients with coupon codes

### 3.2 Basic persona details

- **Casual Shopper**: A user browsing the store who may have received a coupon code via email, social media, or a promotional campaign
- **Returning Customer**: A user who has previously purchased and received a loyalty discount code

### 3.3 Role-based access

- **Customer**: Can apply coupon codes during checkout, view discounts, and remove applied coupons

## 4. Functional requirements

- **Coupon input field** (Priority: High)
  - Text input field for entering coupon codes in the order summary section
  - "Apply" button to submit the coupon code
  - Input should be case-insensitive for better usability

- **Coupon validation** (Priority: High)
  - Validate coupon code against hardcoded list of valid codes
  - Display success message with discount percentage when valid
  - Display error message for invalid coupon codes
  - Clear error state when user modifies input

- **Discount calculation** (Priority: High)
  - Calculate percentage discount based on cart subtotal
  - Display discount amount as a line item in order summary
  - Update total to reflect discounted price

- **Applied coupon display** (Priority: High)
  - Show applied coupon code with discount percentage
  - Provide "Remove" button to clear applied coupon
  - Recalculate totals when coupon is removed

- **Dynamic free shipping threshold** (Priority: High)
  - Update free shipping eligibility based on post-discount total
  - Free shipping applies when discounted total exceeds $25
  - Display shipping status in order summary

- **State management** (Priority: Medium)
  - Store applied coupon in cart context
  - Persist coupon across page navigation during session
  - Clear coupon when cart is cleared

## 5. User experience

### 5.1 Entry points & first-time user flow

- User navigates to checkout page with items in cart
- Coupon input field is visible in the order summary section
- User enters coupon code and clicks "Apply"
- System validates and applies discount or shows error

### 5.2 Core experience

- **Enter code**: User types coupon code into the input field
  - Field is clearly labeled and easy to locate
  - Placeholder text provides guidance (e.g., "Enter coupon code")

- **Apply coupon**: User clicks "Apply" button
  - Button provides visual feedback during validation
  - Success state shows applied coupon with discount details
  - Error state shows clear message for invalid codes

- **View savings**: User sees updated order summary
  - Discount line item shows savings amount
  - Total updates to reflect discount
  - Free shipping status updates based on new total

- **Remove coupon**: User can remove applied coupon
  - "Remove" button or icon next to applied coupon
  - Order summary reverts to original totals

### 5.3 Advanced features & edge cases

- Empty coupon code submission shows validation error
- Whitespace in coupon codes is trimmed automatically
- Coupon input is disabled while a coupon is applied (must remove first)
- Cart becoming empty should clear any applied coupon

### 5.4 UI/UX highlights

- Coupon section positioned between cart items and totals in order summary
- Success state uses green color to indicate savings
- Error messages are clear and actionable
- Smooth transitions when totals update
- Mobile-responsive design consistent with existing checkout UI

## 6. Narrative

Sarah is shopping for Octocat stickers and has a 15% discount code she received from a promotional email. She adds several stickers to her cart totaling $40. At checkout, she enters her coupon code "SAVE15" in the coupon field and clicks Apply. The system immediately validates the code and shows her savings of $6.00. Her new total of $34.00 qualifies for free shipping (over the $25 threshold), which she sees reflected in the order summary. Satisfied with her savings, Sarah completes her purchase feeling good about the deal she received.

## 7. Success metrics

### 7.1 User-centric metrics

- Coupon application success rate (valid codes entered)
- User error rate (invalid code attempts)
- Checkout completion rate with coupons applied

### 7.2 Business metrics

- Percentage of orders using coupon codes
- Average discount amount per order
- Conversion rate improvement from coupon availability

### 7.3 Technical metrics

- Coupon validation response time
- Zero client-side calculation errors
- Consistent state across navigation

## 8. Technical considerations

### 8.1 Integration points

- CartContext: Add coupon state and discount calculations
- OrderSummary component: Display coupon input and discount breakdown
- Checkout validation: Include coupon in form submission (optional)

### 8.2 Data storage & privacy

- Coupon codes hardcoded in a constants file or lib module
- Applied coupon stored in React context (session only)
- No sensitive data involved in coupon handling

### 8.3 Scalability & performance

- Hardcoded approach is performant for demo purposes
- Future: API endpoint for coupon validation
- Future: Database storage for dynamic coupon management

### 8.4 Potential challenges

- Ensuring discount calculations are accurate with floating-point math
- Keeping UI state consistent when cart items change
- Handling edge case where discount exceeds cart total

## 9. Milestones & sequencing

### 9.1 Project estimate

- Small: 2-4 hours implementation

### 9.2 Team size & composition

- 1 developer (frontend)

### 9.3 Suggested phases

- **Phase 1**: Core implementation (2-3 hours)
  - Add coupon types and hardcoded coupon data
  - Extend CartContext with coupon state and calculations
  - Create CouponInput component
  - Update OrderSummary with discount display
  - Update free shipping threshold logic

- **Phase 2**: Polish and testing (1 hour)
  - Add error handling and edge cases
  - Write E2E tests for coupon flow
  - Ensure mobile responsiveness

## 10. User stories

### 10.1 Apply a valid coupon code

- **ID**: GH-001
- **Description**: As a shopper, I want to apply a valid coupon code so that I receive a discount on my order.
- **Acceptance criteria**:
  - Coupon input field is visible in the order summary section on checkout
  - User can enter a coupon code and click "Apply"
  - Valid coupon code is accepted (case-insensitive)
  - Success message displays showing the coupon code and discount percentage
  - Discount amount is calculated as a percentage of the subtotal
  - Order total updates to reflect the discount

### 10.2 See error for invalid coupon code

- **ID**: GH-002
- **Description**: As a shopper, I want to see a clear error message when I enter an invalid coupon code so that I know the code didn't work.
- **Acceptance criteria**:
  - Entering an invalid coupon code and clicking "Apply" shows an error message
  - Error message is descriptive (e.g., "Invalid coupon code")
  - Error clears when user modifies the input
  - User can try a different code after an error

### 10.3 Remove an applied coupon

- **ID**: GH-003
- **Description**: As a shopper, I want to remove an applied coupon so that I can try a different code or proceed without a discount.
- **Acceptance criteria**:
  - Applied coupon displays with a "Remove" button or icon
  - Clicking remove clears the applied coupon
  - Coupon input field becomes editable again
  - Order totals revert to non-discounted amounts
  - Free shipping eligibility recalculates based on original subtotal

### 10.4 See discount in order summary

- **ID**: GH-004
- **Description**: As a shopper, I want to see a clear breakdown of my discount in the order summary so that I understand my savings.
- **Acceptance criteria**:
  - Discount appears as a separate line item in order summary
  - Discount line shows negative amount (e.g., "-$6.00")
  - Discount line indicates the coupon code or percentage
  - Subtotal remains unchanged (shows original amount)
  - Total reflects the discounted price

### 10.5 Qualify for free shipping with discounted total

- **ID**: GH-005
- **Description**: As a shopper, I want free shipping to apply when my discounted order total exceeds $25 so that I benefit from the lower threshold.
- **Acceptance criteria**:
  - Free shipping eligibility is based on post-discount total
  - Orders over $25 after discount show "Free" shipping
  - Orders at or below $25 after discount show standard shipping message
  - Shipping status updates immediately when coupon is applied or removed

### 10.6 Validate empty coupon submission

- **ID**: GH-006
- **Description**: As a shopper, I want to see a validation error if I try to apply an empty coupon code so that I understand I need to enter a code.
- **Acceptance criteria**:
  - Clicking "Apply" with empty input shows validation error
  - Error message indicates a code is required
  - Whitespace-only input is treated as empty

### 10.7 Persist coupon during checkout session

- **ID**: GH-007
- **Description**: As a shopper, I want my applied coupon to persist if I navigate away from checkout and return so that I don't have to re-enter it.
- **Acceptance criteria**:
  - Applied coupon remains when navigating to other pages and back to checkout
  - Coupon is stored in cart context
  - Coupon clears when cart is emptied
  - Coupon clears when order is completed

---

*Please review this PRD and let me know if you'd like any changes. Once approved, I can create GitHub issues for each user story if you'd like.*
