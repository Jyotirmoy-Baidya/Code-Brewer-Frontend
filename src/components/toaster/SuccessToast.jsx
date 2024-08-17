import toast from "react-hot-toast";

const SuccessToast = (message) => {
    toast.success(message, {
        style: {
            border: '1px solid #1BF1A1',
            padding: '16px',
            color: '#1BF1A1',
            backgroundColor: '#0D1418'
        },
        iconTheme: {
            primary: '#1BF1A1',
            secondary: '#0D1418',
        },
    });
}

export default SuccessToast