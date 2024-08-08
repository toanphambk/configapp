import React, {useEffect} from 'react';
import {Button, Card} from 'antd';
import {useAppDispatch, useAppSelector} from '/@/redux/hooks';
import type {SlaveDevice} from '@prisma/client';
import {
  useCreateSlaveDevice,
  useDeleteSlaveDevice,
  useGetSlaveDevices,
  useUpdateSlaveDevice,
} from '../../api';
import type {CustomColumnType} from '/@/components/CustomTable';
import CustomTable from '/@/components/CustomTable';
import {useEditableTable} from '/@/hook/useEditableTable';
import {useFormModal} from '/@/hook/useFormModal';
import {PlusOutlined} from '@ant-design/icons';
import type {ModalFormField} from '/@/components/FormModal';
import FormModal from '/@/components/FormModal';

import {setSelectedSlaveDevice} from '/@/redux/UI/AppSlice';
import {EthernetProtocolEnum, SerialProtocolEnum} from '../../../../main/src/enums/Protocols.enum';
import type {Rule} from 'antd/lib/form';

const columns: CustomColumnType<SlaveDevice>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    enableEdit: true,
    inputType: 'text',
    rules: [{required: true, message: 'Please input the device name!'}],
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
    enableEdit: true,
    inputType: 'text',
  },
  {
    title: 'Device Address',
    dataIndex: 'deviceAddress',
    key: 'deviceAddress',
    enableEdit: true,
    inputType: 'text',
    rules: [{required: true, message: 'Please input the device address!'}],
  },
  {
    title: 'Scan Interval',
    dataIndex: 'scanRate',
    key: 'scanRate',
    enableEdit: true,
    inputType: 'number',
    rules: [{required: true, message: 'Please input the scan interval!'}],
  },
];

const createModalFields: ModalFormField<SlaveDevice>[] = [
  {
    key: 'name',
    label: 'Name',
    inputType: 'text',
    rules: [{required: true, message: 'Please input the device name!'}],
  },
  {
    key: 'description',
    label: 'description',
    inputType: 'text',
  },
  {
    key: 'deviceAddress',
    label: 'Device Address',
    inputType: 'text',
  },
  {
    key: 'scanRate',
    label: 'Scan Interval',
    inputType: 'number',
    rules: [{required: true, message: 'Please input the scan interval!'}],
  },
];

const ethernetDeviceAddressRule: Rule[] = [
  {required: true, message: 'Please input the device address!'},
  {
    pattern: new RegExp('^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$'),
    message: 'Please input a valid ip address',
  },
];

const serialDeviceAddressRule: Rule[] = [
  {required: true, message: 'Please input the device address!'},
  {
    pattern: new RegExp('^(?:[1-9]?[0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-3])$'),
    message: 'Address mus be between 1 and 255',
  },
];

const SlaveDeviceTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const {selectedProtocol, selectedSlaveDevice} = useAppSelector(state => state.appSlice);

  const {data: slaveDevices, isLoading: isFetchingSlaveDivices} = useGetSlaveDevices(
    {where: {protocolId: selectedProtocol?.id}},
    {enabled: !!selectedProtocol?.id},
  );

  const {mutateAsync: update} = useUpdateSlaveDevice();
  const {mutateAsync: create} = useCreateSlaveDevice();
  const {mutateAsync: remove} = useDeleteSlaveDevice();
  const {
    editingRecord,
    form: tableForm,
    onEdit,
    onEditCancel,
    onEditConfirm,
    onRemove,
  } = useEditableTable<SlaveDevice>();

  const {
    isModalOpen,
    form: modalForm,
    onSubmit,
    handleOpen,
    handleClose,
  } = useFormModal<SlaveDevice>();

  useEffect(() => {
    if (selectedProtocol?.type in EthernetProtocolEnum) {
      createModalFields.find(field => field.key === 'deviceAddress')!.rules =
        ethernetDeviceAddressRule;
      columns.find(column => column.dataIndex === 'deviceAddress')!.rules =
        ethernetDeviceAddressRule;
      return;
    }
    if (selectedProtocol?.type in SerialProtocolEnum) {
      createModalFields.find(field => field.key === 'deviceAddress')!.rules =
        serialDeviceAddressRule;
      columns.find(column => column.dataIndex === 'deviceAddress')!.rules = serialDeviceAddressRule;
      return;
    }
  }, [selectedProtocol]);

  const onModalSubmit = () => onSubmit(create, {protocolId: selectedProtocol?.id});

  const handleRowClick = (record: SlaveDevice) => {
    dispatch(setSelectedSlaveDevice(record));
  };

  const onDeletedSlaveDevice = () => {
    dispatch(setSelectedSlaveDevice({} as SlaveDevice));
  };

  return (
    <div className="flex flex-col w-full">
      <Card
        className="w-full"
        title="Slave Devices"
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
        <FormModal<SlaveDevice>
          title="Add Slave Devices"
          open={isModalOpen}
          onSubmit={onModalSubmit}
          onCancel={handleClose}
          formFields={createModalFields}
          formInstance={modalForm}
          submitText="Create"
        />
        <CustomTable<SlaveDevice>
          rowKey={record => record.id}
          columns={columns}
          dataSource={slaveDevices}
          loading={isFetchingSlaveDivices}
          pagination={false}
          enableRowSelection={true}
          onRow={record => ({
            onClick: () => handleRowClick(record),
          })}
          selectedRecord={selectedSlaveDevice}
          onEdit={onEdit}
          onEditCancel={onEditCancel}
          onEditConfirm={record => onEditConfirm(record, update)}
          onDelete={record => onRemove(record, remove, onDeletedSlaveDevice)}
          editingRecord={editingRecord}
          form={tableForm}
          showActions={true}
        />
      </Card>
    </div>
  );
};

export default SlaveDeviceTable;
