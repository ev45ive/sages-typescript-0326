export interface User {
  id: string;
  name: string;
  color: USER_COLORS;
  pet?: {
    name: string;
  };
}

export const USER_COLORS = ["red", "green", "blue"] as const;
export type  USER_COLORS = "red" | "green" | "blue";

// USER_COLORS.push('123') error!

export const users: User[] = [
  {
    id: "123",
    name: "Alice",
    color: USER_COLORS[0],
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
getUserInfo({ id: "123", name: "123", color: "123" /* , colour: 123 */ });

// const u2: User = { id: "123", name: "123", color: "123", colour:123}

// Class UserAggr
const u3 = {
  // IUserMeta
  id: "123",
  name: "123",
  color: "123",

  // IUserPet
  pet: { name: "123" },

  // IUserSocial
  friends: [],
  role: [],
};

// Polymorphism - Information Hiding
getUserInfo(u3);
getUserPet(u3);
