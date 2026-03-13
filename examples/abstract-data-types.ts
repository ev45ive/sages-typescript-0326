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
type X = { x: 1; c: string };
type Y = { y: 1; c: number };

type XandY = X & Y;
let XandY: XandY;

// XandY = { x: 1, y: 1, c: /* never */  }; // error

type IsModerator = { isIsModerator: boolean };
type IsAdmin = { isAdmin: boolean };
function IsAdmin(user: User): user is User & IsAdmin {
  return true;
}

type IsVerified = { isVerified: boolean };
function IsVerified(user: User): user is User & IsVerified {
  return (user as any).isVerified === true;
  //   return verfiedIds.has(user.id);
}

function assertIsVerified(user: User): asserts user is User & IsVerified {
  if (!IsVerified) throw new Error("User Not Verified - no access!");
}
// class Uzer implements IsAdmin,IsVerified {}

type User = {
  id: string;
  name: string;
};

const user: User = JSON.parse(
  '{ name: "Admin", isAdmin: true, isVerified: true }',
);

function publishPost(user: IsVerified) {
  //   if (!user.isVerified) throw "Error";
}
// if (IsVerified(user)) publishPost(user);

// publishPost(user) // Error - Not Verified

assertIsVerified(user); // Type Assertion Guard!
publishPost(user); // OK -  Verified

function banPost(user: (IsAdmin | IsModerator) & IsVerified) {
  // if (!user.isAdmin) throw "Error";
}

// if (IsVerified(user)) banPost(user);
if (IsAdmin(user) && IsVerified(user)) banPost(user);

// Component : IsVerified(user)
// Button @click -> APIService.banPost(user:Verified)
