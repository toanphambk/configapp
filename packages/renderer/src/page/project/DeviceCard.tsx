import {PlusOutlined} from '@ant-design/icons';
import type {Device, DeviceType, PortSetting} from '@prisma/client';
import {Card, Button, message} from 'antd';
import type {CustomColumnType} from '../../components/CustomTable';
import CustomTable from '../../components/CustomTable';
import type {ModalFormField} from '../../components/FormModal';
import FormModal from '../../components/FormModal';
import {useAppDispatch, useAppSelector} from '/@/redux/hooks';
import {setSelectedDevice} from '/@/redux/UI/AppSlice';
import {
  useGetDevices,
  useUpdateDevice,
  useDeleteDevice,
  useCreateDevice,
  useGetDeviceTypes,
} from '../../api';
import {getDevicePortInfos} from '#preload';
import {useEditableTable} from '/@/hook/useEditableTable';
import {useFormModal} from '/@/hook/useFormModal';
import {
  BaudRateEnum,
  DataBitsEnum,
  FlowControlEnum,
  ParityEnum,
  StopBitsEnum,
} from '../../../../main/src/enums/CommunicationSettings.enum';
import {EthernetPortTypeEnum, SerialPortTypeEnum} from '../../../../main/src/enums/PortType.enum';

const defaultEthernetPortConfig = {
  ipAddress: '192.168.1.1',
  subnetMask: '255.255.255.0',
  defaultGateway: '',
} as PortSetting;

const defaultSerialPortConfig = {
  baudRate: BaudRateEnum.B9600,
  dataBits: DataBitsEnum.Eight,
  stopBits: StopBitsEnum.One,
  parity: ParityEnum.None,
  flowControl: FlowControlEnum.None,
} as PortSetting;

const DeviceCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const {selectedDevice, selectedProject} = useAppSelector(state => state.appSlice);

  const {data: dataSource, isLoading: isFetchingDevices} = useGetDevices(
    {where: {projectId: selectedProject?.id}},
    {enabled: !!selectedProject?.id},
  );

  const {mutateAsync: updateDevice} = useUpdateDevice();
  const {mutateAsync: deleteDevice} = useDeleteDevice();
  const {mutateAsync: createDevice} = useCreateDevice();
  const {data: deviceTypes, isFetched: isDeviceTypesFetched} = useGetDeviceTypes({});

  const {
    editingRecord,
    form: tableForm,
    onEdit,
    onRedirect,
    onEditCancel,
    onEditConfirm,
    onRemove,
  } = useEditableTable<Device>();

  const {isModalOpen, form: modalForm, handleOpen, handleClose} = useFormModal<Device>();

  const columns: CustomColumnType<Device>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      inputType: 'text',
      enableEdit: true,
      width: 100,
      rules: [{required: true, message: 'Please input the device name!'}],
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      inputType: 'text',
      enableEdit: true,
      rules: [{required: true, message: 'Please input the device description!'}],
    },
    {
      title: 'Device Type',
      key: 'deviceTypeId',
      inputType: 'select',
      enableEdit: false,
      width: 100,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
  ];

  const createModalFields: ModalFormField<Device>[] = [
    {
      key: 'name',
      label: 'Name',
      inputType: 'text',
      rules: [{required: true, message: 'Please input the device name!'}],
    },
    {
      key: 'description',
      label: 'Description',
      inputType: 'text',
      rules: [{required: true, message: 'Please input the device description!'}],
    },
    {
      key: 'deviceTypeId',
      label: 'Device Type',
      rules: [{required: true, message: 'Please select the device type!'}],
      inputType: 'select',
      selectOptions: () => {
        if (!deviceTypes || !isDeviceTypesFetched) {
          return [];
        }
        return deviceTypes.map((type: DeviceType) => ({
          label: type.name,
          value: type.id,
        }));
      },
    },
  ];

  const handleCreateNew = async () => {
    const record = await modalForm.validateFields();
    try {
      const devicePortInfos = await getDevicePortInfos({
        where: {deviceTypeId: record.deviceTypeId},
      });

      await createDevice({
        data: {
          ...record,
          projectId: selectedProject?.id,
          port: {
            create: devicePortInfos.map(portInfo => {
              const data = {
                portType: portInfo.portType,
                portName: portInfo.portName,
                description: portInfo.description,
              };
              if (portInfo.portType in EthernetPortTypeEnum) {
                return {
                  ...data,
                  portSetting: {
                    create: defaultEthernetPortConfig,
                  },
                };
              } else if (portInfo.portType in SerialPortTypeEnum) {
                return {
                  ...data,
                  portSetting: {
                    create: defaultSerialPortConfig,
                  },
                };
              } else {
                return {
                  ...data,
                };
              }
            }),
          },
          mqtt: {
            create: {},
          },
        },
      });
      handleClose();
      message.success('Device created successfully');
    } catch (error) {
      message.error('Failed to create device');
      console.error(error);
    }
  };

  const onDeletedDevice = () => {
    dispatch(setSelectedDevice({} as Device));
  };

  const onRedirectedDevice = (record: Device) => {
    dispatch(setSelectedDevice(record));
  };

  return (
    <div className="flex flex-col w-full">
      <Card
        className="w-full"
        title="Devices"
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
        <FormModal<Device>
          title="Add Device"
          open={isModalOpen}
          onSubmit={handleCreateNew}
          onCancel={handleClose}
          formFields={createModalFields}
          formInstance={modalForm}
          submitText="Create"
        />
        <CustomTable<Device>
          rowKey={record => record.id}
          dataSource={dataSource}
          columns={columns}
          loading={isFetchingDevices}
          onRedirect={record => onRedirect(record, undefined, onRedirectedDevice)}
          showRedirect={true}
          redirectTitle="Device Setting"
          selectedRecord={selectedDevice}
          onEdit={onEdit}
          onEditConfirm={record => onEditConfirm(record, updateDevice)}
          onEditCancel={onEditCancel}
          onDelete={record => onRemove(record, deleteDevice, onDeletedDevice)}
          editingRecord={editingRecord}
          form={tableForm}
          showActions={true}
        />
      </Card>
    </div>
  );
};

export default DeviceCard;
