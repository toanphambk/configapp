import type {ProtocolEnum} from '../enums/Protocols.enum';
import type {ProtocolConfig} from '../types/ProtocolConfigs.type';
import type {EthernetSlaveDevice, SerialSlaveDevice} from './DevicesAndIO.interface';

interface Protocol {
  type: ProtocolEnum;
  config: ProtocolConfig;
}

export interface EthernetProtocolSetting extends Protocol {
  slaveDevices: EthernetSlaveDevice[];
}

export interface SerialProtocolSetting extends Protocol {
  slaveDevices: SerialSlaveDevice[];
}
