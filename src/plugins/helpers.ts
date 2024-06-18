export const reorder = <T>(
  list: T[],
  startIndex: number,
  endIndex: number
): T[] => {
  const result = Array.from(list); // Creates a shallow copy of the list
  const [removed] = result.splice(startIndex, 1); // Removes the item from the startIndex
  result.splice(endIndex, 0, removed); // Inserts the item at the endIndex

  return result; // Returns the reordered list
};