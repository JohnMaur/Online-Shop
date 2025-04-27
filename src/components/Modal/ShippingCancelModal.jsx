import React, { useState } from 'react';
import { Modal, Radio, Input } from 'antd';

const { TextArea } = Input;

const ShippingCancelModal = ({ isOpen, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const handleOk = () => {
    if (reason === "Other" && customReason.trim()) {
      onSubmit(customReason.trim());
    } else if (reason && reason !== "Other") {
      onSubmit(reason);
    }
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
    if (e.target.value !== "Other") {
      setCustomReason("");
    }
  };

  const reasons = [
    "I changed my mind",
    "Duplicate order",
    "Found a better price elsewhere",
    "Other",
  ];

  return (
    <Modal
      title="Why are you cancelling?"
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      okButtonProps={{
        disabled: !reason || (reason === "Other" && !customReason.trim()),
      }}
    >
      <Radio.Group
        onChange={handleReasonChange}
        value={reason}
        className="w-full space-y-2"
      >
        {reasons.map((item) => (
          <Radio
            key={item}
            value={item}
            className="block w-full px-4 py-3 hover:border-blue-500 transition-all duration-200"
          >
            {item}
          </Radio>
        ))}
      </Radio.Group>

      {reason === "Other" && (
        <div className="mt-4">
          <TextArea
            rows={4}
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            placeholder="Please specify your reason"
            className="w-full"
          />
        </div>
      )}
    </Modal>
  );
};

export default ShippingCancelModal;
