import { cn } from './utils'

// ============================================================================
// Step 1: Define what a variant config object looks like
// ============================================================================

/**
 * The shape of a config object passed to `variants()`.
 *
 * Uses a generic `V extends string` for the variant axis names (e.g. "variant", "size").
 * Each axis maps option names to class strings.
 */
export type VariantConfig<V extends string = string> = {
  base?: string
  variants: { [axis in V]: Record<string, string> }
  defaultVariants?: { [axis in V]?: string }
}

// ============================================================================
// Step 2: Extract the variants object type from a config
// ============================================================================

/**
 * Given a full config type, pull out just the `variants` field.
 *
 * Example: ExtractVariants<typeof config> =
 *   { variant: { default: "...", danger: "...", ... }, size: { default: "...", xs: "...", ... } }
 */
type ExtractVariants<C extends VariantConfig> = C['variants']

// ============================================================================
// Step 3: Map each variant axis to its allowed keys (as optional props)
// ============================================================================

/**
 * For each axis K in the variants object, create an optional prop
 * whose type is the union of that axis's option keys (or null).
 *
 * This uses only `keyof` and mapped types — no conditional types.
 * Vue's compiler-sfc can resolve this without errors.
 *
 * Example: MapToProps<{ variant: { default: "...", danger: "..." }, size: { sm: "...", lg: "..." } }>
 *        = { variant?: "default" | "danger" | null, size?: "sm" | "lg" | null }
 */
type MapToProps<V extends Record<string, Record<string, string>>> = {
  [K in keyof V]?: keyof V[K] | null
}

// ============================================================================
// Step 4: Compose — go from Config → Variants → Props in one step
// ============================================================================

/**
 * Extract variant props from a config type.
 * This is the main type helper to use in components.
 *
 * Usage:
 *   const config = { ... } as const satisfies VariantConfig
 *   type Props = VariantProps<typeof config>
 */
export type VariantProps<C extends VariantConfig> = MapToProps<ExtractVariants<C>>

// ============================================================================
// Step 5: Runtime function — resolves config + props → class string
// ============================================================================

/**
 * Creates a class resolver function from a variant config.
 *
 * Usage:
 *   const buttonVariants = variants(config)
 *   const cls = buttonVariants({ variant: 'danger', size: 'lg' })
 *   // → "inline-flex ... bg-destructive ... h-10 ..."
 */
export function variants<const C extends VariantConfig>(config: C) {
  return (props: VariantProps<C>): string => {
    // Start with base classes
    const classes: string[] = []

    if (config.base) {
      classes.push(config.base)
    }

    // For each variant axis, resolve the selected (or default) option
    for (const axis of Object.keys(config.variants)) {
      const selected =
        (props as Record<string, string | null | undefined>)[axis] ?? config.defaultVariants?.[axis]

      if (selected != null) {
        const axisOptions = config.variants[axis]
        if (axisOptions != null) {
          const cls = axisOptions[selected]
          if (cls != null) {
            classes.push(cls)
          }
        }
      }
    }

    return cn(...classes)
  }
}

// ============================================================================
// Test examples — hover over these in your IDE to see intermediate types
// ============================================================================

// A minimal test config to demonstrate the type pipeline
const _testConfig = {
  base: 'font-bold',
  variants: {
    color: {
      red: 'text-red-500',
      blue: 'text-blue-500',
    },
    size: {
      sm: 'text-sm',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    color: 'red',
    size: 'sm',
  },
} as const satisfies VariantConfig

// Hover: { color: { readonly red: "text-red-500"; readonly blue: "text-blue-500" }; size: { ... } }
type _Step1_Variants = ExtractVariants<typeof _testConfig>

// Hover: { color?: "red" | "blue" | null; size?: "sm" | "lg" | null }
type _Step2_Props = MapToProps<_Step1_Variants>

// Hover: same as _Step2_Props — the composed shortcut
type _Step3_Final = VariantProps<typeof _testConfig>

// Suppress unused warnings
void _testConfig
declare const _s1: _Step1_Variants
declare const _s2: _Step2_Props
declare const _s3: _Step3_Final
void _s1
void _s2
void _s3
