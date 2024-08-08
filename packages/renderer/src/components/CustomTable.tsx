import React, {useState, useEffect} from 'react';
import type {TableColumnType, TableProps} from 'antd';
import {Table, Form, Button, Popconfirm} from 'antd';
import {
  SaveFilled,
  StopOutlined,
  EditFilled,
  DeleteFilled,
  ArrowRightOutlined,
} from '@ant-design/icons';
import type {EditableCellProps} from './EditableCell';
import EditableCell from './EditableCell';
import type {FormInstance, Rule} from 'antd/lib/form';
import type {EnumOption} from '../utility/getEnumOption';

export interface CustomColumnType<T> extends TableColumnType<T> {
  enableEdit?: boolean;
  inputType?: InputType;
  selectOptions?: EnumOption[] | ((record: T) => EnumOption[]);
  rules?: Rule[];
}

type InputType = 'number' | 'text' | 'select';

interface CustomTableProps<T> extends TableProps<T> {
  columns: CustomColumnType<T>[];
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  onEditConfirm?: (record: T) => Promise<void>;
  onRedirect?: (record: T) => void;
  onEditCancel?: () => void;
  selectedRecord?: T;
  editingRecord?: T | null;
  form?: FormInstance;
  showActions?: boolean;
  showRedirect?: boolean;
  redirectTitle?: string;
  enableRowSelection?: boolean;
  show?: boolean;
}

const CustomTable = <T extends {id: number}>({
  columns,
  onEdit,
  onDelete,
  onEditConfirm,
  onEditCancel,
  onRedirect,
  selectedRecord,
  editingRecord,
  form,
  showActions = true,
  enableRowSelection = true,
  showRedirect = false,
  redirectTitle = 'Redirect',
  show = true,
  ...restProps
}: CustomTableProps<T>) => {
  const [options, setOptions] = useState<Record<string, EnumOption[]>>({});

  useEffect(() => {
    const newOptions: Record<string, EnumOption[]> = {};

    columns.forEach(col => {
      if (typeof col.selectOptions === 'function' && editingRecord) {
        newOptions[col.dataIndex as string] = col.selectOptions(editingRecord);
      } else if (Array.isArray(col.selectOptions)) {
        newOptions[col.dataIndex as string] = col.selectOptions;
      }
    });

    setOptions(newOptions);
  }, [editingRecord, columns]);

  const isEditing = (record: T) => record.id === editingRecord?.id;

  const mergedColumns = columns.map(col => {
    if (!col.enableEdit) {
      return col;
    }
    return {
      ...col,
      onCell: (record: T) =>
        ({
          record,
          inputType: col.inputType,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
          selectOptions: options[col.dataIndex as string],
          rules: col.rules,
        } as EditableCellProps<T>),
    };
  });

  if (showActions) {
    mergedColumns.push({
      title: 'Action',
      key: 'action',
      align: 'center',
      width: 120,
      render: (text: string, record: T, index: number) => {
        const editable = isEditing(record);
        return editable ? (
          <div
            id={String(index)}
            className="flex flex-row items-center justify-center"
          >
            <Button
              onClick={() => onEditConfirm && onEditConfirm(record)}
              shape="circle"
              icon={<SaveFilled />}
              className="mr-4 text-white bg-green-500"
            />
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={onEditCancel}
            >
              <Button
                shape="circle"
                className="text-white bg-red-500"
                icon={<StopOutlined />}
              />
            </Popconfirm>
          </div>
        ) : (
          <div
            id={String(index)}
            className="flex flex-row items-center justify-center"
          >
            {onEdit && (
              <Button
                icon={<EditFilled />}
                className="mr-4 text-white bg-blue-500"
                shape="circle"
                onClick={() => onEdit && onEdit(record)}
              />
            )}
            {onDelete && (
              <Popconfirm
                title="Sure to Delete?"
                onConfirm={() => onDelete && onDelete(record)}
              >
                <Button
                  icon={<DeleteFilled />}
                  className="text-white bg-red-500"
                  shape="circle"
                />
              </Popconfirm>
            )}
          </div>
        );
      },
    });
  }

  if (showRedirect) {
    mergedColumns.push({
      title: redirectTitle,
      key: 'redirect',
      align: 'center',
      width: 120,
      render: (text: string, record: T, index: number) => {
        return (
          <div
            id={String(index)}
            className="flex flex-row items-center justify-center"
          >
            <Button
              icon={<ArrowRightOutlined />}
              type="default"
              className="text-blue-500 hover:bg-blue-500 hover:text-white"
              shape="circle"
              onClick={() => onRedirect && onRedirect(record)}
            />
          </div>
        );
      },
    });
  }

  return (
    show && (
      <Form
        form={form}
        component={false}
      >
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          columns={mergedColumns}
          pagination={{
            onChange: onEditCancel,
          }}
          rowSelection={
            enableRowSelection
              ? {
                  selectedRowKeys: selectedRecord ? [selectedRecord.id] : [],
                  type: 'radio',
                }
              : undefined
          }
          {...restProps}
        />
      </Form>
    )
  );
};

export default CustomTable;
