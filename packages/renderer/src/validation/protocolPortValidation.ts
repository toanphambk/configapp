import {getProtocol} from '#preload';
import {useAppSelector} from '../redux/hooks';

export type EthernetPortValidationParams = {
  devicePortId?: number;
  tcpPort?: number;
};

export const ethernetPortISNotInUse = async (params: EthernetPortValidationParams) => {
  const {devicePortId, tcpPort} = params;
  if (!devicePortId || !tcpPort) {
    throw new Error('Device Port Id or TCP Port not provided');
  }
  const isIpExisted = await getProtocol({
    where: {
      devicePortId,
      tcpPort,
    },
  });
  if (isIpExisted) {
    throw new Error('Port Already In Use');
  }
};

export const serialProtocolIsNotExisted = async () => {
  const {selectedDevicePort} = useAppSelector(state => state.appSlice);
  const isSerialPortExisted = await getProtocol({
    where: {
      devicePortId: selectedDevicePort?.id,
    },
  });
  if (isSerialPortExisted) {
    throw new Error('Serial Port Already Configured');
  }
};
