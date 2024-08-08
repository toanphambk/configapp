import React from 'react';
import {Form, Input, InputNumber, Select} from 'antd';
import type {Rule} from 'antd/es/form';

export interface EditableCellProps<T> {
  editing: boolean;
  dataIndex: keyof T;
  title: string;
  inputType: InputType;
  record: T;
  rules?: Rule[];
  selectOptions?: {label: string; value: string | number}[];
  children?: React.ReactNode;
}

type InputType = 'number' | 'text' | 'select';

const EditableCell = <T,>({
  editing,
  dataIndex,
  inputType,
  record,
  rules,
  selectOptions,
  children,
  ...restProps
}: EditableCellProps<T>) => {
  let inputNode: React.ReactNode;

  switch (inputType) {
    case 'number':
      inputNode = <InputNumber />;
      break;
    case 'text':
      inputNode = <Input />;
      break;
    case 'select':
      inputNode = (
        <Select>
          {selectOptions?.map(option => (
            <Select.Option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
      break;
    default:
      inputNode = <Input />;
      break;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex as string}
          rules={rules}
        >
          {React.cloneElement(inputNode, {
            defaultValue: record?.[dataIndex],
          })}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
