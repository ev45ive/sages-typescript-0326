
/**
 * Nice person
 */
export type Person = {
  name: string;
  company: {
    name: string;
  };
};

export type Collection<T> = { items: T[] }


// document.body // Statements are not allowed in ambient contexts.

// const x = 1;

declare const x = 1;