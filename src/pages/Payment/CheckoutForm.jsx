import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiodSecure";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";

const CheckoutForm = () => {

    const [error, setError] = useState('');

    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] =  useState('');

    const stripe = useStripe();
    const elements = useElements();

    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
       if(totalPrice>0){
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
        .then(res => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
       }
    }, [axiosSecure, totalPrice])



    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) { return }

        const card = elements.getElement(CardElement);
        if (card === null) { return };


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        }) 

        if (error) {
            console.log('paymet error', error);
            setError(error.message)
        }
        else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirmError', confirmError)
        }
        else {
            console.log('paymentIntent', paymentIntent);
            if(paymentIntent.status==='succeeded'){
                console.log('transction Id', transactionId)
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    data: new Date(), //utc data convert. use monent js
                    cartIds: cart.map(item => item._id),
                    menuIds: cart.map(item => item.menuId),
                    status: 'Pending'
                }

               const res = await axiosSecure.post('/payments', payment);
                console.log('Payment save', res.data);
                refetch();
                if(res?.data?.paymentResult?.insertedId){
                    Swal.fire('Payment compleleted')
                }

            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>

            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>

            <p className="text-red-600">{error}</p>
            {
                transactionId&& <p className="text-green-500"> Your transaction Id: {transactionId}</p>
            }

        </form>
    );
};

export default CheckoutForm;