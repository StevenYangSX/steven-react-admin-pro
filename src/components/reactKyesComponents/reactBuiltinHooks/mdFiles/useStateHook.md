# Notes of `useState`

`useState` is better to illustrate by documentation rather then code.

## Overview

- `useState` is a React Hook that lets you add a [state variable](https://react.dev/learn/state-a-components-memory) to your component.

- ```javascript
  const [state, setState] = useState(initialState);
  ```

- Call `useState` at the top level of your component to declare a **state variable**.

- `useState(initialState)`

  - `initialState` : The value you want the state to be initially. This argument is ignored after the initial render.

  - If initialState is a **function**, It should be pure, should take no arguments, and should return a value of any type. React will call your initializer function when initializing the component, and store its return value as the initial state.

- Calling the `set` function [**does not** change the current state in the already executing code](https://react.dev/reference/react/useState#ive-updated-the-state-but-logging-gives-me-the-old-value):

  ```javascript
  function handleClick() {
    setName('Robin');
    console.log(name); // Still "Taylor"!
  }
  //It only affects what `useState` will return starting from the *next* render.
  ```

- Passing a value to `set` function is **different** from passing an **updater function**

  ```javascript
  // This is because calling the set function does not update 
  // the age state variable in the already running code.
  function handleClick() {
    setAge(age + 1); // setAge(42 + 1)
    setAge(age + 1); // setAge(42 + 1)
    setAge(age + 1); // setAge(42 + 1)
  }
  
  function handleClick() {
    setAge(a => a + 1); // setAge(42 => 43)
    setAge(a => a + 1); // setAge(43 => 44)
    setAge(a => a + 1); // setAge(44 => 45)
  }
  ```

- **Do Not MUTATE state !**  Use `Immer` to reduce repetitive code.

## Common Problems & Tips

- Updated the state, but logging gives the old value

  ```javascript
  // Calling the set function does not change state in the running code
  function handleClick() {
    console.log(count);  // 0
  
    setCount(count + 1); // Request a re-render with 1
    console.log(count);  // Still 0!
  
    setTimeout(() => {
      console.log(count); // Also 0!
    }, 5000);
  }
  
  // If you need to use the next state,
  // save it in a variable before passing it to the set function
  const nextCount = count + 1;
  setCount(nextCount);
  console.log(count);     // 0
  console.log(nextCount); // 1
  ```

- Set state to a function, but it gets called instead.

  ```javascript
  const [fn, setFn] = useState(someFunction);
  function handleClick() {
    setFn(someOtherFunction);
  }
  // React assumes that someFunction is an initializer function
  // and that someOtherFunction is an updater function
  // so it tries to call them and store the result. 
  // To actually store a function, you have to put 
  // () => before them in both cases. 
  // Then React will store the functions you pass.
  
  const [fn, setFn] = useState(() => someFunction);
  function handleClick() {
    setFn(() => someOtherFunction);
  }
  ```
