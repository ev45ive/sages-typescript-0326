# Instalacje

node -v
v24.11.1

npm -v
11.6.2

git -v
git version 2.40.1.windows.1



# TSC - TypeScript 
npm i -g typescript@latest

tsc -v
Version 5.9.3

# NPM Path
where tsc
C:\Program Files\nodejs\tsc

echo $PATH


# Migracja JS -> TS 
https://jsdoc.app/
https://tsdoc.org/

# TS Config
tsc --init

tsc ./src/index.ts --target es2022 --strict --allowJs --outDir "./dist" --rootDir ./src --lib dom,esnext --init

--target - what to transpile to... (syntax)
--lib - what should be already there.. (api)

Created a new tsconfig.json                                                                                             
You can learn more at https://aka.ms/tsconfig


# Polyfills - core.js

```ts
import 'core-js/actual/promise';
import 'core-js/actual/set';
import 'core-js/actual/iterator';
import 'core-js/actual/array/from';
import 'core-js/actual/array/flat-map';
import 'core-js/actual/structured-clone';

if(!window.Promise) { window.Promise = () => ... }
```

# SourceMaps

    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
 
node  --enable-source-maps ./dist/

C:\Projects\sages-typescript-0326\trener\1_migration\src\index.ts:25
throw new Error('Ups...')
^

Error: Ups...
    at Object.<anonymous> (C:\Projects\sages-typescript-0326\trener\1_migration\src\index.ts:25:7)

# Ambient declaration 

tsc -d   --emitDeclarationOnly --allowJs  src/lib/index.js

From outside index.d.ts defined types for index.js 