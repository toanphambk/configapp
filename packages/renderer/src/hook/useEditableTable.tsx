/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react';
import {Form, message} from 'antd';
import type {UseMutateAsyncFunction} from '@tanstack/react-query';

export const useEditableTable = <T extends {id: any}>() => {
  const [editingRecord, setEditingRecord] = useState<T | null>(null);
  const [form] = Form.useForm<T>();
  const [formValues, setFormValues] = useState<T>({} as T);

  const onEdit = (record: T) => {
    form.setFieldsValue(record);
    setEditingRecord(record);
  };

  const onEditCancel = () => {
    setEditingRecord(null);
  };

  const onEditConfirm = async (
    record: T,
    updateFunction: UseMutateAsyncFunction<unknown, Error, any, unknown>,
    onEditedFunction?: (record: T) => void,
  ) => {
    try {
      const values = await form.validateFields();
      if (JSON.stringify(values) !== JSON.stringify(formValues)) {
        setFormValues(values as T);
        await updateFunction({data: {...record, ...values}, where: {id: record.id}});
        onEditedFunction && onEditedFunction(record as T);
        message.success('Record updated successfully');
      }
      setEditingRecord(null);
    } catch (error) {
      setFormValues({} as T);
      const errorMessages = (error as Error).message;
      if (errorMessages) {
        message.error(errorMessages);
        return;
      }
      message.error('Failed to update record');
    }
  };

  const onRemove = async (
    record: T,
    deleteFunction: UseMutateAsyncFunction<unknown, Error, any, unknown>,
    onDeledtedFunction?: (record: T) => void,
  ) => {
    try {
      await deleteFunction({where: {id: record.id}});
      onDeledtedFunction && onDeledtedFunction(record);
      message.success('Record removed successfully');
    } catch (error) {
      message.error('Failed to remove record');
      console.error(error);
    }
  };

  const onRedirect = (
    record: T,
    redirectFunction?: (record: T) => void,
    onRediredtedFunction?: (record: T) => void,
  ) => {
    redirectFunction && redirectFunction(record);
    onRediredtedFunction && onRediredtedFunction(record);
  };

  return {
    form,
    editingRecord,
    formValues,
    onEdit,
    onRedirect,
    onEditCancel,
    onEditConfirm,
    onRemove,
  };
};
