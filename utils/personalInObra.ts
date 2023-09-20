import { IPersonal } from "@/interfaces"
import { FC } from "react"

interface Props {
    obraId: string,
    personal: IPersonal[]
}

export const personalInObra = (obraId:string|undefined, personal:IPersonal[]) => {

// Initialize a counter variable to keep track of the count
let count = 0;

// Iterate through the array
for (let i = 0; i < personal.length; i++) {
  // Check if the current object has an "id" property with the value '1347'
  if (personal[i].obra === obraId) {
    // If yes, increment the count
    count++;
  }
}

// Return the final count
return count;

}