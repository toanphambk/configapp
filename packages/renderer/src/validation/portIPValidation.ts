import { getDevice, getDevicePort, getProtocols, getSlaveDevice } from '#preload';

type PortIpValidationParams = {
  devicePortId?: number;
  ipAddress?: string;
};
/**
 * Checks if the provided device port ID and IP address are not already in use.
 * Throws an error if the port or IP address is already in use.
 *
 * @param param - The parameters for port and IP address validation.
 * @returns Promise<void>
 * @throws Error - If the device port ID or IP addre`ss is not provided, or if the port or IP address is already in use.
 */

export const portIPAdressIsNotInUse = async (param: PortIpValidationParams) => {
  const { devicePortId, ipAddress } = param;
  if (!devicePortId || !ipAddress) {
    throw new Error('Device Port Id or Ip Address not provided');
  }

  const port = await getDevicePort({
    where: { id: devicePortId },
  });
  const device = await getDevice({
    where: { id: port.deviceId },
  });

  const isIpExisted = await getDevicePort({
    where: {
      id: {
        not: port?.id,
      },
      deviceId: device?.id,
      portSetting: {
        ipAddress: ipAddress,
      },
    },
  });

  if (isIpExisted) {
    throw new Error('Port Already In Use By Port: ' + isIpExisted.portName);
  }
  const protocols = await getProtocols({
    where: {
      devicePortId: port.id,
    },
  });

  const isUseBySlave = await getSlaveDevice({
    where: {
      protocolId: {
        in: protocols.map(protocol => protocol.id),
      },
      deviceAddress: ipAddress.toString(),
    },
  });
  if (isUseBySlave) {
    throw new Error('Port Already In Use By Slave Device: ' + isUseBySlave.name);
  }
};

export const IpNotInUseByDevicePort = async (param: PortIpValidationParams) => {
  const { devicePortId, ipAddress } = param;

  if (!devicePortId || !ipAddress) {
    throw new Error('Device Port Id or Ip Address not provided');
  }

  const devicePort = await getDevicePort({ where: { id: devicePortId } });

  const isIpExisted = await getDevicePort({
    where: {
      id: {
        not: devicePortId,
      },
      deviceId: devicePort.deviceId,
      portSetting: {
        ipAddress: ipAddress,
      },
    },
  });

  if (isIpExisted) {
    throw new Error('Ip Address Already In Use');
  }
};

export const IpNotInUseBySlaveDevice = async (param: PortIpValidationParams) => {
  const { devicePortId, ipAddress } = param;

  if (!devicePortId || !ipAddress) {
    throw new Error('Device Port Id or Ip Address not provided');
  }

  const slaveDevice = await getSlaveDevice({
    where: {
      deviceAddress: ipAddress,
    },
  });

  if (slaveDevice) {
    throw new Error('Ip Address Already In Use By Slave Device');
  }
};
