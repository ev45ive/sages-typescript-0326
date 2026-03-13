export interface User {
  id: string;
  name: string;
  color: string;
  pet?: {
    name: string;
  };
}


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
  color: "red",

  // IUserPet
  pet: { name: "123" },

  // IUserSocial
  friends: [],
  role: [],
};

// Polymorphism - Information Hiding
getUserInfo(u3);
getUserPet(u3);
