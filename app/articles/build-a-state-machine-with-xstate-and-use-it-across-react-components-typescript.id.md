---
title: "Membangun State Machine dengan XState dan Menggunakannya di Berbagai React Components (TypeScript)"
date: "2025-03-24"
description: "Pelajari cara membangun state machine dengan XState dan menggunakannya di berbagai React components dalam TypeScript."
tags: ["XState", "React", "TypeScript", "State Management"]
featured: false
---

Saat membangun form atau interaksi multi-langkah di React, state bisa dengan cepat jadi kacau dan sulit dikontrol. `xstate` membantu dengan mengorganisir logika kamu ke dalam finite states, actions, dan transitions. Di panduan ini, kamu akan belajar cara:

- Memodelkan logika form menggunakan XState
- Menggunakan `createActorContext` untuk pola provider yang bersifat global
- Berbagi state antar components di dalam provider

Kita akan membangun sebuah typed machine yang menangani pengeditan objek resep sederhana beserta bahan-bahannya.

---

## 1. Setup

```bash
npm install xstate @xstate/react
```

---

## 2. Membuat State Machine

Mari kita modelkan sebuah state machine "recipe editor".

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

## 3. Membuat Context Provider

Kita akan mengekspos machine menggunakan `createActorContext`.

```ts
// RecipeMachineProvider.tsx
import { createActorContext } from "@xstate/react";
import { recipeMachine } from "./recipeMachine";

export const RecipeMachineContext = createActorContext(recipeMachine);
```

---

## 4. Menggunakan Machine di dalam Component Tree

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

## 5. Membangun Form Component

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

## Kesimpulan

Sekarang kamu sudah punya setup `xstate` yang lengkap dengan menggunakan:

✅ Sebuah typed state machine  
✅ Berbagi context via `createActorContext`  
✅ Cara yang bersih untuk menggunakan ulang logika di berbagai components

🔗 Dokumentasi resmi jika kamu ingin mendalami lebih lanjut: [XState Documentation](https://xstate.js.org/docs/)
