
import SectionTiltle from '../../components/SectionTitle/SectionTiltle';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    return (
        <div>
            <SectionTiltle heading="Payment" subHeading="Please Pay to eat"/>
            <div>
              <Elements stripe={stripePromise}>
                    <CheckoutForm/>
              </Elements>
            </div>
        </div>
    );
};

export default Payment;