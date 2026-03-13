// Unions
type A = { a: 1; c?: string };
type B = { b: 1; c?: number };

type AorB = A | B;
let AorB: AorB;
AorB = { a: 1 };
AorB = { b: 1 };
AorB = { a: 1, b: 1 };

if ("a" in AorB) {
  AorB.a;
}

// Intersections
type X = { x: 1, c:string };
type Y = { y: 1, c:number };

type XandY = X & Y;
let XandY: XandY;

// XandY = { x: 1, y: 1, c: /* never */  }; // error
