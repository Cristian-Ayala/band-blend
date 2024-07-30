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

export const getLongDateFromStringDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Handle invalid date
  if (isNaN(date.getTime())) {
    return "Fecha inválida";
  }

  // Use toLocaleString to format the entire date
  const formattedDate = date.toLocaleString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1); // Capitalize the first letter
};

export const getHourFromStringTime = (timeString: string): string => {
  const [hourString, minute] = timeString.split(":");
  const hour = parseInt(hourString, 10);

  // Determine if it's AM or PM
  const period = hour >= 12 ? "PM" : "AM";

  // Convert hour from 24-hour to 12-hour format
  const hour12 = hour % 12 || 12;

  // Pad single digit hour with leading zero if needed (optional)
  const hour12String = hour12 < 10 ? `0${hour12}` : `${hour12}`;

  return `${hour12String}:${minute} ${period}`;
};
