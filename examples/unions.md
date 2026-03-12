
# TypeScript jako teoria zbiorów


- Typ = **zbiór dozwolonych wartości**
- `A extends B` = `A ⊆ B`
- Operacje na typach = operacje na zbiorach
- TS to „system algebry zbiorów z regułami bezpieczeństwa”

```ts
Array extends Object 

'banana' | 'apple' extends string 
'banana' | undefined extends string | undefined
```



# Podstawy: typ jako zbiór

- `string` → zbiór wszystkich stringów
- ` "apple" ` → zbiór z jedną wartością - literal type // const

- ` never ` → zbiór pusty (∅)
- ` unknown ` → zbiór wszystkich wartości

---
- ` any ` → omija reguły (nieczysta teoria)


---

# Unia `A | B` = suma zbiorów

- `A | B` = wartości z A **lub** B
- `Owoce = Jabłko | Gruszka `
- `A | A = A`
- `A | never = A`

```ts
type Fruit = "apple" | "pear";
```


# Unia – intuicja zbiorowa

- `Jabłko | Owoce = Owoce`
- `Jabłko | Jabłko | Gruszka = Jabłko | Gruszka`
- Unia **poszerza zbiór**
