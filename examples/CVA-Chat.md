User: [@vue/compiler-sfc] Unresolvable type: TSConditionalType

C:/Projects/sages-typescript-0326/node_modules/class-variance-authority/dist/types.d.ts
27 | className?: never;
28 | };
29 | export type OmitUndefined<T> = T extends undefined ? never : T;
| ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
30 | export type StringToBoolean<T> = T extends "true" | "false" ? boolean : T;
31 |

GitHub Copilot:

The Vue compiler-sfc can't resolve conditional types like `OmitUndefined<T>` from CVA's `VariantProps`. The fix is to explicitly define the variant prop types instead of relying on the inferred `VariantProps` generic.

Replacing 37 lines with 39 lines in [](file:///c%3A/Projects/sages-typescript-0326/src/components/AppButton.vue)

```

```

Vue's `defineProps` macro resolves types at compile time and can't handle conditional types like `OmitUndefined<T>` and `StringToBoolean<T>` from CVA's `VariantProps`. The fix replaces `VariantProps<typeof buttonVariants>` with explicitly spelled-out `variant` and `size` prop types that mirror the same keys from the CVA config. The runtime behavior is identical — just the type declaration is now compiler-friendly.

Made changes.

User: any way to map it without spelling out in vue?

GitHub Copilot:

Read [](file:///c%3A/Projects/sages-typescript-0326/src/components/AppButton.vue)

Yes — you can derive the types from the config object itself using a simple mapped type that avoids conditionals. Extract the variants config as a `const` and map its keys:

Replacing 38 lines with 44 lines in [](file:///c%3A/Projects/sages-typescript-0326/src/components/AppButton.vue)

Read [](file:///c%3A/Projects/sages-typescript-0326/src/components/AppButton.vue#1-1), lines 1 to 55

I see you've already started extracting. The trick is to pull the entire `variants` config (both `variant` and `size`) into one `as const` object, then use a simple mapped type to derive all props at once:

Replacing 39 lines with 43 lines in [](file:///c%3A/Projects/sages-typescript-0326/src/components/AppButton.vue)

```

```

Now the variant props are derived automatically. The approach:

1. **Extract** the full variants config into `variantConfig` with `as const` so TypeScript infers literal keys
2. **Map** with `VariantOptions<T>` — a simple mapped type: `{ [K in keyof T]?: keyof T[K] | null }` — which produces the same result as CVA's `VariantProps` but uses no conditional types
3. **Intersect** it into `Props`

If you add a new variant key to `variantConfig`, the prop type updates automatically — no manual spelling out needed. And Vue's compiler-sfc is happy because `VariantOptions` only uses mapped types (`keyof`, `in`), not conditional types (`extends ? :`).

Made changes.

User: create generic helpers and js functions to handle component variants in CVA style in minimal but reusable way

GitHub Copilot:

Research CVA helper needs

Read [](file:///c%3A/Projects/sages-typescript-0326/src/components/AppButton.vue)

Read [](file:///c%3A/Projects/sages-typescript-0326/package.json#1-1), lines 1 to 50

Read [](file:///c%3A/Projects/sages-typescript-0326/tsconfig.app.json)

Read [](file:///c%3A/Projects/sages-typescript-0326/src)

Read [](file:///c%3A/Projects/sages-typescript-0326/src/components)

Searched for regex `variant|cva|class-variance` (`**/src/components/**/*.vue`), 20 results

Read [](file:///c%3A/Projects/sages-typescript-0326/examples/abstract-data-types.ts)

Read [](file:///c%3A/Projects/sages-typescript-0326/examples/branded-types.ts)

Read [](file:///c%3A/Projects/sages-typescript-0326/examples/mapped.ts#1-1), lines 1 to 80

Read [](file:///c%3A/Projects/sages-typescript-0326/examples/conditional.ts)

Read [](file:///c%3A/Projects/sages-typescript-0326/examples/generics.ts#1-1), lines 1 to 50

Read [](file:///c%3A/Projects/sages-typescript-0326/examples/indexed.ts)

Read [](file:///c%3A/Projects/sages-typescript-0326/examples/inferred.ts)

## Plan: Minimal CVA-style variant helpers

Build a lightweight, Vue-compiler-safe variant system from scratch using mapped types and a small runtime function. This replaces the CVA import entirely, avoids `TSConditionalType` errors, and stays reusable across components.

Two new files, one component update:

**Steps**

1. **Create src/lib/utils.ts** — a `cn()` helper combining `clsx` and `tailwind-merge` (both already in package.json). Single export: `cn(...inputs: ClassValue[]): string`.

2. **Create src/lib/variants.ts** with three exports:
   - **`VariantConfig` type** — describes the config shape: `{ base?: string, variants: Record<string, Record<string, string>>, defaultVariants?: Record<string, string> }`. Used as a constraint.
   - **`VariantProps<C>` mapped type** — extracts prop types from a config object using only `keyof` and indexed access (no conditional types, Vue-safe):

     ```
     { [K in keyof C['variants']]?: keyof C['variants'][K] | null }
     ```

     Given `typeof config`, this automatically produces `{ variant?: 'default' | 'danger' | ... | null, size?: 'default' | 'xs' | ... | null }`.

   - **`variants(config)` function** — takes an `as const` config object, returns a resolver function `(props) => string`. The resolver:
     1. Starts with `config.base`
     2. Iterates `config.variants` keys
     3. For each key, picks `props[key] ?? config.defaultVariants[key]`
     4. Looks up the class string from `config.variants[key][value]`
     5. Merges all classes via `cn()`

   Must handle `noUncheckedIndexedAccess: true` (the tsconfig enables it) — use optional chaining / nullish coalescing on all indexed lookups.

3. **Update AppButton.vue**:
   - Remove `import { cva }` — no more CVA dependency in components
   - Import `variants` and `VariantProps` from `@/lib/variants`
   - Keep the `config` object as-is (it already has the right shape)
   - Define `const buttonVariants = variants(config)`
   - Define `Props` as `{ as?: string } & VariantProps<typeof config>`
   - Compute `styleClass` as `buttonVariants($props)`

**Verification**

- Run `npx vue-tsc --noEmit` — should produce no `Unresolvable type: TSConditionalType` errors
- Run `npm run dev` — button should render with correct Tailwind classes
- In a template consumer, verify that `<AppButton variant="danger" size="lg">` autocompletes variant/size values
- Test that omitting `variant`/`size` applies the `defaultVariants` classes
- Test that `variant="invalid"` produces a type error

**Decisions**

- Custom helpers over CVA: eliminates the conditional-type issue at its root and keeps the dependency footprint smaller for components
- `cn()` (clsx + twMerge) for class merging: both are already installed, and `twMerge` prevents Tailwind class conflicts when consumers add overrides later
- Config uses `as const` + `satisfies VariantConfig` (not generic parameter): keeps the literal types narrow for `keyof` extraction while validating shape at the declaration site

User: do it in readable way - complex generics in steps with comments and test example types to hover and see intermediate types

GitHub Copilot:

Created 4 todos

Read [](file:///c%3A/Projects/sages-typescript-0326/src/components/AppButton.vue)

Created [](file:///c%3A/Projects/sages-typescript-0326/src/lib/utils.ts)

Starting: _Create src/lib/variants.ts with step-by-step generics_ (2/4)

Created [](file:///c%3A/Projects/sages-typescript-0326/src/lib/variants.ts)

Starting: _Update AppButton.vue to use new helpers_ (3/4)

Replacing 50 lines with 42 lines in [](file:///c%3A/Projects/sages-typescript-0326/src/components/AppButton.vue)

```

```

Starting: _Verify with vue-tsc_ (4/4)

Ran terminal command: cd /c/Projects/sages-typescript-0326 && npx vue-tsc --noEmit 2>&1

Completed: _Verify with vue-tsc_ (4/4)

Clean build — no errors. Here's what was created:

### utils.ts — `cn()` helper

Combines `clsx` + `tailwind-merge` for class merging with Tailwind conflict resolution.

### variants.ts — the type pipeline in 5 commented steps

| Step | Type                 | What it does                                                       |
| ---- | -------------------- | ------------------------------------------------------------------ |
| 1    | `VariantConfig<V>`   | Describes the config shape — `base`, `variants`, `defaultVariants` |
| 2    | `ExtractVariants<C>` | Pulls out `C['variants']` — the nested variant object              |
| 3    | `MapToProps<V>`      | Maps each axis to `keyof V[K] \| null` — **no conditional types**  |
| 4    | `VariantProps<C>`    | Composes steps 2+3: config → props in one shot                     |
| 5    | `variants(config)`   | Runtime function returning a `(props) => string` resolver          |

At the bottom of the file there's a `_testConfig` with hoverable test types:

```ts
// Hover to see: { color: { readonly red: "text-red-500"; ... }; size: { ... } }
type _Step1_Variants = ExtractVariants<typeof _testConfig>

// Hover to see: { color?: "red" | "blue" | null; size?: "sm" | "lg" | null }
type _Step2_Props = MapToProps<_Step1_Variants>

// Hover to see: same — the composed shortcut
type _Step3_Final = VariantProps<typeof _testConfig>
```

### AppButton.vue — updated

Now uses `as const satisfies VariantConfig` for config validation, `variants(config)` for class resolution, and `VariantProps<typeof config>` for auto-derived props — both `variant` and `size` axes included.

Made changes.
