
function daysUntilToday(givenDate:string) {
  try {

    const [day, month, year] = givenDate.split('/').map(Number);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      throw new Error("Invalid date format. Please use 'DD/MM/YYYY'.");
    }

    const givenDateObj:any = new Date(year, month - 1, day);
    const today:any = new Date();
    const timeDifference = today - givenDateObj;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  } catch (error:any) {
    return error.message;
  }
}


export const statusColor  = ( status: string | '', necesidad: string | '' ) => {

  const days = daysUntilToday(necesidad)

    switch (status) {
      case 'pedido':
        if ( days >= 0 ) {
          return 'error'
        } else if ( days < 0 && days > -7 ) {
          return 'warning'
        } else {
          return 'primary'
        }

      case 'recibido':
        return 'success'
    
      default:
        return 'disabled'
    }

  }