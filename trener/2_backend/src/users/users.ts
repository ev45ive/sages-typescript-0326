export interface User {
  id: string;
  name: string;
  color: string;
  pet?: {
    name: string;
  };
}

export const users: User[] = [
  {
    id: "123",
    name: "Alice",
    color: "red",
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

export const USER_COLORS = ["red", "green", "blue"]

// users[0].name
// const type = typeof users; // JS - "object"
// type Users = typeof users   // TS - { id: string; ...
// type User = Users[number]
// type Pet = User['pet'] // Type lookup

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
