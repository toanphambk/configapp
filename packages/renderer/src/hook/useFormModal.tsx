/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react';
import {Form, message} from 'antd';
import type {UseMutateAsyncFunction} from '@tanstack/react-query';

export const useFormModal = <T extends object>() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<T>();

  const onSubmit = async (
    createFunction: UseMutateAsyncFunction<unknown, Error, any, unknown>,
    record: Partial<T>,
  ) => {
    try {
      const values = await form.validateFields();
      await createFunction({data: {...record, ...values}});
      form.resetFields();
      setIsModalOpen(false);
      message.success('Record updated successfully');
    } catch (error) {
      const errorMessages = (error as Error).message;
      if (errorMessages) {
        message.error(errorMessages);
        return;
      }
      message.error('Failed to update record');
    }
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return {
    isModalOpen,
    form,
    onSubmit,
    handleOpen,
    handleClose,
  };
};
