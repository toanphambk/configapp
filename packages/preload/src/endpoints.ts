
import type { Prisma, Project, Device, DeviceType, DevicePortInfo, DevicePort, Protocol, SlaveDevice, PortSetting, IO, Mqtt, MqttTopic, MqttPayload } from '@prisma/client';
import { ipcRenderer } from 'electron';
import type { PrismaClient } from 'prisma/prisma-client/extension';

export type PrismaAction = 'findMany' | 'findUnique' | 'findFirst' | 'create' | 'update' | 'delete';

export type PrismaQueryParams = {
  model: keyof PrismaClient;
  action: PrismaAction;
  params?: unknown;
  validations?: ((params: any) => Promise<void>)[];
};
export type PrismaQuerryResponse = { result?: unknown; error?: Error };

export const sendPrismaQuery = async <T>(option: PrismaQueryParams & { params: T }): Promise<unknown> => {
  const { model, action, params, validations } = option;
  try {
    if (validations && (action === 'create' || action === 'update')) {
      for (const validation of validations) {
        await validation(params);
      }
    }

    const { result, error } = (await ipcRenderer.invoke('prisma-query', { model, action, params })) as PrismaQuerryResponse;
    if (error) {
      throw error;
    }
    return result;
  } catch (error) {
    console.error('Validation or Prisma query error:', error);
    throw error;
  }
};

export const createProject = async (option: Prisma.ProjectCreateArgs, validations?: ((params: Prisma.ProjectCreateArgs) => Promise<void>)[]): Promise<Project> => {
  return (await sendPrismaQuery<Prisma.ProjectCreateArgs>({ model: 'project', action: 'create', params: option, validations })) as Project;
};

export const getProjects = async (option: Prisma.ProjectFindManyArgs): Promise<Project[]> => {
  return (await sendPrismaQuery<Prisma.ProjectFindManyArgs>({ model: 'project', action: 'findMany', params: option })) as Project[];
};

export const getProject = async (option: Prisma.ProjectFindFirstArgs): Promise<Project> => {
  return (await sendPrismaQuery<Prisma.ProjectFindFirstArgs>({ model: 'project', action: 'findFirst', params: option })) as Project;
};

export const getProjectUnique = async (option: Prisma.ProjectFindUniqueArgs): Promise<Project> => {
  return (await sendPrismaQuery<Prisma.ProjectFindUniqueArgs>({ model: 'project', action: 'findUnique', params: option })) as Project;
};

export const updateProject = async (option: Prisma.ProjectUpdateArgs, validations?: ((params: Prisma.ProjectUpdateArgs) => Promise<void>)[]): Promise<Project> => {
  return (await sendPrismaQuery<Prisma.ProjectUpdateArgs>({ model: 'project', action: 'update', params: option, validations })) as Project;
};

export const deleteProject = async (option: Prisma.ProjectDeleteArgs): Promise<Project> => {
  return (await sendPrismaQuery<Prisma.ProjectDeleteArgs>({ model: 'project', action: 'delete', params: option })) as Project;
};


export const createDevice = async (option: Prisma.DeviceCreateArgs, validations?: ((params: Prisma.DeviceCreateArgs) => Promise<void>)[]): Promise<Device> => {
  return (await sendPrismaQuery<Prisma.DeviceCreateArgs>({ model: 'device', action: 'create', params: option, validations })) as Device;
};

export const getDevices = async (option: Prisma.DeviceFindManyArgs): Promise<Device[]> => {
  return (await sendPrismaQuery<Prisma.DeviceFindManyArgs>({ model: 'device', action: 'findMany', params: option })) as Device[];
};

export const getDevice = async (option: Prisma.DeviceFindFirstArgs): Promise<Device> => {
  return (await sendPrismaQuery<Prisma.DeviceFindFirstArgs>({ model: 'device', action: 'findFirst', params: option })) as Device;
};

export const getDeviceUnique = async (option: Prisma.DeviceFindUniqueArgs): Promise<Device> => {
  return (await sendPrismaQuery<Prisma.DeviceFindUniqueArgs>({ model: 'device', action: 'findUnique', params: option })) as Device;
};

export const updateDevice = async (option: Prisma.DeviceUpdateArgs, validations?: ((params: Prisma.DeviceUpdateArgs) => Promise<void>)[]): Promise<Device> => {
  return (await sendPrismaQuery<Prisma.DeviceUpdateArgs>({ model: 'device', action: 'update', params: option, validations })) as Device;
};

export const deleteDevice = async (option: Prisma.DeviceDeleteArgs): Promise<Device> => {
  return (await sendPrismaQuery<Prisma.DeviceDeleteArgs>({ model: 'device', action: 'delete', params: option })) as Device;
};


export const createDeviceType = async (option: Prisma.DeviceTypeCreateArgs, validations?: ((params: Prisma.DeviceTypeCreateArgs) => Promise<void>)[]): Promise<DeviceType> => {
  return (await sendPrismaQuery<Prisma.DeviceTypeCreateArgs>({ model: 'deviceType', action: 'create', params: option, validations })) as DeviceType;
};

export const getDeviceTypes = async (option: Prisma.DeviceTypeFindManyArgs): Promise<DeviceType[]> => {
  return (await sendPrismaQuery<Prisma.DeviceTypeFindManyArgs>({ model: 'deviceType', action: 'findMany', params: option })) as DeviceType[];
};

export const getDeviceType = async (option: Prisma.DeviceTypeFindFirstArgs): Promise<DeviceType> => {
  return (await sendPrismaQuery<Prisma.DeviceTypeFindFirstArgs>({ model: 'deviceType', action: 'findFirst', params: option })) as DeviceType;
};

export const getDeviceTypeUnique = async (option: Prisma.DeviceTypeFindUniqueArgs): Promise<DeviceType> => {
  return (await sendPrismaQuery<Prisma.DeviceTypeFindUniqueArgs>({ model: 'deviceType', action: 'findUnique', params: option })) as DeviceType;
};

export const updateDeviceType = async (option: Prisma.DeviceTypeUpdateArgs, validations?: ((params: Prisma.DeviceTypeUpdateArgs) => Promise<void>)[]): Promise<DeviceType> => {
  return (await sendPrismaQuery<Prisma.DeviceTypeUpdateArgs>({ model: 'deviceType', action: 'update', params: option, validations })) as DeviceType;
};

export const deleteDeviceType = async (option: Prisma.DeviceTypeDeleteArgs): Promise<DeviceType> => {
  return (await sendPrismaQuery<Prisma.DeviceTypeDeleteArgs>({ model: 'deviceType', action: 'delete', params: option })) as DeviceType;
};


export const createDevicePortInfo = async (option: Prisma.DevicePortInfoCreateArgs, validations?: ((params: Prisma.DevicePortInfoCreateArgs) => Promise<void>)[]): Promise<DevicePortInfo> => {
  return (await sendPrismaQuery<Prisma.DevicePortInfoCreateArgs>({ model: 'devicePortInfo', action: 'create', params: option, validations })) as DevicePortInfo;
};

export const getDevicePortInfos = async (option: Prisma.DevicePortInfoFindManyArgs): Promise<DevicePortInfo[]> => {
  return (await sendPrismaQuery<Prisma.DevicePortInfoFindManyArgs>({ model: 'devicePortInfo', action: 'findMany', params: option })) as DevicePortInfo[];
};

export const getDevicePortInfo = async (option: Prisma.DevicePortInfoFindFirstArgs): Promise<DevicePortInfo> => {
  return (await sendPrismaQuery<Prisma.DevicePortInfoFindFirstArgs>({ model: 'devicePortInfo', action: 'findFirst', params: option })) as DevicePortInfo;
};

export const getDevicePortInfoUnique = async (option: Prisma.DevicePortInfoFindUniqueArgs): Promise<DevicePortInfo> => {
  return (await sendPrismaQuery<Prisma.DevicePortInfoFindUniqueArgs>({ model: 'devicePortInfo', action: 'findUnique', params: option })) as DevicePortInfo;
};

export const updateDevicePortInfo = async (option: Prisma.DevicePortInfoUpdateArgs, validations?: ((params: Prisma.DevicePortInfoUpdateArgs) => Promise<void>)[]): Promise<DevicePortInfo> => {
  return (await sendPrismaQuery<Prisma.DevicePortInfoUpdateArgs>({ model: 'devicePortInfo', action: 'update', params: option, validations })) as DevicePortInfo;
};

export const deleteDevicePortInfo = async (option: Prisma.DevicePortInfoDeleteArgs): Promise<DevicePortInfo> => {
  return (await sendPrismaQuery<Prisma.DevicePortInfoDeleteArgs>({ model: 'devicePortInfo', action: 'delete', params: option })) as DevicePortInfo;
};


export const createDevicePort = async (option: Prisma.DevicePortCreateArgs, validations?: ((params: Prisma.DevicePortCreateArgs) => Promise<void>)[]): Promise<DevicePort> => {
  return (await sendPrismaQuery<Prisma.DevicePortCreateArgs>({ model: 'devicePort', action: 'create', params: option, validations })) as DevicePort;
};

export const getDevicePorts = async (option: Prisma.DevicePortFindManyArgs): Promise<DevicePort[]> => {
  return (await sendPrismaQuery<Prisma.DevicePortFindManyArgs>({ model: 'devicePort', action: 'findMany', params: option })) as DevicePort[];
};

export const getDevicePort = async (option: Prisma.DevicePortFindFirstArgs): Promise<DevicePort> => {
  return (await sendPrismaQuery<Prisma.DevicePortFindFirstArgs>({ model: 'devicePort', action: 'findFirst', params: option })) as DevicePort;
};

export const getDevicePortUnique = async (option: Prisma.DevicePortFindUniqueArgs): Promise<DevicePort> => {
  return (await sendPrismaQuery<Prisma.DevicePortFindUniqueArgs>({ model: 'devicePort', action: 'findUnique', params: option })) as DevicePort;
};

export const updateDevicePort = async (option: Prisma.DevicePortUpdateArgs, validations?: ((params: Prisma.DevicePortUpdateArgs) => Promise<void>)[]): Promise<DevicePort> => {
  return (await sendPrismaQuery<Prisma.DevicePortUpdateArgs>({ model: 'devicePort', action: 'update', params: option, validations })) as DevicePort;
};

export const deleteDevicePort = async (option: Prisma.DevicePortDeleteArgs): Promise<DevicePort> => {
  return (await sendPrismaQuery<Prisma.DevicePortDeleteArgs>({ model: 'devicePort', action: 'delete', params: option })) as DevicePort;
};


export const createProtocol = async (option: Prisma.ProtocolCreateArgs, validations?: ((params: Prisma.ProtocolCreateArgs) => Promise<void>)[]): Promise<Protocol> => {
  return (await sendPrismaQuery<Prisma.ProtocolCreateArgs>({ model: 'protocol', action: 'create', params: option, validations })) as Protocol;
};

export const getProtocols = async (option: Prisma.ProtocolFindManyArgs): Promise<Protocol[]> => {
  return (await sendPrismaQuery<Prisma.ProtocolFindManyArgs>({ model: 'protocol', action: 'findMany', params: option })) as Protocol[];
};

export const getProtocol = async (option: Prisma.ProtocolFindFirstArgs): Promise<Protocol> => {
  return (await sendPrismaQuery<Prisma.ProtocolFindFirstArgs>({ model: 'protocol', action: 'findFirst', params: option })) as Protocol;
};

export const getProtocolUnique = async (option: Prisma.ProtocolFindUniqueArgs): Promise<Protocol> => {
  return (await sendPrismaQuery<Prisma.ProtocolFindUniqueArgs>({ model: 'protocol', action: 'findUnique', params: option })) as Protocol;
};

export const updateProtocol = async (option: Prisma.ProtocolUpdateArgs, validations?: ((params: Prisma.ProtocolUpdateArgs) => Promise<void>)[]): Promise<Protocol> => {
  return (await sendPrismaQuery<Prisma.ProtocolUpdateArgs>({ model: 'protocol', action: 'update', params: option, validations })) as Protocol;
};

export const deleteProtocol = async (option: Prisma.ProtocolDeleteArgs): Promise<Protocol> => {
  return (await sendPrismaQuery<Prisma.ProtocolDeleteArgs>({ model: 'protocol', action: 'delete', params: option })) as Protocol;
};


export const createSlaveDevice = async (option: Prisma.SlaveDeviceCreateArgs, validations?: ((params: Prisma.SlaveDeviceCreateArgs) => Promise<void>)[]): Promise<SlaveDevice> => {
  return (await sendPrismaQuery<Prisma.SlaveDeviceCreateArgs>({ model: 'slaveDevice', action: 'create', params: option, validations })) as SlaveDevice;
};

export const getSlaveDevices = async (option: Prisma.SlaveDeviceFindManyArgs): Promise<SlaveDevice[]> => {
  return (await sendPrismaQuery<Prisma.SlaveDeviceFindManyArgs>({ model: 'slaveDevice', action: 'findMany', params: option })) as SlaveDevice[];
};

export const getSlaveDevice = async (option: Prisma.SlaveDeviceFindFirstArgs): Promise<SlaveDevice> => {
  return (await sendPrismaQuery<Prisma.SlaveDeviceFindFirstArgs>({ model: 'slaveDevice', action: 'findFirst', params: option })) as SlaveDevice;
};

export const getSlaveDeviceUnique = async (option: Prisma.SlaveDeviceFindUniqueArgs): Promise<SlaveDevice> => {
  return (await sendPrismaQuery<Prisma.SlaveDeviceFindUniqueArgs>({ model: 'slaveDevice', action: 'findUnique', params: option })) as SlaveDevice;
};

export const updateSlaveDevice = async (option: Prisma.SlaveDeviceUpdateArgs, validations?: ((params: Prisma.SlaveDeviceUpdateArgs) => Promise<void>)[]): Promise<SlaveDevice> => {
  return (await sendPrismaQuery<Prisma.SlaveDeviceUpdateArgs>({ model: 'slaveDevice', action: 'update', params: option, validations })) as SlaveDevice;
};

export const deleteSlaveDevice = async (option: Prisma.SlaveDeviceDeleteArgs): Promise<SlaveDevice> => {
  return (await sendPrismaQuery<Prisma.SlaveDeviceDeleteArgs>({ model: 'slaveDevice', action: 'delete', params: option })) as SlaveDevice;
};


export const createPortSetting = async (option: Prisma.PortSettingCreateArgs, validations?: ((params: Prisma.PortSettingCreateArgs) => Promise<void>)[]): Promise<PortSetting> => {
  return (await sendPrismaQuery<Prisma.PortSettingCreateArgs>({ model: 'portSetting', action: 'create', params: option, validations })) as PortSetting;
};

export const getPortSettings = async (option: Prisma.PortSettingFindManyArgs): Promise<PortSetting[]> => {
  return (await sendPrismaQuery<Prisma.PortSettingFindManyArgs>({ model: 'portSetting', action: 'findMany', params: option })) as PortSetting[];
};

export const getPortSetting = async (option: Prisma.PortSettingFindFirstArgs): Promise<PortSetting> => {
  return (await sendPrismaQuery<Prisma.PortSettingFindFirstArgs>({ model: 'portSetting', action: 'findFirst', params: option })) as PortSetting;
};

export const getPortSettingUnique = async (option: Prisma.PortSettingFindUniqueArgs): Promise<PortSetting> => {
  return (await sendPrismaQuery<Prisma.PortSettingFindUniqueArgs>({ model: 'portSetting', action: 'findUnique', params: option })) as PortSetting;
};

export const updatePortSetting = async (option: Prisma.PortSettingUpdateArgs, validations?: ((params: Prisma.PortSettingUpdateArgs) => Promise<void>)[]): Promise<PortSetting> => {
  return (await sendPrismaQuery<Prisma.PortSettingUpdateArgs>({ model: 'portSetting', action: 'update', params: option, validations })) as PortSetting;
};

export const deletePortSetting = async (option: Prisma.PortSettingDeleteArgs): Promise<PortSetting> => {
  return (await sendPrismaQuery<Prisma.PortSettingDeleteArgs>({ model: 'portSetting', action: 'delete', params: option })) as PortSetting;
};


export const createIO = async (option: Prisma.IOCreateArgs, validations?: ((params: Prisma.IOCreateArgs) => Promise<void>)[]): Promise<IO> => {
  return (await sendPrismaQuery<Prisma.IOCreateArgs>({ model: 'iO', action: 'create', params: option, validations })) as IO;
};

export const getIOs = async (option: Prisma.IOFindManyArgs): Promise<IO[]> => {
  return (await sendPrismaQuery<Prisma.IOFindManyArgs>({ model: 'iO', action: 'findMany', params: option })) as IO[];
};

export const getIO = async (option: Prisma.IOFindFirstArgs): Promise<IO> => {
  return (await sendPrismaQuery<Prisma.IOFindFirstArgs>({ model: 'iO', action: 'findFirst', params: option })) as IO;
};

export const getIOUnique = async (option: Prisma.IOFindUniqueArgs): Promise<IO> => {
  return (await sendPrismaQuery<Prisma.IOFindUniqueArgs>({ model: 'iO', action: 'findUnique', params: option })) as IO;
};

export const updateIO = async (option: Prisma.IOUpdateArgs, validations?: ((params: Prisma.IOUpdateArgs) => Promise<void>)[]): Promise<IO> => {
  return (await sendPrismaQuery<Prisma.IOUpdateArgs>({ model: 'iO', action: 'update', params: option, validations })) as IO;
};

export const deleteIO = async (option: Prisma.IODeleteArgs): Promise<IO> => {
  return (await sendPrismaQuery<Prisma.IODeleteArgs>({ model: 'iO', action: 'delete', params: option })) as IO;
};


export const createMqtt = async (option: Prisma.MqttCreateArgs, validations?: ((params: Prisma.MqttCreateArgs) => Promise<void>)[]): Promise<Mqtt> => {
  return (await sendPrismaQuery<Prisma.MqttCreateArgs>({ model: 'mqtt', action: 'create', params: option, validations })) as Mqtt;
};

export const getMqtts = async (option: Prisma.MqttFindManyArgs): Promise<Mqtt[]> => {
  return (await sendPrismaQuery<Prisma.MqttFindManyArgs>({ model: 'mqtt', action: 'findMany', params: option })) as Mqtt[];
};

export const getMqtt = async (option: Prisma.MqttFindFirstArgs): Promise<Mqtt> => {
  return (await sendPrismaQuery<Prisma.MqttFindFirstArgs>({ model: 'mqtt', action: 'findFirst', params: option })) as Mqtt;
};

export const getMqttUnique = async (option: Prisma.MqttFindUniqueArgs): Promise<Mqtt> => {
  return (await sendPrismaQuery<Prisma.MqttFindUniqueArgs>({ model: 'mqtt', action: 'findUnique', params: option })) as Mqtt;
};

export const updateMqtt = async (option: Prisma.MqttUpdateArgs, validations?: ((params: Prisma.MqttUpdateArgs) => Promise<void>)[]): Promise<Mqtt> => {
  return (await sendPrismaQuery<Prisma.MqttUpdateArgs>({ model: 'mqtt', action: 'update', params: option, validations })) as Mqtt;
};

export const deleteMqtt = async (option: Prisma.MqttDeleteArgs): Promise<Mqtt> => {
  return (await sendPrismaQuery<Prisma.MqttDeleteArgs>({ model: 'mqtt', action: 'delete', params: option })) as Mqtt;
};


export const createMqttTopic = async (option: Prisma.MqttTopicCreateArgs, validations?: ((params: Prisma.MqttTopicCreateArgs) => Promise<void>)[]): Promise<MqttTopic> => {
  return (await sendPrismaQuery<Prisma.MqttTopicCreateArgs>({ model: 'mqttTopic', action: 'create', params: option, validations })) as MqttTopic;
};

export const getMqttTopics = async (option: Prisma.MqttTopicFindManyArgs): Promise<MqttTopic[]> => {
  return (await sendPrismaQuery<Prisma.MqttTopicFindManyArgs>({ model: 'mqttTopic', action: 'findMany', params: option })) as MqttTopic[];
};

export const getMqttTopic = async (option: Prisma.MqttTopicFindFirstArgs): Promise<MqttTopic> => {
  return (await sendPrismaQuery<Prisma.MqttTopicFindFirstArgs>({ model: 'mqttTopic', action: 'findFirst', params: option })) as MqttTopic;
};

export const getMqttTopicUnique = async (option: Prisma.MqttTopicFindUniqueArgs): Promise<MqttTopic> => {
  return (await sendPrismaQuery<Prisma.MqttTopicFindUniqueArgs>({ model: 'mqttTopic', action: 'findUnique', params: option })) as MqttTopic;
};

export const updateMqttTopic = async (option: Prisma.MqttTopicUpdateArgs, validations?: ((params: Prisma.MqttTopicUpdateArgs) => Promise<void>)[]): Promise<MqttTopic> => {
  return (await sendPrismaQuery<Prisma.MqttTopicUpdateArgs>({ model: 'mqttTopic', action: 'update', params: option, validations })) as MqttTopic;
};

export const deleteMqttTopic = async (option: Prisma.MqttTopicDeleteArgs): Promise<MqttTopic> => {
  return (await sendPrismaQuery<Prisma.MqttTopicDeleteArgs>({ model: 'mqttTopic', action: 'delete', params: option })) as MqttTopic;
};


export const createMqttPayload = async (option: Prisma.MqttPayloadCreateArgs, validations?: ((params: Prisma.MqttPayloadCreateArgs) => Promise<void>)[]): Promise<MqttPayload> => {
  return (await sendPrismaQuery<Prisma.MqttPayloadCreateArgs>({ model: 'mqttPayload', action: 'create', params: option, validations })) as MqttPayload;
};

export const getMqttPayloads = async (option: Prisma.MqttPayloadFindManyArgs): Promise<MqttPayload[]> => {
  return (await sendPrismaQuery<Prisma.MqttPayloadFindManyArgs>({ model: 'mqttPayload', action: 'findMany', params: option })) as MqttPayload[];
};

export const getMqttPayload = async (option: Prisma.MqttPayloadFindFirstArgs): Promise<MqttPayload> => {
  return (await sendPrismaQuery<Prisma.MqttPayloadFindFirstArgs>({ model: 'mqttPayload', action: 'findFirst', params: option })) as MqttPayload;
};

export const getMqttPayloadUnique = async (option: Prisma.MqttPayloadFindUniqueArgs): Promise<MqttPayload> => {
  return (await sendPrismaQuery<Prisma.MqttPayloadFindUniqueArgs>({ model: 'mqttPayload', action: 'findUnique', params: option })) as MqttPayload;
};

export const updateMqttPayload = async (option: Prisma.MqttPayloadUpdateArgs, validations?: ((params: Prisma.MqttPayloadUpdateArgs) => Promise<void>)[]): Promise<MqttPayload> => {
  return (await sendPrismaQuery<Prisma.MqttPayloadUpdateArgs>({ model: 'mqttPayload', action: 'update', params: option, validations })) as MqttPayload;
};

export const deleteMqttPayload = async (option: Prisma.MqttPayloadDeleteArgs): Promise<MqttPayload> => {
  return (await sendPrismaQuery<Prisma.MqttPayloadDeleteArgs>({ model: 'mqttPayload', action: 'delete', params: option })) as MqttPayload;
};
