
export const edad  = ( bornDate: string | '' ) => {

    const initial = bornDate.split(/\//);
    const dateToMMDDYYY = [ initial[1], initial[0], initial[2] ].join('/')

    let date_1 = new Date();
    let date_2 = new Date(dateToMMDDYYY);

    let difference = date_1.getTime() - date_2.getTime();
    let TotalYears = Math.ceil(difference / (1000 * 3600 * 24 * 365)-1);
    if ( TotalYears > 0 ) {
      return TotalYears;
    } return '-'

  }