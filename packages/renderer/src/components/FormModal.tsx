import React, {useState, useEffect} from 'react';
import type {FormInstance} from 'antd';
import {Modal, Form, Input, InputNumber, Select} from 'antd';
import type {Rule} from 'antd/lib/form';
import type {EnumOption} from '../utility/getEnumOption';

export interface ModalFormField<T> {
  key: keyof T;
  label: string;
  rules?: Rule[];
  inputType: InputType;
  selectOptions?: EnumOption[] | (() => EnumOption[]);
}

export interface FormModalProps<T> {
  open: boolean;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
  title: string;
  formFields: ModalFormField<T>[];
  formInstance: FormInstance;
  submitText?: string;
}

type InputType = 'number' | 'text' | 'select';

const FormModal = <T extends object>({
  open,
  onSubmit,
  onCancel,
  title,
  formFields,
  formInstance,
  submitText: okText = 'Create',
}: FormModalProps<T>) => {
  const [options, setOptions] = useState<Record<string, EnumOption[]>>({});

  useEffect(() => {
    const newOptions: Record<string, EnumOption[]> = {};

    formFields.forEach(field => {
      if (typeof field.selectOptions === 'function') {
        const fieldKey = String(field.key);
        newOptions[fieldKey] = field.selectOptions();
      } else if (Array.isArray(field.selectOptions)) {
        newOptions[String(field.key)] = field.selectOptions;
      }
    });

    setOptions(newOptions);
  }, [formFields]); // remove un necessary dependencies

  const renderInput = (field: ModalFormField<T>) => {
    switch (field.inputType) {
      case 'number':
        return <InputNumber />;
      case 'text':
        return <Input />;
      case 'select':
        return (
          <Select>
            {options[String(field.key)]?.map(option => (
              <Select.Option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );
      default:
        return <Input />;
    }
  };

  return (
    <Modal
      title={title}
      open={open}
      onOk={onSubmit}
      onCancel={onCancel}
      okText={okText}
    >
      <Form
        form={formInstance}
        layout="vertical"
      >
        {formFields.map(field => (
          <Form.Item
            key={String(field.key)}
            name={String(field.key)}
            label={field.label}
            rules={field.rules}
          >
            {renderInput(field)}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default FormModal;
