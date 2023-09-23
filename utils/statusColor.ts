
export const statusColor  = ( status: string | '' ) => {

    switch (status) {
      case 'pedido':
        return 'error'
        break;

      case 'recibido':
        return 'success'
        break;
        
      case 'parcial':
        return 'warning'
        break;
      
    
      default:
        return 'disabled'
        break;
    }

  }