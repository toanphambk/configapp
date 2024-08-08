/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {Card} from 'antd';
import {useAppSelector} from '/@/redux/hooks';
import type {Mqtt} from '@prisma/client';
import {useGetMqtts, useUpdateMqtt} from '../../api';
import type {CustomColumnType} from '/@/components/CustomTable';
import CustomTable from '/@/components/CustomTable';
import {useEditableTable} from '/@/hook/useEditableTable';

const mqttSettingColumns: CustomColumnType<Mqtt>[] = [
  {
    title: 'Broker Adress',
    dataIndex: 'brokerAddress',
    key: 'brokerAddress',
    enableEdit: true,
  },
  {
    title: 'Port',
    dataIndex: 'port',
    key: 'port',
    enableEdit: true,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    enableEdit: true,
  },
  {
    title: 'Password',
    dataIndex: 'password',
    key: 'password',
    enableEdit: true,
  },
  {
    title: 'Client ID',
    dataIndex: 'clientId',
    key: 'clientId',
    enableEdit: true,
  },
  {
    title: 'Keep Alive',
    dataIndex: 'keepAlive',
    key: 'keepAlive',
    enableEdit: true,
  },
  {
    title: 'Clean Session',
    dataIndex: 'cleanSession',
    key: 'cleanSession',
    enableEdit: true,
  },
  {
    title: 'useSSL',
    dataIndex: 'useSSL',
    key: 'useSSL',
    enableEdit: true,
  },
];
const MqttCard: React.FC = () => {
  // const dispatch = useAppDispatch();
  const {selectedDevice} = useAppSelector(state => state.appSlice);

  const {mutateAsync: update} = useUpdateMqtt();

  const {data: mqtt} = useGetMqtts(
    {where: {deviceId: selectedDevice?.id}},
    {enabled: !!selectedDevice?.id},
  );

  const {editingRecord, onEdit, onEditCancel, onEditConfirm, form} = useEditableTable<Mqtt>();

  return (
    <div className="flex flex-col w-full">
      <Card
        className="w-full"
        title="Mqtt Settings"
      >
        <CustomTable<Mqtt>
          rowKey={record => record.id}
          columns={mqttSettingColumns}
          dataSource={mqtt ? mqtt : []}
          pagination={false}
          onEdit={onEdit}
          onEditConfirm={record => onEditConfirm(record, update)}
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

export default MqttCard;
