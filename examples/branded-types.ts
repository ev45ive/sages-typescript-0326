export {};

// Structural Type System

type Point = { x: number; y: number };
type Vector = { x: number; y: number; length: number };

let point = {} as Point;
let vector = {} as Vector;

// Duck Typing
point = vector;
// vector = point; // Property 'length' is missing in type 'Point' but required in type 'Vector'

// class PostId {}

const post = {} as Post;

// declare const PostIdBrand: unique symbol;
// type PostId = string & { [PostIdBrand]: "Post" };
// const PostId = (id: string) => id as PostId;

import { z } from "../trener/2_backend/node_modules/zod";

const PostId = z.string().min(2).brand('PostId')
type PostId = z.infer<typeof PostId>

interface Post {
  id: PostId;
  name: string;
}

const user = {} as User;
type UserId = string & { __brand: "User" };
interface User {
  id: UserId;
  name: string;
}
declare function getPostById(id: Post["id"]): Post;
declare function getUserById(id: User["id"]): User;

const userId = "123" as UserId;
// const paramId = "123" as PostId;
const paramId = PostId.parse("123");

// if(paramId.__brand == 'Post') // Impossible -> There is no Spoon!

// getUserById(paramId); // Error - Argument of type 'PostId' is not assignable to parameter of type 'UserId'.
getPostById(paramId);
