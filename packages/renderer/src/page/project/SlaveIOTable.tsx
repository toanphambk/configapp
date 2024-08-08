import React, {useEffect} from 'react';
import {Button, Card, message} from 'antd';
import {useAppSelector} from '/@/redux/hooks';
import type {IO} from '@prisma/client';
import {useCreateIO, useDeleteIO, useGetIOs, useUpdateIO} from '../../api';
import type {CustomColumnType} from '/@/components/CustomTable';
import CustomTable from '/@/components/CustomTable';
import {useEditableTable} from '/@/hook/useEditableTable';
import {useFormModal} from '/@/hook/useFormModal';
import {PlusOutlined} from '@ant-design/icons';
import type {ModalFormField} from '/@/components/FormModal';
import FormModal from '/@/components/FormModal';
import {getEnumOptions} from '/@/utility/getEnumOption';
import {ConversionEnum} from '../../../../main/src/enums/Conversion.enum';
import {EthernetProtocolEnum, SerialProtocolEnum} from '../../../../main/src/enums/Protocols.enum';
import {MitsuPlcRegisterEnum, SiemenPlcRegisterEnum} from '../../../../main/src/enums/Plc.enum';

const defaultColumns: CustomColumnType<IO>[] = [
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'name',
    enableEdit: true,
    inputType: 'text',
    rules: [{required: true, message: 'Please input the device name!'}],
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    enableEdit: true,
    inputType: 'text',
  },

  {
    dataIndex: 'startAddress',
    title: 'Address',
    enableEdit: true,
    inputType: 'number',
    rules: [{required: true, message: 'Please input the start address!'}],
  },
  {
    dataIndex: 'length',
    title: 'Length',
    enableEdit: true,
    inputType: 'number',
    rules: [{required: true, message: 'Please input the length!'}],
  },
  {
    title: 'Data Conversion',
    dataIndex: 'conversion',
    key: 'conversion',
    enableEdit: true,
    inputType: 'select',
    rules: [{required: true, message: 'Please input the scan interval!'}],
    selectOptions: getEnumOptions(ConversionEnum),
    render: (text, record) => {
      return ConversionEnum[record.conversion];
    },
  },
];

const defaltModalFields: ModalFormField<IO>[] = [
  {
    key: 'Name',
    label: 'Name',
    inputType: 'text',
    rules: [{required: true, message: 'Please input the device name!'}],
  },
  {
    key: 'description',
    label: 'description',
    inputType: 'text',
    rules: [{required: true, message: 'Please input the device desription!'}],
  },
  {
    key: 'startAddress',
    label: 'Address',
    inputType: 'number',
    rules: [{required: true, message: 'Please input the start address!'}],
  },
  {
    key: 'length',
    label: 'Length',
    inputType: 'number',
    rules: [{required: true, message: 'Please input the length!'}],
  },
  {
    key: 'conversion',
    label: 'Data Conversion',
    inputType: 'select',
    selectOptions: getEnumOptions(ConversionEnum),
    rules: [{required: true, message: 'Please select the device address!'}],
  },
];

const SlaveIOTable: React.FC = () => {
  const {selectedProtocol, selectedSlaveDevice} = useAppSelector(state => state.appSlice);
  const [collumn, setColumn] = React.useState(defaultColumns);
  const [modalField, setModalField] = React.useState(defaltModalFields);
  const {data: slaveDevices, isLoading: isFetchingSlaveDivices} = useGetIOs(
    {where: {slaveDeviceId: selectedSlaveDevice?.id}},
    {enabled: !!selectedSlaveDevice?.id},
  );

  const {mutateAsync: update} = useUpdateIO();
  const {mutateAsync: create} = useCreateIO();
  const {mutateAsync: remove} = useDeleteIO();
  const {
    editingRecord,
    form: tableForm,
    onEdit,
    onEditCancel,
    onEditConfirm,
    onRemove,
  } = useEditableTable<IO>();

  const {isModalOpen, form: modalForm, handleOpen, handleClose} = useFormModal<IO>();

  useEffect(() => {
    if (
      selectedProtocol?.type === EthernetProtocolEnum.MCProtocol ||
      selectedProtocol?.type === SerialProtocolEnum.MCProtocol
    ) {
      setColumn([
        {
          dataIndex: 'register',
          title: 'Register',
          enableEdit: true,
          inputType: 'select',
          selectOptions: getEnumOptions(MitsuPlcRegisterEnum),
          rules: [{required: true, message: 'Please input the register!'}],
        },
        ...defaultColumns,
      ]);
      setModalField([
        {
          key: 'register',
          label: 'Register',
          inputType: 'select',
          selectOptions: getEnumOptions(MitsuPlcRegisterEnum),
          rules: [{required: true, message: 'Please select the register!'}],
        },
        ...defaltModalFields,
      ]);
      return;
    }
    if (selectedProtocol?.type === EthernetProtocolEnum.S7Protocol) {
      setColumn([
        {
          dataIndex: 'register',
          title: 'Register',
          enableEdit: true,
          inputType: 'select',
          selectOptions: getEnumOptions(SiemenPlcRegisterEnum),
          rules: [{required: true, message: 'Please input the register!'}],
        },
        ...defaultColumns,
      ]);
      setModalField([
        {
          key: 'register',
          label: 'Register',
          inputType: 'select',
          selectOptions: getEnumOptions(SiemenPlcRegisterEnum),
          rules: [{required: true, message: 'Please select the register!'}],
        },
        ...defaltModalFields,
      ]);
      return;
    }
    setColumn(defaultColumns);
    setModalField(defaltModalFields);
  }, [selectedProtocol]);

  const handleCreateNew = async (record: IO) => {
    try {
      await create({
        data: {
          ...record,
          slaveDeviceId: selectedSlaveDevice?.id,
        },
      });
      handleClose();
      message.success('Slave Device created successfully');
    } catch (error) {
      message.error('Failed to create Slave Device');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Card
        className="w-full"
        title="IO"
        extra={
          <Button
            className="font-semibold text-white bg-green-500"
            shape="default"
            icon={<PlusOutlined />}
            onClick={handleOpen}
          >
            New
          </Button>
        }
      >
        <FormModal<IO>
          title="Add IO"
          open={isModalOpen}
          onSubmit={handleCreateNew}
          onCancel={handleClose}
          formFields={modalField}
          formInstance={modalForm}
          submitText="Create"
        />
        <CustomTable<IO>
          rowKey={record => record.id}
          columns={collumn}
          dataSource={slaveDevices}
          loading={isFetchingSlaveDivices}
          pagination={false}
          enableRowSelection={false}
          onEdit={onEdit}
          onDelete={record => onRemove(record, remove)}
          onEditConfirm={record => onEditConfirm(record, update)}
          onEditCancel={onEditCancel}
          editingRecord={editingRecord}
          form={tableForm}
          showActions={true}
        />
      </Card>
    </div>
  );
};

export default SlaveIOTable;
