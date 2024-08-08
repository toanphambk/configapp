/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {Card} from 'antd';
import {useAppDispatch, useAppSelector} from '/@/redux/hooks';
import type {DevicePort} from '@prisma/client';
import {useGetDevicePorts, useUpdateDevicePort} from '../../api';
import type {CustomColumnType} from '/@/components/CustomTable';
import CustomTable from '/@/components/CustomTable';
import {
  EthernetPortTypeEnum,
  PortTypeEnum,
  SerialPortTypeEnum,
} from '../../../../main/src/enums/PortType.enum';
import {setSelectedDevicePort} from '/@/redux/UI/AppSlice';
import {useEditableTable} from '/@/hook/useEditableTable';
import {getEnumOptions} from '/@/utility/getEnumOption';

const ConfigCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const {selectedDevice, selectedDevicePort} = useAppSelector(state => state.appSlice);
  const {data: ports} = useGetDevicePorts(
    {where: {deviceId: selectedDevice?.id}},
    {enabled: !!selectedDevice?.id},
  );

  const {mutateAsync: updateDevicePort} = useUpdateDevicePort();
  const {form, editingRecord, onRedirect, onEdit, onEditCancel, onEditConfirm} =
    useEditableTable<DevicePort>();

  const columns: CustomColumnType<DevicePort>[] = [
    {
      title: 'Port Name',
      dataIndex: 'portName',
      key: 'portName',
      width: 150,
      enableEdit: false,
      align: 'center',
    },
    {
      title: 'Port Type',
      dataIndex: 'portType',
      key: 'portType',
      width: 150,
      align: 'center',
      render: (text, record) => {
        return PortTypeEnum[record.portType];
      },
      enableEdit: true,
      inputType: 'select',
      selectOptions: record => {
        if ((record as DevicePort)?.portType in SerialPortTypeEnum) {
          return getEnumOptions(SerialPortTypeEnum);
        }
        if ((record as DevicePort)?.portType in EthernetPortTypeEnum) {
          return getEnumOptions(EthernetPortTypeEnum);
        }
        return [];
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      enableEdit: true,
      inputType: 'text',
    },
  ];

  const onRedirected = (record: DevicePort) => {
    dispatch(setSelectedDevicePort(record));
  };

  return (
    <div className="flex flex-col w-full">
      <Card
        className="w-full"
        title="Configuration"
      >
        <CustomTable<DevicePort>
          rowKey={record => record.id}
          className="w-full"
          dataSource={ports || []}
          form={form}
          editingRecord={editingRecord}
          onEdit={onEdit}
          onEditCancel={onEditCancel}
          onEditConfirm={record => onEditConfirm(record, updateDevicePort)}
          columns={columns}
          redirectTitle="Port Config"
          onRedirect={record => onRedirect(record, undefined, onRedirected)}
          pagination={false}
          rowHoverable={false}
          showActions={true}
          showRedirect={true}
          enableRowSelection={true}
          selectedRecord={selectedDevicePort}
        />
      </Card>
    </div>
  );
};

export default ConfigCard;
