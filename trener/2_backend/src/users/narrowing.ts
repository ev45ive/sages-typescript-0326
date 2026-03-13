function normalizeID(id: number | string) {
  if (typeof id === "number") {
    return id.toFixed(); // string
  }

  if (typeof id === "string") {
    return id.toLowerCase(); // string
  }

  if (typeof id === "object") {
    return id; // never
  }

  // Exhaustiveness check
  //   const never: never = id;
  id satisfies never;
  throw new Error("Invalid id");

  // return undefined
}
