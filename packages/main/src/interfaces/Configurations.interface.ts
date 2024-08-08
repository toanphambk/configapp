import type {MqttConfiguration} from './MqttConfig.interface';
import type {EthernetPortSetting, SerialPortSetting} from './PortSetting.interface';
import type {EthernetProtocolSetting, SerialProtocolSetting} from './Protocol.interface';

export interface IIoTDeviceConfig {
  serialPorts: SerialPortConfig[];
  ethernetPorts: EthernetPortConfig[];
  mqtt: MqttConfiguration;
}

export interface EthernetPortConfig {
  portSettings: EthernetPortSetting;
  protocol: EthernetProtocolSetting[];
}

export interface SerialPortConfig {
  portSettings: SerialPortSetting;
  protocol: SerialProtocolSetting;
}
