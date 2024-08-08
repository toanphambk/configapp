/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {Card} from 'antd';
import {useAppSelector} from '/@/redux/hooks';
import type {PortSetting} from '@prisma/client';
import {useGetPortSettings, useUpdatePortSetting} from '../../api';
import type {CustomColumnType} from '/@/components/CustomTable';
import CustomTable from '/@/components/CustomTable';
import {EthernetPortTypeEnum} from '../../../../main/src/enums/PortType.enum';
import {
  ParityEnum,
  FlowControlEnum,
  BaudRateEnum,
  DataBitsEnum,
  StopBitsEnum,
} from '../../../../main/src/enums/CommunicationSettings.enum';
import {useEditableTable} from '/@/hook/useEditableTable';
import {getEnumOptions} from '/@/utility/getEnumOption';
import {portIPAdressIsNotInUse} from '/@/validation/portIPValidation';

const ethernetPortCollumns: CustomColumnType<PortSetting>[] = [
  {
    title: 'IP Address',
    dataIndex: 'ipAddress',
    key: 'ipAddress',
    enableEdit: true,
    width: 300,
    rules: [
      {required: true, message: 'Please input the IP address!'},
      {
        pattern: new RegExp('^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$'),
        message: 'Please input a valid ip address',
      },
    ],
  },
  {
    title: 'Subnet Mask',
    dataIndex: 'subnetMask',
    key: 'subnetMask',
    enableEdit: true,
    width: 300,
    rules: [
      {required: true, message: 'Please input the subnet mask address!'},
      {
        pattern: new RegExp('^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$'),
        message: 'Please input a valid ip address',
      },
    ],
  },
  {
    title: 'Default Gateway',
    dataIndex: 'defaultGateway',
    key: 'defaultGateway',
    enableEdit: true,
    width: 300,
    rules: [
      {
        pattern: new RegExp('^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$'),
        message: 'Please input a valid ip address',
      },
    ],
  },
];

const serialPortColumns: CustomColumnType<PortSetting>[] = [
  {
    title: 'Baud Rate',
    dataIndex: 'baudRate',
    key: 'baudRate',
    enableEdit: true,
    align: 'center',
    inputType: 'select',
    selectOptions: getEnumOptions(BaudRateEnum),
  },
  {
    title: 'Data Bits',
    dataIndex: 'dataBits',
    key: 'dataBits',
    enableEdit: true,
    align: 'center',
    inputType: 'select',
    selectOptions: getEnumOptions(DataBitsEnum),
  },
  {
    title: 'Stop Bits',
    dataIndex: 'stopBits',
    key: 'stopBits',
    enableEdit: true,
    align: 'center',
    inputType: 'select',
    selectOptions: getEnumOptions(StopBitsEnum),
  },
  {
    title: 'Parity',
    key: 'parity',
    dataIndex: 'parity',
    enableEdit: true,
    align: 'center',
    inputType: 'select',
    selectOptions: getEnumOptions(ParityEnum),
    render: (value, portSetting, index) => <div key={index}>{ParityEnum[value]}</div>,
  },
  {
    title: 'Flow Control',
    key: 'flowControl',
    dataIndex: 'flowControl',
    enableEdit: true,
    align: 'center',
    inputType: 'select',
    selectOptions: getEnumOptions(FlowControlEnum),
    render: (value, portSetting, index) => <div key={index}>{FlowControlEnum[value]}</div>,
  },
];

const PortSettingCard: React.FC = () => {
  const {selectedDevicePort} = useAppSelector(state => state.appSlice);

  const {editingRecord, onEdit, onEditCancel, onEditConfirm, form} =
    useEditableTable<PortSetting>();

  const {data: portSettings} = useGetPortSettings(
    {where: {id: selectedDevicePort?.id}},
    {enabled: !!selectedDevicePort?.id},
  );

  const {mutateAsync: updatePortSetting} = useUpdatePortSetting({}, [
    async param => {
      const {devicePortId, ipAddress} = param.data;
      await portIPAdressIsNotInUse({
        devicePortId: Number(devicePortId),
        ipAddress: ipAddress?.toString(),
      });
    },
  ]);

  return (
    <div className="flex flex-col w-full">
      <Card
        className="w-full"
        title="Configuration"
      >
        <CustomTable<PortSetting>
          key={selectedDevicePort?.id}
          rowKey={record => record.id}
          columns={
            selectedDevicePort?.portType in EthernetPortTypeEnum
              ? ethernetPortCollumns
              : serialPortColumns
          }
          dataSource={portSettings}
          pagination={false}
          onEdit={onEdit}
          onEditConfirm={record => onEditConfirm(record, updatePortSetting)}
          onEditCancel={onEditCancel}
          editingRecord={editingRecord}
          form={form}
          showActions={true}
          enableRowSelection={false}
        />
      </Card>
    </div>
  );
};

export default PortSettingCard;
