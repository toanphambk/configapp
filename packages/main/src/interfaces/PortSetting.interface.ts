import type {
  BaudRateEnum,
  DataBitsEnum,
  StopBitsEnum,
  ParityEnum,
  FlowControlEnum,
} from '../enums/CommunicationSettings.enum';
import type {PortTypeEnum} from '../enums/PortType.enum';

interface PortSetting {
  portType: PortTypeEnum;
}

export interface EthernetPortSetting extends PortSetting {
  ipAddress: string;
  subnetMask: string;
  defaultGateway?: string;
}

export interface SerialPortSetting extends PortSetting {
  baudRate: BaudRateEnum;
  dataBits: DataBitsEnum;
  stopBits: StopBitsEnum;
  parity: ParityEnum;
  flowControl: FlowControlEnum;
}
