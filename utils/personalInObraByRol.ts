import { IPersonal } from "@/interfaces"
import { FC } from "react"



export const personalInObraByRol = (obraId:string|undefined, personal:IPersonal[], rol:string) => {

// Initialize a counter variable to keep track of the count
let count = 0;

// Iterate through the array
for (let i = 0; i < personal.length; i++) {
  // Check if the current object has an "id" property with the value '1347'
  if (personal[i].obra === obraId && personal[i].categoria === rol) {
    // If yes, increment the count
    count++;
  }
}

// Return the final count
return count;

}