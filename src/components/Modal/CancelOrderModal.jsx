// import React, { useState } from 'react';
// import { Modal, Radio, Typography, Button, Space } from 'antd';

// const { Text } = Typography;

// const CancelOrderModal = ({ isOpen, onClose, onConfirm, selectedOrderId }) => {
//   const [reason, setReason] = useState('');

//   const reasons = [
//     "Customer not available",
//     "Wrong address",
//     "Payment issue",
//     "Item damaged",
//     "Out of stock",
//     "Others"
//   ];

//   const handleOk = () => {
//     console.log("Confirmed cancel for order ID:", selectedOrderId);  // Log when the button is clicked
//     if (reason && selectedOrderId) {
//       onConfirm(reason);  // Pass reason to the onConfirm function
//       setReason('');  // Clear the reason after confirming
//     }
//   };

//   const handleCancel = () => {
//     setReason('');
//     onClose();
//   };

//   return (
//     <Modal
//       title="Cancel Order"
//       open={isOpen}
//       onCancel={handleCancel}
//       onOk={handleOk}
//       okButtonProps={{ disabled: !reason }}
//       okText="Confirm Cancel"
//       cancelText="Close"
//     >
//       <Text style={{ display: 'block', marginBottom: 12 }}>
//         Why do you want to cancel this order?
//       </Text>
//       <Radio.Group onChange={(e) => setReason(e.target.value)} value={reason}>
//         <Space direction="vertical">
//           {reasons.map((r, i) => (
//             <Radio key={i} value={r}>
//               {r}
//             </Radio>
//           ))}
//         </Space>
//       </Radio.Group>
//     </Modal>
//   );
// };


// export default CancelOrderModal;

import React, { useState } from 'react';
import { Modal, Radio, Typography, Button, Space, Input } from 'antd';

const { Text } = Typography;
const { TextArea } = Input;

const CancelOrderModal = ({ isOpen, onClose, onConfirm, selectedOrderId }) => {
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const reasons = [
    "Customer not available",
    "Wrong address",
    "Payment issue",
    "Item damaged",
    "Out of stock",
    "Others"
  ];

  const handleOk = () => {
    const finalReason = reason === "Others" ? customReason : reason;

    if (finalReason && selectedOrderId) {
      onConfirm(finalReason); // Pass final reason to confirm handler
      setReason('');
      setCustomReason('');
    }
  };

  const handleCancel = () => {
    setReason('');
    setCustomReason('');
    onClose();
  };

  return (
    <Modal
      title="Cancel Order"
      open={isOpen}
      onCancel={handleCancel}
      onOk={handleOk}
      okButtonProps={{ disabled: !reason || (reason === 'Others' && !customReason.trim()) }}
      okText="Confirm Cancel"
      cancelText="Close"
    >
      <Text style={{ display: 'block', marginBottom: 12 }}>
        Why do you want to cancel this order?
      </Text>
      <Radio.Group onChange={(e) => setReason(e.target.value)} value={reason}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {reasons.map((r, i) => (
            r === "Others" ? (
              <Radio key={i} value="Others" style={{ alignItems: 'start' }}>
                Others
                {reason === "Others" && (
                  <TextArea
                    rows={3}
                    placeholder="Please specify..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    style={{ marginTop: 8 }}
                  />
                )}
              </Radio>
            ) : (
              <Radio key={i} value={r}>{r}</Radio>
            )
          ))}
        </Space>
      </Radio.Group>
    </Modal>
  );
};

export default CancelOrderModal;
