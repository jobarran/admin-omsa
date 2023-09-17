
export default function appBar() {

    return {

        MuiAppBar: {
            defaultProps: {
                position: 'fixed',
            },
            styleOverrides: {
                root: {
                backgroundColor: '#ffffff',
                height: 60,
                boxShadow: '0px 1px 5px #d8d8d8'
                },
            }
            },
    };
    
  }