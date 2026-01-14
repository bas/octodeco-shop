# Webshop Planning Prompt

## Usage
Use this prompt to generate a parallel-development plan for a new webshop project.

## Prompt

```
We are a [COMPANY_TYPE] company called [COMPANY_NAME] [OPTIONAL_CONTEXT]. This will be our webshop.

Write a plan for the following initial features:
- Landing page
- Product page
- Initial cart implementation
- Checkout page for shipping and billing details

Requirements:
1. Work streams should be parallelizable where possible
2. Include a foundation phase for shared code
3. Include a refactor phase to reduce duplication
4. Add acceptance criteria for each stream
5. Make technical decisions (don't leave open questions)

Save the plan in a docs folder in the repo.
```

## Example

```
We are a sticker company called Octodeco licensed to sell Octocat stickers. This will be our webshop.

Write a plan for the following initial features: landing page, product page, initial cart implementation and checkout page for just shipping and billing details. I want to work in parallel as much as possible for each page and then have a refactor task to tie things together and reduce code duplication. Save the plan in a docs folder in the repo.
```
