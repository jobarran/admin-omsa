

export const omRevision = (name: string) => {

    const inputString = String(name);

    const paddedNumber = inputString.padStart(2, '0');
  
    return paddedNumber;
}