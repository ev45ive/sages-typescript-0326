import { add, getPersonInfo } from "./lib";


add(1, 2);

// @ts-expect-error
add('1', 2); // err?

// @ts-ignore
add('1', []); // erro?


// getPersonInfo({}) // err