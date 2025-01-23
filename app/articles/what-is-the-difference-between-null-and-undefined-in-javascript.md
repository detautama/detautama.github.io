---
title: "What is the Difference Between Null and Undefined in JavaScript?"
date: "2025-01-23"
description: "Learn what is the difference between 'null' and 'undefined' in JavaScript."
tag: "Marketing"
featured: true
---

<img src="/images/blog/what-is-the-difference-between-null-and-undefined-in-javascript.jpg" alt="Error Null or Undefined" />

We must often face conditional statement to check if the value of the variable is null or undefined.

Let's breakdown what are they mean.

`undefined` means a variable has been declared but has not yet been assigned a value.

```js 
var username;
console.log(username); //shows undefined
console.log(typeof username); //shows undefined
```

`null` is an assignment value. It can be assigned to a variable as a representation of no value.

```js
var testVar = null;
console.log(testVar); //shows null
console.log(typeof testVar); //shows object
```

### But.. what about this

*null: absence of value for a variable; undefined: absence of variable itself;*

```js
const a = {
    n: undefined
}

a.hasOwnProperty('n') // Return true
```


Also

```js
console.log(typeof(abc)) // log undefined

// and 

const abc = undefined
console.log(typeof(abc)) // log undefined
```

So I think this is only the intent of undefined is that the variable doesn't exist and the intent of null is that variable exists but has no value. Peeps are going into the implementation-specific details by checking typeof variables but missed to understand one of the most powerful term of CS called "abstraction".

