export const reorder = <T>(
  list: T[],
  startIndex: number,
  endIndex: number,
): T[] => {
  const result = Array.from(list); // Creates a shallow copy of the list
  const [removed] = result.splice(startIndex, 1); // Removes the item from the startIndex
  result.splice(endIndex, 0, removed); // Inserts the item at the endIndex

  return result; // Returns the reordered list
};

export function getTimeFromDate(dateString: string) {
  if (!dateString) return null;
  const date = new Date(dateString);

  // Define the target time zone
  const timeZone = "America/El_Salvador";

  // Format the time in the target time zone
  const options = {
    timeZone: timeZone,
    hour: "2-digit" as const,
    minute: "2-digit" as const,
    second: "2-digit" as const,
    hour12: false, // Change to true if you prefer 12-hour format
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedTime = formatter.format(date);
  return formattedTime;
}
