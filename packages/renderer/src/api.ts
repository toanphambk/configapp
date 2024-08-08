
import type { Prisma, Project, Device, DeviceType, DevicePortInfo, DevicePort, Protocol, SlaveDevice, PortSetting, IO, Mqtt, MqttTopic, MqttPayload } from '@prisma/client';
import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import * as preload from '#preload';

export const useCreateProject = (
  mutationOptions?: Partial<UseMutationOptions<Project, Error, Prisma.ProjectCreateArgs>>,
  validations?: ((params: Prisma.ProjectCreateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.ProjectCreateArgs) =>
      preload.createProject(option, validations) as unknown as Promise<Project>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
    ...mutationOptions,
  });
};

export const useGetProjects = (
  option: Prisma.ProjectFindManyArgs, 
  queryOptions?: Partial<UseQueryOptions<Project[], Error>>
) => {
  return useQuery({
    queryKey: ['project', option],
    queryFn: () => preload.getProjects(option),
    ...queryOptions,
  });
};

export const useGetProject = (
  option: Prisma.ProjectFindFirstArgs, 
  queryOptions?: Partial<UseQueryOptions<Project, Error>>
) => {
  return useQuery({
    queryKey: ['project', option],
    queryFn: () => preload.getProject(option),
    ...queryOptions,
  });
};

export const useGetProjectUnique = (
  option: Prisma.ProjectFindUniqueArgs, 
  queryOptions?: Partial<UseQueryOptions<Project, Error>>
) => {
  return useQuery({
    queryKey: ['projectUnique', option],
    queryFn: () => preload.getProjectUnique(option),
    ...queryOptions,
  });
};

export const useUpdateProject = (
  mutationOptions?: Partial<UseMutationOptions<Project, Error, Prisma.ProjectUpdateArgs>>,
  validations?: ((params: Prisma.ProjectUpdateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.ProjectUpdateArgs) =>
      preload.updateProject(option, validations) as unknown as Promise<Project>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
    ...mutationOptions,
  });
};

export const useDeleteProject = (
  mutationOptions?: Partial<UseMutationOptions<Project, Error, Prisma.ProjectDeleteArgs>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.ProjectDeleteArgs) =>
      preload.deleteProject(option) as unknown as Promise<Project>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
    ...mutationOptions,
  });
};


export const useCreateDevice = (
  mutationOptions?: Partial<UseMutationOptions<Device, Error, Prisma.DeviceCreateArgs>>,
  validations?: ((params: Prisma.DeviceCreateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.DeviceCreateArgs) =>
      preload.createDevice(option, validations) as unknown as Promise<Device>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['device'] });
    },
    ...mutationOptions,
  });
};

export const useGetDevices = (
  option: Prisma.DeviceFindManyArgs, 
  queryOptions?: Partial<UseQueryOptions<Device[], Error>>
) => {
  return useQuery({
    queryKey: ['device', option],
    queryFn: () => preload.getDevices(option),
    ...queryOptions,
  });
};

export const useGetDevice = (
  option: Prisma.DeviceFindFirstArgs, 
  queryOptions?: Partial<UseQueryOptions<Device, Error>>
) => {
  return useQuery({
    queryKey: ['device', option],
    queryFn: () => preload.getDevice(option),
    ...queryOptions,
  });
};

export const useGetDeviceUnique = (
  option: Prisma.DeviceFindUniqueArgs, 
  queryOptions?: Partial<UseQueryOptions<Device, Error>>
) => {
  return useQuery({
    queryKey: ['deviceUnique', option],
    queryFn: () => preload.getDeviceUnique(option),
    ...queryOptions,
  });
};

export const useUpdateDevice = (
  mutationOptions?: Partial<UseMutationOptions<Device, Error, Prisma.DeviceUpdateArgs>>,
  validations?: ((params: Prisma.DeviceUpdateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.DeviceUpdateArgs) =>
      preload.updateDevice(option, validations) as unknown as Promise<Device>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['device'] });
    },
    ...mutationOptions,
  });
};

export const useDeleteDevice = (
  mutationOptions?: Partial<UseMutationOptions<Device, Error, Prisma.DeviceDeleteArgs>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.DeviceDeleteArgs) =>
      preload.deleteDevice(option) as unknown as Promise<Device>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['device'] });
    },
    ...mutationOptions,
  });
};


export const useCreateDeviceType = (
  mutationOptions?: Partial<UseMutationOptions<DeviceType, Error, Prisma.DeviceTypeCreateArgs>>,
  validations?: ((params: Prisma.DeviceTypeCreateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.DeviceTypeCreateArgs) =>
      preload.createDeviceType(option, validations) as unknown as Promise<DeviceType>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deviceType'] });
    },
    ...mutationOptions,
  });
};

export const useGetDeviceTypes = (
  option: Prisma.DeviceTypeFindManyArgs, 
  queryOptions?: Partial<UseQueryOptions<DeviceType[], Error>>
) => {
  return useQuery({
    queryKey: ['deviceType', option],
    queryFn: () => preload.getDeviceTypes(option),
    ...queryOptions,
  });
};

export const useGetDeviceType = (
  option: Prisma.DeviceTypeFindFirstArgs, 
  queryOptions?: Partial<UseQueryOptions<DeviceType, Error>>
) => {
  return useQuery({
    queryKey: ['deviceType', option],
    queryFn: () => preload.getDeviceType(option),
    ...queryOptions,
  });
};

export const useGetDeviceTypeUnique = (
  option: Prisma.DeviceTypeFindUniqueArgs, 
  queryOptions?: Partial<UseQueryOptions<DeviceType, Error>>
) => {
  return useQuery({
    queryKey: ['deviceTypeUnique', option],
    queryFn: () => preload.getDeviceTypeUnique(option),
    ...queryOptions,
  });
};

export const useUpdateDeviceType = (
  mutationOptions?: Partial<UseMutationOptions<DeviceType, Error, Prisma.DeviceTypeUpdateArgs>>,
  validations?: ((params: Prisma.DeviceTypeUpdateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.DeviceTypeUpdateArgs) =>
      preload.updateDeviceType(option, validations) as unknown as Promise<DeviceType>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deviceType'] });
    },
    ...mutationOptions,
  });
};

export const useDeleteDeviceType = (
  mutationOptions?: Partial<UseMutationOptions<DeviceType, Error, Prisma.DeviceTypeDeleteArgs>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.DeviceTypeDeleteArgs) =>
      preload.deleteDeviceType(option) as unknown as Promise<DeviceType>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deviceType'] });
    },
    ...mutationOptions,
  });
};


export const useCreateDevicePortInfo = (
  mutationOptions?: Partial<UseMutationOptions<DevicePortInfo, Error, Prisma.DevicePortInfoCreateArgs>>,
  validations?: ((params: Prisma.DevicePortInfoCreateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.DevicePortInfoCreateArgs) =>
      preload.createDevicePortInfo(option, validations) as unknown as Promise<DevicePortInfo>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devicePortInfo'] });
    },
    ...mutationOptions,
  });
};

export const useGetDevicePortInfos = (
  option: Prisma.DevicePortInfoFindManyArgs, 
  queryOptions?: Partial<UseQueryOptions<DevicePortInfo[], Error>>
) => {
  return useQuery({
    queryKey: ['devicePortInfo', option],
    queryFn: () => preload.getDevicePortInfos(option),
    ...queryOptions,
  });
};

export const useGetDevicePortInfo = (
  option: Prisma.DevicePortInfoFindFirstArgs, 
  queryOptions?: Partial<UseQueryOptions<DevicePortInfo, Error>>
) => {
  return useQuery({
    queryKey: ['devicePortInfo', option],
    queryFn: () => preload.getDevicePortInfo(option),
    ...queryOptions,
  });
};

export const useGetDevicePortInfoUnique = (
  option: Prisma.DevicePortInfoFindUniqueArgs, 
  queryOptions?: Partial<UseQueryOptions<DevicePortInfo, Error>>
) => {
  return useQuery({
    queryKey: ['devicePortInfoUnique', option],
    queryFn: () => preload.getDevicePortInfoUnique(option),
    ...queryOptions,
  });
};

export const useUpdateDevicePortInfo = (
  mutationOptions?: Partial<UseMutationOptions<DevicePortInfo, Error, Prisma.DevicePortInfoUpdateArgs>>,
  validations?: ((params: Prisma.DevicePortInfoUpdateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.DevicePortInfoUpdateArgs) =>
      preload.updateDevicePortInfo(option, validations) as unknown as Promise<DevicePortInfo>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devicePortInfo'] });
    },
    ...mutationOptions,
  });
};

export const useDeleteDevicePortInfo = (
  mutationOptions?: Partial<UseMutationOptions<DevicePortInfo, Error, Prisma.DevicePortInfoDeleteArgs>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.DevicePortInfoDeleteArgs) =>
      preload.deleteDevicePortInfo(option) as unknown as Promise<DevicePortInfo>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devicePortInfo'] });
    },
    ...mutationOptions,
  });
};


export const useCreateDevicePort = (
  mutationOptions?: Partial<UseMutationOptions<DevicePort, Error, Prisma.DevicePortCreateArgs>>,
  validations?: ((params: Prisma.DevicePortCreateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.DevicePortCreateArgs) =>
      preload.createDevicePort(option, validations) as unknown as Promise<DevicePort>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devicePort'] });
    },
    ...mutationOptions,
  });
};

export const useGetDevicePorts = (
  option: Prisma.DevicePortFindManyArgs, 
  queryOptions?: Partial<UseQueryOptions<DevicePort[], Error>>
) => {
  return useQuery({
    queryKey: ['devicePort', option],
    queryFn: () => preload.getDevicePorts(option),
    ...queryOptions,
  });
};

export const useGetDevicePort = (
  option: Prisma.DevicePortFindFirstArgs, 
  queryOptions?: Partial<UseQueryOptions<DevicePort, Error>>
) => {
  return useQuery({
    queryKey: ['devicePort', option],
    queryFn: () => preload.getDevicePort(option),
    ...queryOptions,
  });
};

export const useGetDevicePortUnique = (
  option: Prisma.DevicePortFindUniqueArgs, 
  queryOptions?: Partial<UseQueryOptions<DevicePort, Error>>
) => {
  return useQuery({
    queryKey: ['devicePortUnique', option],
    queryFn: () => preload.getDevicePortUnique(option),
    ...queryOptions,
  });
};

export const useUpdateDevicePort = (
  mutationOptions?: Partial<UseMutationOptions<DevicePort, Error, Prisma.DevicePortUpdateArgs>>,
  validations?: ((params: Prisma.DevicePortUpdateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.DevicePortUpdateArgs) =>
      preload.updateDevicePort(option, validations) as unknown as Promise<DevicePort>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devicePort'] });
    },
    ...mutationOptions,
  });
};

export const useDeleteDevicePort = (
  mutationOptions?: Partial<UseMutationOptions<DevicePort, Error, Prisma.DevicePortDeleteArgs>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.DevicePortDeleteArgs) =>
      preload.deleteDevicePort(option) as unknown as Promise<DevicePort>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devicePort'] });
    },
    ...mutationOptions,
  });
};


export const useCreateProtocol = (
  mutationOptions?: Partial<UseMutationOptions<Protocol, Error, Prisma.ProtocolCreateArgs>>,
  validations?: ((params: Prisma.ProtocolCreateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.ProtocolCreateArgs) =>
      preload.createProtocol(option, validations) as unknown as Promise<Protocol>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['protocol'] });
    },
    ...mutationOptions,
  });
};

export const useGetProtocols = (
  option: Prisma.ProtocolFindManyArgs, 
  queryOptions?: Partial<UseQueryOptions<Protocol[], Error>>
) => {
  return useQuery({
    queryKey: ['protocol', option],
    queryFn: () => preload.getProtocols(option),
    ...queryOptions,
  });
};

export const useGetProtocol = (
  option: Prisma.ProtocolFindFirstArgs, 
  queryOptions?: Partial<UseQueryOptions<Protocol, Error>>
) => {
  return useQuery({
    queryKey: ['protocol', option],
    queryFn: () => preload.getProtocol(option),
    ...queryOptions,
  });
};

export const useGetProtocolUnique = (
  option: Prisma.ProtocolFindUniqueArgs, 
  queryOptions?: Partial<UseQueryOptions<Protocol, Error>>
) => {
  return useQuery({
    queryKey: ['protocolUnique', option],
    queryFn: () => preload.getProtocolUnique(option),
    ...queryOptions,
  });
};

export const useUpdateProtocol = (
  mutationOptions?: Partial<UseMutationOptions<Protocol, Error, Prisma.ProtocolUpdateArgs>>,
  validations?: ((params: Prisma.ProtocolUpdateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.ProtocolUpdateArgs) =>
      preload.updateProtocol(option, validations) as unknown as Promise<Protocol>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['protocol'] });
    },
    ...mutationOptions,
  });
};

export const useDeleteProtocol = (
  mutationOptions?: Partial<UseMutationOptions<Protocol, Error, Prisma.ProtocolDeleteArgs>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.ProtocolDeleteArgs) =>
      preload.deleteProtocol(option) as unknown as Promise<Protocol>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['protocol'] });
    },
    ...mutationOptions,
  });
};


export const useCreateSlaveDevice = (
  mutationOptions?: Partial<UseMutationOptions<SlaveDevice, Error, Prisma.SlaveDeviceCreateArgs>>,
  validations?: ((params: Prisma.SlaveDeviceCreateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.SlaveDeviceCreateArgs) =>
      preload.createSlaveDevice(option, validations) as unknown as Promise<SlaveDevice>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slaveDevice'] });
    },
    ...mutationOptions,
  });
};

export const useGetSlaveDevices = (
  option: Prisma.SlaveDeviceFindManyArgs, 
  queryOptions?: Partial<UseQueryOptions<SlaveDevice[], Error>>
) => {
  return useQuery({
    queryKey: ['slaveDevice', option],
    queryFn: () => preload.getSlaveDevices(option),
    ...queryOptions,
  });
};

export const useGetSlaveDevice = (
  option: Prisma.SlaveDeviceFindFirstArgs, 
  queryOptions?: Partial<UseQueryOptions<SlaveDevice, Error>>
) => {
  return useQuery({
    queryKey: ['slaveDevice', option],
    queryFn: () => preload.getSlaveDevice(option),
    ...queryOptions,
  });
};

export const useGetSlaveDeviceUnique = (
  option: Prisma.SlaveDeviceFindUniqueArgs, 
  queryOptions?: Partial<UseQueryOptions<SlaveDevice, Error>>
) => {
  return useQuery({
    queryKey: ['slaveDeviceUnique', option],
    queryFn: () => preload.getSlaveDeviceUnique(option),
    ...queryOptions,
  });
};

export const useUpdateSlaveDevice = (
  mutationOptions?: Partial<UseMutationOptions<SlaveDevice, Error, Prisma.SlaveDeviceUpdateArgs>>,
  validations?: ((params: Prisma.SlaveDeviceUpdateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.SlaveDeviceUpdateArgs) =>
      preload.updateSlaveDevice(option, validations) as unknown as Promise<SlaveDevice>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slaveDevice'] });
    },
    ...mutationOptions,
  });
};

export const useDeleteSlaveDevice = (
  mutationOptions?: Partial<UseMutationOptions<SlaveDevice, Error, Prisma.SlaveDeviceDeleteArgs>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.SlaveDeviceDeleteArgs) =>
      preload.deleteSlaveDevice(option) as unknown as Promise<SlaveDevice>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slaveDevice'] });
    },
    ...mutationOptions,
  });
};


export const useCreatePortSetting = (
  mutationOptions?: Partial<UseMutationOptions<PortSetting, Error, Prisma.PortSettingCreateArgs>>,
  validations?: ((params: Prisma.PortSettingCreateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.PortSettingCreateArgs) =>
      preload.createPortSetting(option, validations) as unknown as Promise<PortSetting>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portSetting'] });
    },
    ...mutationOptions,
  });
};

export const useGetPortSettings = (
  option: Prisma.PortSettingFindManyArgs, 
  queryOptions?: Partial<UseQueryOptions<PortSetting[], Error>>
) => {
  return useQuery({
    queryKey: ['portSetting', option],
    queryFn: () => preload.getPortSettings(option),
    ...queryOptions,
  });
};

export const useGetPortSetting = (
  option: Prisma.PortSettingFindFirstArgs, 
  queryOptions?: Partial<UseQueryOptions<PortSetting, Error>>
) => {
  return useQuery({
    queryKey: ['portSetting', option],
    queryFn: () => preload.getPortSetting(option),
    ...queryOptions,
  });
};

export const useGetPortSettingUnique = (
  option: Prisma.PortSettingFindUniqueArgs, 
  queryOptions?: Partial<UseQueryOptions<PortSetting, Error>>
) => {
  return useQuery({
    queryKey: ['portSettingUnique', option],
    queryFn: () => preload.getPortSettingUnique(option),
    ...queryOptions,
  });
};

export const useUpdatePortSetting = (
  mutationOptions?: Partial<UseMutationOptions<PortSetting, Error, Prisma.PortSettingUpdateArgs>>,
  validations?: ((params: Prisma.PortSettingUpdateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.PortSettingUpdateArgs) =>
      preload.updatePortSetting(option, validations) as unknown as Promise<PortSetting>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portSetting'] });
    },
    ...mutationOptions,
  });
};

export const useDeletePortSetting = (
  mutationOptions?: Partial<UseMutationOptions<PortSetting, Error, Prisma.PortSettingDeleteArgs>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.PortSettingDeleteArgs) =>
      preload.deletePortSetting(option) as unknown as Promise<PortSetting>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portSetting'] });
    },
    ...mutationOptions,
  });
};


export const useCreateIO = (
  mutationOptions?: Partial<UseMutationOptions<IO, Error, Prisma.IOCreateArgs>>,
  validations?: ((params: Prisma.IOCreateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.IOCreateArgs) =>
      preload.createIO(option, validations) as unknown as Promise<IO>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['iO'] });
    },
    ...mutationOptions,
  });
};

export const useGetIOs = (
  option: Prisma.IOFindManyArgs, 
  queryOptions?: Partial<UseQueryOptions<IO[], Error>>
) => {
  return useQuery({
    queryKey: ['iO', option],
    queryFn: () => preload.getIOs(option),
    ...queryOptions,
  });
};

export const useGetIO = (
  option: Prisma.IOFindFirstArgs, 
  queryOptions?: Partial<UseQueryOptions<IO, Error>>
) => {
  return useQuery({
    queryKey: ['iO', option],
    queryFn: () => preload.getIO(option),
    ...queryOptions,
  });
};

export const useGetIOUnique = (
  option: Prisma.IOFindUniqueArgs, 
  queryOptions?: Partial<UseQueryOptions<IO, Error>>
) => {
  return useQuery({
    queryKey: ['iOUnique', option],
    queryFn: () => preload.getIOUnique(option),
    ...queryOptions,
  });
};

export const useUpdateIO = (
  mutationOptions?: Partial<UseMutationOptions<IO, Error, Prisma.IOUpdateArgs>>,
  validations?: ((params: Prisma.IOUpdateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.IOUpdateArgs) =>
      preload.updateIO(option, validations) as unknown as Promise<IO>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['iO'] });
    },
    ...mutationOptions,
  });
};

export const useDeleteIO = (
  mutationOptions?: Partial<UseMutationOptions<IO, Error, Prisma.IODeleteArgs>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.IODeleteArgs) =>
      preload.deleteIO(option) as unknown as Promise<IO>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['iO'] });
    },
    ...mutationOptions,
  });
};


export const useCreateMqtt = (
  mutationOptions?: Partial<UseMutationOptions<Mqtt, Error, Prisma.MqttCreateArgs>>,
  validations?: ((params: Prisma.MqttCreateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.MqttCreateArgs) =>
      preload.createMqtt(option, validations) as unknown as Promise<Mqtt>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mqtt'] });
    },
    ...mutationOptions,
  });
};

export const useGetMqtts = (
  option: Prisma.MqttFindManyArgs, 
  queryOptions?: Partial<UseQueryOptions<Mqtt[], Error>>
) => {
  return useQuery({
    queryKey: ['mqtt', option],
    queryFn: () => preload.getMqtts(option),
    ...queryOptions,
  });
};

export const useGetMqtt = (
  option: Prisma.MqttFindFirstArgs, 
  queryOptions?: Partial<UseQueryOptions<Mqtt, Error>>
) => {
  return useQuery({
    queryKey: ['mqtt', option],
    queryFn: () => preload.getMqtt(option),
    ...queryOptions,
  });
};

export const useGetMqttUnique = (
  option: Prisma.MqttFindUniqueArgs, 
  queryOptions?: Partial<UseQueryOptions<Mqtt, Error>>
) => {
  return useQuery({
    queryKey: ['mqttUnique', option],
    queryFn: () => preload.getMqttUnique(option),
    ...queryOptions,
  });
};

export const useUpdateMqtt = (
  mutationOptions?: Partial<UseMutationOptions<Mqtt, Error, Prisma.MqttUpdateArgs>>,
  validations?: ((params: Prisma.MqttUpdateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.MqttUpdateArgs) =>
      preload.updateMqtt(option, validations) as unknown as Promise<Mqtt>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mqtt'] });
    },
    ...mutationOptions,
  });
};

export const useDeleteMqtt = (
  mutationOptions?: Partial<UseMutationOptions<Mqtt, Error, Prisma.MqttDeleteArgs>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.MqttDeleteArgs) =>
      preload.deleteMqtt(option) as unknown as Promise<Mqtt>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mqtt'] });
    },
    ...mutationOptions,
  });
};


export const useCreateMqttTopic = (
  mutationOptions?: Partial<UseMutationOptions<MqttTopic, Error, Prisma.MqttTopicCreateArgs>>,
  validations?: ((params: Prisma.MqttTopicCreateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.MqttTopicCreateArgs) =>
      preload.createMqttTopic(option, validations) as unknown as Promise<MqttTopic>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mqttTopic'] });
    },
    ...mutationOptions,
  });
};

export const useGetMqttTopics = (
  option: Prisma.MqttTopicFindManyArgs, 
  queryOptions?: Partial<UseQueryOptions<MqttTopic[], Error>>
) => {
  return useQuery({
    queryKey: ['mqttTopic', option],
    queryFn: () => preload.getMqttTopics(option),
    ...queryOptions,
  });
};

export const useGetMqttTopic = (
  option: Prisma.MqttTopicFindFirstArgs, 
  queryOptions?: Partial<UseQueryOptions<MqttTopic, Error>>
) => {
  return useQuery({
    queryKey: ['mqttTopic', option],
    queryFn: () => preload.getMqttTopic(option),
    ...queryOptions,
  });
};

export const useGetMqttTopicUnique = (
  option: Prisma.MqttTopicFindUniqueArgs, 
  queryOptions?: Partial<UseQueryOptions<MqttTopic, Error>>
) => {
  return useQuery({
    queryKey: ['mqttTopicUnique', option],
    queryFn: () => preload.getMqttTopicUnique(option),
    ...queryOptions,
  });
};

export const useUpdateMqttTopic = (
  mutationOptions?: Partial<UseMutationOptions<MqttTopic, Error, Prisma.MqttTopicUpdateArgs>>,
  validations?: ((params: Prisma.MqttTopicUpdateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.MqttTopicUpdateArgs) =>
      preload.updateMqttTopic(option, validations) as unknown as Promise<MqttTopic>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mqttTopic'] });
    },
    ...mutationOptions,
  });
};

export const useDeleteMqttTopic = (
  mutationOptions?: Partial<UseMutationOptions<MqttTopic, Error, Prisma.MqttTopicDeleteArgs>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.MqttTopicDeleteArgs) =>
      preload.deleteMqttTopic(option) as unknown as Promise<MqttTopic>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mqttTopic'] });
    },
    ...mutationOptions,
  });
};


export const useCreateMqttPayload = (
  mutationOptions?: Partial<UseMutationOptions<MqttPayload, Error, Prisma.MqttPayloadCreateArgs>>,
  validations?: ((params: Prisma.MqttPayloadCreateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.MqttPayloadCreateArgs) =>
      preload.createMqttPayload(option, validations) as unknown as Promise<MqttPayload>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mqttPayload'] });
    },
    ...mutationOptions,
  });
};

export const useGetMqttPayloads = (
  option: Prisma.MqttPayloadFindManyArgs, 
  queryOptions?: Partial<UseQueryOptions<MqttPayload[], Error>>
) => {
  return useQuery({
    queryKey: ['mqttPayload', option],
    queryFn: () => preload.getMqttPayloads(option),
    ...queryOptions,
  });
};

export const useGetMqttPayload = (
  option: Prisma.MqttPayloadFindFirstArgs, 
  queryOptions?: Partial<UseQueryOptions<MqttPayload, Error>>
) => {
  return useQuery({
    queryKey: ['mqttPayload', option],
    queryFn: () => preload.getMqttPayload(option),
    ...queryOptions,
  });
};

export const useGetMqttPayloadUnique = (
  option: Prisma.MqttPayloadFindUniqueArgs, 
  queryOptions?: Partial<UseQueryOptions<MqttPayload, Error>>
) => {
  return useQuery({
    queryKey: ['mqttPayloadUnique', option],
    queryFn: () => preload.getMqttPayloadUnique(option),
    ...queryOptions,
  });
};

export const useUpdateMqttPayload = (
  mutationOptions?: Partial<UseMutationOptions<MqttPayload, Error, Prisma.MqttPayloadUpdateArgs>>,
  validations?: ((params: Prisma.MqttPayloadUpdateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.MqttPayloadUpdateArgs) =>
      preload.updateMqttPayload(option, validations) as unknown as Promise<MqttPayload>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mqttPayload'] });
    },
    ...mutationOptions,
  });
};

export const useDeleteMqttPayload = (
  mutationOptions?: Partial<UseMutationOptions<MqttPayload, Error, Prisma.MqttPayloadDeleteArgs>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.MqttPayloadDeleteArgs) =>
      preload.deleteMqttPayload(option) as unknown as Promise<MqttPayload>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mqttPayload'] });
    },
    ...mutationOptions,
  });
};
