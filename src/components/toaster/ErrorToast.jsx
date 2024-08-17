import toast from 'react-hot-toast';

const ErrorToast = (message) => {
    toast.error(message, {
        style: {
            border: '1px solid red',
            padding: '16px',
            color: 'red',
            backgroundColor: '#0D1418'
        },
        iconTheme: {
            primary: 'red',
            secondary: '#0D1418',
        },
    });
}

export default ErrorToast