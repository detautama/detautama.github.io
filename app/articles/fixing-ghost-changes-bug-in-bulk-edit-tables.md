---
title: "Fixing the 'Ghost Changes' Bug in Bulk Edit Tables"
date: "2025-10-17"
description: "Deep dive into debugging a tricky state management issue where the system detected changes that didn't actually exist, and how comparing with original values solved the problem."
tag: "Debugging"
featured: false
---

## The Problem

Today I encountered an interesting bug in the bulk edit table feature. Users complained that the "Save" button showed "1 changed row" even though they only typed text in an input field and then deleted it all back to empty. There should be no changes since the value is the same as the initial value, but the system still detected changes.

The visual clue was clear: there was no "blue dot" in the corner of any field (which indicates a changed field), but the change counter still showed 1 change.

## Root Cause Analysis

After investigation, it turned out the problem was in the state management logic of the custom hook `useBulkTableEdit`. This hook tracks changes by storing all fields that have ever been updated into an object called `editState`:

```typescript
// Before fix
const updateField = (itemId, field, value) => {
  dispatch({ type: "UPDATE_FIELD", itemId, field, value });
};
```

The reducer is very simple: whenever there's an `UPDATE_FIELD`, it immediately inserts into `editState` without checking whether the value is different from the original or not.

```typescript
case 'UPDATE_FIELD':
  return {
    ...state,
    editState: {
      ...state.editState,
      [action.itemId]: {
        ...state.editState[action.itemId],
        [action.field]: action.value,
      },
    },
  }
```

The problem: **This hook tracks "fields that have been touched", not "fields that have changed"**.

So if a user types "test" and then deletes it all back to empty (returning to the original value), that field still remains in `editState` with the same value as the original. The counter `changesCount` is calculated from `Object.keys(editState).length`, which counts ANY item in editState regardless of whether it's actually different.

## The Solution

The solution turned out to be simple but required strategic placement. Since the hook doesn't have access to original values, I moved the comparison logic to the component level - where we have access to the original item data.

### The Pattern I Applied

```typescript
// In editable components
onChange={(event) => {
  const newValue = event.target.value
  const originalValue = item[field]

  // Compare and decide
  if (newValue === originalValue) {
    bulkEdit.removeField(item._id, field)  // Remove from editState
  } else {
    bulkEdit.updateField(item._id, field, newValue)  // Keep in editState
  }

  // Validation still runs
  onValidateField(newValue)
}}
```

## Files Modified

I applied this pattern to all editable components:

1. **Reusable Components** (for destinations):

   - `EditableTextCell.tsx` - Text input fields
   - `EditableCustomerCell.tsx` - Dropdown select

2. **Inline Edit Components**:
   - `customers.tsx` - Name & email fields
   - `operators.tsx` - Name field

## Key Learnings

### 1. State Management Principle

**Track actual changes, not interactions**. There's a big difference between "user touched this field" vs "user changed this field's value".

### 2. Data Access Pattern

If a hook doesn't have enough context (in this case, original values), push the logic to the layer that does - in this case, the components that render the data.

### 3. Defensive Comparison

Always compare with the original before updating state:

```typescript
// Good pattern
if (newValue === originalValue) {
  removeChange();
} else {
  recordChange();
}

// Anti-pattern
recordChange(); // Always record without checking
```

### 4. DRY via Components

By creating reusable `EditableTextCell` and `EditableCustomerCell`, I only needed to fix once for the destinations page. For inline edits in customers & operators, I had to fix them one by one because they don't use shared components.

## Testing Strategy

After the fix, I tested with these scenarios:

1. ✅ Type text → delete all → No changes detected
2. ✅ Type text → edit → change again → Only shows changed if different
3. ✅ Change dropdown → revert → No changes detected
4. ✅ Blue dot indicators only appear for fields that differ from original
5. ✅ Change counter is accurate according to the number of actual changes

All passed! 🎉

## Conclusion

This bug reminded me that **user interaction ≠ data change**. In good UI/UX, the system must be smart enough to distinguish between "user is exploring/typing" vs "user made actual changes worth saving".

---

**Takeaway:** When building edit interfaces, always validate actual changes against original values, not just track interactions. Your users will thank you for not bothering them with false "unsaved changes" warnings! 🚀
