export const users = [
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
    color: "green",
    pet: { name: "Fish" },
  },
];

// users[0].name
const type = typeof users; // JS - "object"
type Users = typeof users   // TS - { id: string; ...