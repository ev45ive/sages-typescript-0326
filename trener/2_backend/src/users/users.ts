import { NotFound } from "./HttpError";

export interface User {
  id: string;
  name: string;
  color: USER_COLORS;
  pet?: {
    name: string;
  };
}

export function getUserById(id: User["id"]): User {
  const user = users.find((u) => u.id === id);
  if (!user) throw new NotFound("User not found");
  return user;
}

export const USER_COLORS = ["red", "green", "pink", "blue"] as const;
export type USER_COLORS = (typeof USER_COLORS)[number];

// Type Guard Function: color is USER_COLORS
export function isValidColor(color: unknown): color is USER_COLORS {
  return USER_COLORS.includes(color as USER_COLORS);
}

export const users: User[] = [
  {
    id: "123",
    name: "Alice",
    // colors: USER_COLORS.RED
    color: "green",
    pet: { name: "Cat" },
  },
  {
    id: "234",
    name: "Bob",
    color: "blue",
    pet: { name: "Dog" },
  },
  {
    id: "345",
    name: "Kate",
    color: "pink",
    // pet: { name: "Fish" },
  },
];

export function getUserInfo(user: User) {}
export function getUserPet(user: { pet: User["pet"] }) {
  user.pet?.name;
  // (user as User).name
}

// Freshness
getUserInfo({ id: "123", name: "123", color: "blue" /* , colour: 123 */ });

// const u2: User = { id: "123", name: "123", color: "123", colour:123}

// Class UserAggr
const u3 = {
  // IUserMeta
  id: "123",
  name: "123",
  color: "red" as USER_COLORS,

  // IUserPet
  pet: { name: "123" },

  // IUserSocial
  friends: [],
  role: [],
};

// Polymorphism - Information Hiding
getUserInfo(u3);
getUserPet(u3);
