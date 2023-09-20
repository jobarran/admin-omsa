import { IPersonal } from "@/interfaces"
import { FC } from "react"



export const getYearsBetweenDates = (startDate:string, endDate:string) => {


// Custom date parsing function
function parseDate(dateString:any) {
  const parts = dateString.split('/');
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

// Parse the start and end dates
const start = parseDate(startDate);
const end = parseDate(endDate);

// Check if the end date is greater than or equal to the start date
if (end >= start) {
  // Initialize a counter variable to keep track of the count
  let count = -1;

  // Iterate through the years
  for (let year = start.getFullYear(); year <= end.getFullYear(); year++) {
    // Increment the count for each year
    count++;
  }

  // Return the count of years
  return count !== 0 ? count : '< 1';
}

// If the end date is less than the start date, return 0
return '> 1';
}