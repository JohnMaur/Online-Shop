// import React, { useEffect, useRef } from 'react';

// const Paypal = ({ amount, onSuccess }) => {
//   const paypalRef = useRef();

//   useEffect(() => {
//     if (window.paypal) {
//       window.paypal.Buttons({
//         createOrder: (data, actions) => {
//           return actions.order.create({
//             purchase_units: [{
//               amount: {
//                 value: amount.toString(), // Must be a string
//               },
//             }],
//           });
//         },
//         onApprove: async (data, actions) => {
//           const details = await actions.order.capture();
//           onSuccess(details);
//         },
//         onError: (err) => {
//           console.error("PayPal Checkout onError", err);
//         }
//       }).render(paypalRef.current);
//     }
//   }, [amount, onSuccess]);

//   return <div ref={paypalRef} />;
// };

// export default Paypal;

 
import React, { useEffect, useRef } from 'react';

const Paypal = ({ amount, onSuccess }) => {
  const paypalRef = useRef();
  const rendered = useRef(false); // prevent re-rendering

  useEffect(() => {
    if (window.paypal && paypalRef.current && !rendered.current) {
      rendered.current = true; // mark as rendered once
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount.toString(),
              },
            }],
          });
        },
        onApprove: async (data, actions) => {
          const details = await actions.order.capture();
          onSuccess(details);
        },
        onError: (err) => {
          console.error("PayPal Checkout onError", err);
        }
      }).render(paypalRef.current);
    }
  }, [amount, onSuccess]);

  return <div ref={paypalRef} />;
};

export default Paypal;
