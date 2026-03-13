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

  ExhaustivenessCheck(id);

  //   return undefined; // Unreachable code detected.
}

function ExhaustivenessCheck(id: never): never {
  throw new Error("Invalid id"); // JS
}
