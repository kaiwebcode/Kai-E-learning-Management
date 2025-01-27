import { styles } from '@/app/styles/style';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import socketIO from 'socket.io-client';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

type Props = {
  setOpen: any;
  data: any;
  user: any;
  refetch: any;
};

const CheckOutForm = ({ setOpen, data, user, refetch }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>('');
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message || 'An unexpected error occurred.');
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setIsLoading(false);
      createOrder({ courseId: data._id, payment_info: paymentIntent });
    }
  };

  useEffect(() => {
    if (orderData) {
      refetch();
      socketId.emit('notification', {
        title: 'New Order',
        message: `You have a new order for ${data.name}`,
        userId: user._id,
      });
      redirect(`/course-access/${data._id}`);
    }

    if (error && 'data' in error) {
      toast.error((error as any).data.message);
    }
  }, [orderData, error, refetch, data.name, user._id, data._id]);

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-2xl shadow-lg max-w-md mx-auto border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Complete Your Payment</h2>

      <LinkAuthenticationElement
        id="link-authentication-element"
        className="mb-4"
      />

      <PaymentElement id="payment-element" className="mb-4" />

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className={`w-full py-2 px-4 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition duration-200 ${
          isLoading || !stripe || !elements ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <div className="spinner border-2 border-t-transparent border-white rounded-full w-5 h-5 mx-auto animate-spin"></div>
        ) : (
          'Pay Now'
        )}
      </button>

      {message && (
        <div
          id="payment-message"
          className="mt-4 text-sm text-center text-red-500"
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckOutForm;
