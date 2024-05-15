# React Admin Template

## Am Admin/Portfolio template for building data-driven applications running in the browser on top of REST APIs, using ES6, [React](https://facebook.github.io/react/) and [Ant Design 5.0](https://ant.design/)

## 1. Installation

```sh
npm install 
# then start the project
npm run dev
```

## 2. React Router V6

### Types of react router

- `createBrowerRouter()`: Recommended router for all React Router web projects. It uses the [DOM History API](https://developer.mozilla.org/en-US/docs/Web/API/History) to update the URL and manage the history stack.

- `createHashRouter()`: This router is useful if you are unable to configure your web server to direct all traffic to your React Router application. Instead of using normal URLs, it will use the hash (#) portion of the URL to manage the "application URL".

- `createMemoryRouter()`: Instead of using the browser's history, a memory router manages its own history stack in memory. It's primarily useful for **testing** and **component development tools** like Storybook, but can also be used for running React Router in any non-browser environment.

- `createStaticRouter()`: It is used when you want to leverage a [data router](https://reactrouter.com/en/main/routers/picking-a-router) for rendering on your server (i.e., [Node](https://nodejs.org/) or another Javascript runtime). For a more complete overview, please refer to the [Server-Side Rendering](https://reactrouter.com/en/main/guides/ssr) guide.

- `RouterProvider` : All [data router](https://reactrouter.com/en/main/routers/picking-a-router) objects are passed to this component to render your app and enable the rest of the data APIs.

  ```typescript
  import { createBrowserRouter, RouterProvider } from "react-router-dom";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "about",
          element: <About />,
        },
      ],
    },
  ]);
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} fallbackElement={<BigSpinner />} />
  );
  ```

### Main Concepts

Three main jobs of React Router

1. Subscribing and manipulating the [history stack](https://reactrouter.com/en/main/start/concepts#history-stack)
2. Matching the [URL](https://reactrouter.com/en/main/start/concepts#url) to your [routes](https://reactrouter.com/en/main/start/concepts#route-config)
3. Rendering a nested UI from the [route matches](https://reactrouter.com/en/main/start/concepts#matches)

Definitions

1. **URL** : The URL in the address bar.
2. **Location** - This is a React Router specific object that is based on the built-in browser's `window.location` object. It represents "where the user is at". It's mostly an object representation of the URL but has a bit more to it than that.
3. **Router** - Stateful, top-level component that makes all the other components and hooks work.
4. **Route Config** - A tree of **routes objects** that will be ranked and matched (with nesting) against the current location to create a branch of **route matches**.
5. **Route** - An object or Route Element typically with a shape of `{ path, element }` or `<Route path element>`. The `path` is a path pattern. When the path pattern matches the current URL, the element will be rendered.
6. **Match** - An object that holds information when a route matches the URL, like the [url params](https://reactrouter.com/en/main/start/concepts#url-params) and pathname that matched.
7. **Outlet** - A component that renders the next match in a set of [matches](https://reactrouter.com/en/main/start/concepts#match).
8. **Index Route** - A child route with no path that renders in the parent's [outlet](https://reactrouter.com/en/main/start/concepts#outlet) at the parent's [URL](https://reactrouter.com/en/main/start/concepts#url).
9. **Layout Route** - A **parent route** without a path, used exclusively for grouping child routes inside a specific layout.

Defining Routes

```jsx
<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path=":teamId/edit" element={<EditTeam />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
  </Route>
  <Route element={<PageLayout />}>
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/tos" element={<Tos />} />
  </Route>
  <Route path="contact-us" element={<Contact />} />
</Routes>;

// Above <Routes></Routes>  is identical to the return of  useRoutes()

let routes = [
  {
    element: <App />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "teams",
        element: <Teams />,
        children: [
          {
            index: true,
            element: <LeagueStandings />,
          },
          {
            path: ":teamId",
            element: <Team />,
          },
          {
            path: ":teamId/edit",
            element: <EditTeam />,
          },
          {
            path: "new",
            element: <NewTeamForm />,
          },
        ],
      },
    ],
  },
  {
    element: <PageLayout />,
    children: [
      {
        element: <Privacy />,
        path: "/privacy",
      },
      {
        element: <Tos />,
        path: "/tos",
      },
    ],
  },
  {
    element: <Contact />,
    path: "/contact-us",
  },
];
```

Rendering

```jsx
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route>
      </Route>
      <Route element={<PageLayout />}>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tos" element={<Tos />} />
      </Route>
      <Route path="contact-us" element={<Contact />} />
    </Routes>
  </BrowserRouter>
);

//  Let's use the /teams/firebirds URL as an example again.
//  <Routes> will match the location to your route config,
//  get a set of matches, and then render a React element tree like this:

<App>
  <Teams>
    <Team />
  </Teams>
</App>;
```

## 3. redux-toolkit --- "standard way to write [Redux](https://redux.js.org/) logic"

### Redux Toolkit includes these APIs:

- [`configureStore()`](https://redux-toolkit.js.org/api/configureStore): wraps `createStore` to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes `redux-thunk` by default, and enables use of the Redux DevTools Extension.
- [`createReducer()`](https://redux-toolkit.js.org/api/createReducer): that lets you supply a lookup table of action types to case reducer functions, rather than writing switch statements. In addition, it automatically uses the [`immer` library](https://github.com/immerjs/immer) to let you write simpler immutable updates with normal mutative code, like `state.todos[3].completed = true`.
- [`createAction()`](https://redux-toolkit.js.org/api/createAction): generates an action creator function for the given action type string.
- [`createSlice()`](https://redux-toolkit.js.org/api/createSlice): accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action creators and action types.
- [`combineSlices()`](https://redux-toolkit.js.org/api/combineSlices): combines multiple slices into a single reducer, and allows "lazy loading" of slices after initialisation.
- [`createAsyncThunk`](https://redux-toolkit.js.org/api/createAsyncThunk): accepts an action type string and a function that returns a promise, and generates a thunk that dispatches `pending/fulfilled/rejected` action types based on that promise
- [`createEntityAdapter`](https://redux-toolkit.js.org/api/createEntityAdapter): generates a set of reusable reducers and selectors to manage normalized data in the store
- The [`createSelector` utility](https://redux-toolkit.js.org/api/createSelector) from the [Reselect](https://github.com/reduxjs/reselect) library, re-exported for ease of use.

### Terminology and how to use them

#### Actions

An **action** is a plain JavaScript object that has a `type` field. **You can think of an action as an event that describes something that happened in the application**.

```javascript
const addTodoAction = {
  type: "todos/todoAdded", // action name
  payload: "Buy milk", // we put data in payload field
};
```

#### Action Creators

An **action creator** is a function that creates and returns an action object. We typically use these so we don't have to write the action object by hand every time.

```javascript
const addTodo = (text) => {
  return {
    type: "todos/todoAdded",
    payload: text,
  };
};
```

#### Reducers

A **reducer** is a function that receives the current `state` and an `action` object, decides how to update the state if necessary, and returns the new state: `(state, action) => newState`. **You can think of a reducer as an event listener which handles events based on the received action (event) type.**

1. Reducers' rules:
   1. They should only calculate the new state value based on the `state` and `action` arguments
   2. They are not allowed to modify the existing `state`. Instead, they must make _immutable updates_, by copying the existing `state` and making changes to the copied values.
   3. They must not do any asynchronous logic, calculate random values, or cause other "side effects"

```javascript
const initialState = { value: 0 };

function counterReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === "counter/increment") {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1,
    };
  }
  // otherwise return the existing state unchanged
  return state;
}
```

#### Store

The current Redux application state lives in an object called the **store**. The store is created by passing in a reducer, and has a method called `getState` that returns the current state value

```javascript
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: counterReducer });

console.log(store.getState());
// {value: 0}
```

#### Dispatch

The Redux store has a method called `dispatch`. **The only way to update the state is to call `store.dispatch()` and pass in an action object**. The store will run its reducer function and save the new state value inside, and we can call `getState()` to retrieve the updated value.

```javascript
store.dispatch({ type: "counter/increment" });

console.log(store.getState());
// {value: 1}
```

**We typically CALL action creators to dispatch the right action**

```javascript
// This is an action creator!
const increment = () => {
  return {
    type: "counter/increment",
  };
};

// call action creator in dispatch();
// increment() reutrn the action object.
// same as store.dispatch( {type:'counter/increment'} )
store.dispatch(increment());

console.log(store.getState());
// {value: 2}
```

#### Selectors

**Selectors** are functions that know how to extract specific pieces of information from a store state value. As an application grows bigger, this can help avoid repeating logic as different parts of the app need to read the same data

```javascript
// this selectCounterValue is called a selector!
const selectCounterValue = (state) => state.value;

const currentValue = selectCounterValue(store.getState());
console.log(currentValue);
// 2
```

#### Redux Slices

**A "slice" is a collection of Redux reducer logic and actions for a single feature in your app**, typically defined together in a single file. The name comes from splitting up the root Redux state object into multiple "slices" of state

```javascript
// a slice is a reducer's logic and actions
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import postsReducer from "../features/posts/postsSlice";
import commentsReducer from "../features/comments/commentsSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});
```

Let's see what is in a slice (a reducer) !

```javascript
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

#### Thunk

a **thunk** is a specific kind of redux function that can contain asynchronous logic. Thunks are written using two functions.

1. An inside thunk function, which gets `dispatch` and `getState` as arguments
2. The outside creator function, which creates and returns the thunk function

Thunks typically dispatch plain actions using action creators, like `dispatch( increment() )`

```javascript
// Thunks typically dispatch plain actions using action creators
// like dispatch(increment())
const store = configureStore({ reducer: counterReducer });

const exampleThunkFunction = (dispatch, getState) => {
  const stateBefore = getState();
  console.log(`Counter before: ${stateBefore.counter}`);
  dispatch(increment());
  const stateAfter = getState();
  console.log(`Counter after: ${stateAfter.counter}`);
};

store.dispatch(exampleThunkFunction);

//========================================================//

// For consistency with dispatching normal action objects, we typically write these
// as thunk action creators, which return the thunk function.
// These action creators can take arguments that can be used inside the thunk.

const logAndAdd = (amount) => {
  const thunkFunction = (dispatch, getState) => {
    const stateBefore = getState();
    console.log(`Counter before: ${stateBefore.counter}`);
    dispatch(incrementByAmount(amount));
    const stateAfter = getState();
    console.log(`Counter after: ${stateAfter.counter}`);
  };
  return thunkFunction;
};

store.dispatch(logAndAdd(5));
```

#### Writing Async Thunks

`createAsyncThunk` API abstracts all the process of fetching data and status management. This API generates the action types and action creators, then it generates a thunk that dispatches those actions automatically. An example of Posts slice indicates all the features in the following.

`createAsyncThunk` accepts two arguments:

1. A string that will be used as the prefix for the generated action types.
2. A "payload creator" callback function that should return a `Promise` containing some data, or a rejected `Promise` with an error.

**Loading State for Request** and `extraReducers`

We need to listen for the "pending" and "fulfilled" action types dispatched by our `fetchPosts` thunk. Those action creators are attached to our actual `fetchPost` function, and we can pass those to `extraReducers` to listen for those actions

```javascript
{
  // Multiple possible status enum values
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null
}

import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

// create the slice
const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers: {
        postAdded: state => {
            //do something...
        },
        postUpdated: state =>{
            // do something...
        },
        reactionAdded: (state, action) =>{
            // do something with action.payload...
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state, action) =>{
            state.status = 'loading'
        }).addCase(fetchPosts.fulfilled, (state, action) =>{
            state.status = 'succeeded';
            state.posts = state.posts.concat(action.payload)
        }).addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        })
    }
})

// use createAsyncThunk API
// two arguments:
// 1. A string that will be used as the prefix for the generated action types
// 2. A "payload creator" callback function that should return a ``Promise``
// containing some data, or a rejected ``Promise`` with an error

/*
const payloadCallback = async () => {
	const response = await client.get('/fakeApi/posts');
	return response.data;
}
*/

// export const fetchPosts = createAsyncThunk('name',payloadCallback);
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

// define reusable selector functions. Even we change state structures, we will not
// need to change all the code in components.
export const selectAllPosts = state => state.posts

export const selectPostById = (state, postId) =>
  state.posts.find(post => post.id === postId)
```

## 4. Deploy

This project is currently using docker. Follows are docker file and some useful commands.

```dockerfile
# Dockerfile

# Use an official Node.js runtime as the base image
FROM node:20.4-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
# RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Command to run the app
CMD ["npm", "run", "dev"]

```

```commonlisp
# local dev
docker build -t steven-admin-pro-frontend:latest .
docker tag steven-admin-pro-frontend:latest stevenyangsx/steven-admin-pro-frontend:latest
docker push stevenyangsx/steven-admin-pro-frontend:latest


# server side
docker pull stevenyangsx/steven-admin-pro-frontend:latest
docker run -d -p 5173:5173 --restart always stevenyangsx/steven-admin-pro-frontend
```
