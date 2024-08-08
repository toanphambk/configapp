import React from 'react';
import {Button, Card} from 'antd';
import {useAppDispatch, useAppSelector} from '/@/redux/hooks';
import type {Prisma, Protocol} from '@prisma/client';
import {useGetProtocols, useUpdateProtocol, useCreateProtocol, useDeleteProtocol} from '../../api';
import type {CustomColumnType} from '/@/components/CustomTable';
import CustomTable from '/@/components/CustomTable';
import {useEditableTable} from '/@/hook/useEditableTable';
import {useFormModal} from '/@/hook/useFormModal';
import {EthernetProtocolEnum, ProtocolEnum} from '../../../../main/src/enums/Protocols.enum';
import {PlusOutlined} from '@ant-design/icons';
import type {ModalFormField} from '/@/components/FormModal';
import FormModal from '/@/components/FormModal';
import {getEnumOptions} from '/@/utility/getEnumOption';
import {setSelectedProtocol} from '/@/redux/UI/AppSlice';
import {EthernetPortTypeEnum} from '../../../../main/src/enums/PortType.enum';
import type {EthernetPortValidationParams} from '/@/validation/protocolPortValidation';
import {ethernetPortISNotInUse} from '/@/validation/protocolPortValidation';

const crateModalFields: ModalFormField<Protocol>[] = [
  {
    key: 'type',
    label: 'Protocol',
    inputType: 'select',
    rules: [{required: true, message: 'Please select a protocol type!'}],
    selectOptions: getEnumOptions(EthernetProtocolEnum),
  },
  {
    key: 'tcpPort',
    label: 'TCP Port',
    inputType: 'number',
    rules: [
      {
        required: true,
        message: 'Please input the TCP port!',
      },
      {
        type: 'number',
        min: 0,
        max: 65535,
        message: 'Port must be between 0 and 65535',
      },
    ],
  },
];

const collumns: CustomColumnType<Protocol>[] = [
  {
    title: 'Protocol',
    dataIndex: 'type',
    key: 'type',
    enableEdit: true,
    inputType: 'select',
    render: (text, record) => ProtocolEnum[record.type],
    rules: [{required: true, message: 'Please select a protocol type!'}],
    selectOptions: getEnumOptions(EthernetProtocolEnum),
  },
  {
    title: 'TCP Port',
    dataIndex: 'tcpPort',
    key: 'tcpPort',
    enableEdit: true,
    inputType: 'number',
    rules: [
      {
        required: true,
        message: 'Please input the TCP port!',
      },
      {
        type: 'number',
        min: 0,
        max: 65535,
        message: 'Port must be between 0 and 65535',
      },
    ],
    width: 120,
    align: 'center',
  },
];

const EthernetProtocolTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const {selectedDevicePort, selectedProtocol} = useAppSelector(state => state.appSlice);
  const {
    editingRecord,
    form: tableForm,
    onEdit,
    onEditCancel,
    onEditConfirm,
    onRemove,
  } = useEditableTable<Protocol>();

  const {
    isModalOpen,
    form: modalForm,
    handleOpen,
    handleClose,
    onSubmit,
  } = useFormModal<Protocol>();

  const {data: protocols, isLoading: isFetchingProtocols} = useGetProtocols(
    {where: {devicePortId: selectedDevicePort?.id}},
    {enabled: !!selectedDevicePort?.id},
  );

  const ethernetPortValidation = async (
    param: Prisma.ProtocolCreateArgs | Prisma.ProtocolUpdateArgs,
  ) => {
    const {devicePortId, tcpPort} = param.data as EthernetPortValidationParams;
    await ethernetPortISNotInUse({devicePortId, tcpPort});
  };

  const {mutateAsync: create} = useCreateProtocol({}, [ethernetPortValidation]);

  const {mutateAsync: update} = useUpdateProtocol({}, [ethernetPortValidation]);

  const {mutateAsync: remove} = useDeleteProtocol({});

  const onModalSubmit = () => onSubmit(create, {devicePortId: selectedDevicePort?.id});

  const handleRowClick = (record: Protocol) => {
    dispatch(setSelectedProtocol(record));
  };

  return (
    selectedDevicePort?.portType !== EthernetPortTypeEnum.Monitor && (
      <div className="flex flex-col w-full">
        <Card
          className="w-full"
          title="Protocol"
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
          <FormModal<Protocol>
            title="Add Protocol"
            open={isModalOpen}
            onSubmit={onModalSubmit}
            onCancel={handleClose}
            formFields={crateModalFields}
            formInstance={modalForm}
            submitText="Create"
          />
          <CustomTable<Protocol>
            show={selectedDevicePort?.portType !== EthernetPortTypeEnum.Monitor}
            rowKey={record => record.id}
            columns={collumns}
            dataSource={protocols}
            loading={isFetchingProtocols}
            pagination={false}
            enableRowSelection={true}
            onRow={record => ({onClick: () => handleRowClick(record)})}
            selectedRecord={selectedProtocol}
            onEdit={onEdit}
            onDelete={record =>
              onRemove(record, remove, () => dispatch(setSelectedProtocol({} as Protocol)))
            }
            onRedirect={record => dispatch(setSelectedProtocol(record))}
            onEditConfirm={record => onEditConfirm(record, update)}
            onEditCancel={onEditCancel}
            editingRecord={editingRecord}
            form={tableForm}
            showActions={true}
          />
        </Card>
      </div>
    )
  );
};

export default EthernetProtocolTable;
