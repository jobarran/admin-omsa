

export const omName = (name: string) => {

    const inputString = String(name);

    const paddedNumber = inputString.padStart(3, '0');
  
    return paddedNumber;
}