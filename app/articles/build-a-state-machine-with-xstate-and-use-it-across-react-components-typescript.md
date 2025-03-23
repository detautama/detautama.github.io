---
title: "Build a State Machine with XState and Use It Across React Components (TypeScript)"
date: "2025-03-24"
description: "Learn how to build a state machine with XState and use it across React components in TypeScript."
tag: "xstate"
featured: false
---

When building forms or multi-step interactions in React, state can quickly get out of control. `xstate` helps by organizing your logic into finite states, actions, and transitions. In this guide, you’ll learn how to:

- Model form logic using XState
- Use `createActorContext` for a global-like provider pattern
- Share state across components inside the provider

We’ll build a typed machine that handles editing a simple recipe object with ingredients.

---

## 1. Setup

```bash
npm install xstate @xstate/react
```

---

## 2. Create the State Machine

Let’s model a "recipe editor" state machine.

```ts
// recipeMachine.ts
import { assign, setup } from "xstate";

type Ingredient = {
  name: string;
  amount: string;
};

type Recipe = {
  id: string;
  title: string;
  ingredients: Ingredient[];
};

type RecipeEvent =
  | { type: "CHANGE_TITLE"; title: string }
  | { type: "ADD_INGREDIENT" }
  | { type: "REMOVE_INGREDIENT"; index: number }
  | { type: "EDIT_INGREDIENT"; index: number; ingredient: Ingredient }
  | { type: "SAVE_RECIPE" };

const defaultRecipe: Recipe = {
  id: crypto.randomUUID(),
  title: "",
  ingredients: [],
};

const setupMachine = setup({
  types: {
    context: {} as Recipe,
    events: {} as RecipeEvent,
  },
  actions: {
    changeTitle: assign({
      title: ({ event }) =>
        event.type === "CHANGE_TITLE" ? event.title : undefined,
    }),
    addIngredient: assign({
      ingredients: ({ context }) => [
        ...context.ingredients,
        { name: "", amount: "" },
      ],
    }),
    removeIngredient: assign({
      ingredients: ({ context, event }) =>
        event.type === "REMOVE_INGREDIENT"
          ? context.ingredients.filter((_, i) => i !== event.index)
          : context.ingredients,
    }),
    editIngredient: assign({
      ingredients: ({ context, event }) => {
        if (event.type !== "EDIT_INGREDIENT") return context.ingredients;
        return context.ingredients.map((item, i) =>
          i === event.index ? event.ingredient : item
        );
      },
    }),
    saveRecipe: ({ context }) => {
      console.log("Saved recipe:", context);
    },
  },
});

export const recipeMachine = setupMachine.createMachine({
  id: "recipeEditor",
  initial: "idle",
  context: ({ input }) => input ?? defaultRecipe,
  states: {
    idle: {
      on: {
        CHANGE_TITLE: { actions: "changeTitle" },
        ADD_INGREDIENT: { actions: "addIngredient" },
        REMOVE_INGREDIENT: { actions: "removeIngredient" },
        EDIT_INGREDIENT: { actions: "editIngredient" },
        SAVE_RECIPE: { actions: "saveRecipe" },
      },
    },
  },
});
```

---

## 3. Create a Context Provider

We'll expose the machine using `createActorContext`.

```ts
// RecipeMachineProvider.tsx
import { createActorContext } from "@xstate/react";
import { recipeMachine } from "./recipeMachine";

export const RecipeMachineContext = createActorContext(recipeMachine);
```

---

## 4. Use the Machine in a Component Tree

```tsx
// RecipeEditor.tsx
import { RecipeMachineContext } from "./RecipeMachineProvider";

export const RecipeEditor = ({ initialRecipe }: { initialRecipe?: any }) => {
  return (
    <RecipeMachineContext.Provider options={{ input: initialRecipe }}>
      <RecipeForm />
    </RecipeMachineContext.Provider>
  );
};
```

---

## 5. Build the Form Component

```tsx
// RecipeForm.tsx
import { RecipeMachineContext } from "./RecipeMachineProvider";

export const RecipeForm = () => {
  const state = RecipeMachineContext.useSelector((s) => s.context);
  const actorRef = RecipeMachineContext.useActorRef();

  return (
    <div>
      <input
        value={state.title}
        placeholder="Recipe title"
        onChange={(e) =>
          actorRef.send({ type: "CHANGE_TITLE", title: e.target.value })
        }
      />

      <h4>Ingredients</h4>
      {state.ingredients.map((ing, i) => (
        <div key={i}>
          <input
            placeholder="Name"
            value={ing.name}
            onChange={(e) =>
              actorRef.send({
                type: "EDIT_INGREDIENT",
                index: i,
                ingredient: {
                  ...ing,
                  name: e.target.value,
                },
              })
            }
          />
          <input
            placeholder="Amount"
            value={ing.amount}
            onChange={(e) =>
              actorRef.send({
                type: "EDIT_INGREDIENT",
                index: i,
                ingredient: {
                  ...ing,
                  amount: e.target.value,
                },
              })
            }
          />
          <button
            onClick={() =>
              actorRef.send({ type: "REMOVE_INGREDIENT", index: i })
            }
          >
            Remove
          </button>
        </div>
      ))}

      <button onClick={() => actorRef.send({ type: "ADD_INGREDIENT" })}>
        Add Ingredient
      </button>
      <button onClick={() => actorRef.send({ type: "SAVE_RECIPE" })}>
        Save
      </button>
    </div>
  );
};
```

---

## Summary

You now have a full `xstate` setup using:

✅ A typed state machine  
✅ Context sharing via `createActorContext`  
✅ A clean way to reuse logic across multiple components

🔗 Official docs if you want to go deeper: [XState Documentation](https://xstate.js.org/docs/)
