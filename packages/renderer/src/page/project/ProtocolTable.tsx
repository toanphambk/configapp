import type React from 'react';
import {useAppSelector} from '/@/redux/hooks';
import {EthernetPortTypeEnum, SerialPortTypeEnum} from '../../../../main/src/enums/PortType.enum';
import EthernetProtocolTable from './EthernetProtocolTable';
import SerialProtocolTable from './SerialProtocolTable';

const ProtocolTable: React.FC = () => {
  const {selectedDevicePort} = useAppSelector(state => state.appSlice);
  if (selectedDevicePort?.portType in EthernetPortTypeEnum) {
    return <EthernetProtocolTable />;
  }
  if (selectedDevicePort?.portType in SerialPortTypeEnum) {
    return <SerialProtocolTable />;
  }
  return null;
};

export default ProtocolTable;
