import type {HardwareIO, SlaveDevice} from './DevicesAndIO.interface';

export interface MqttBrokerConfig {
  brokerAddress: string;
  port: number;
  clientId: string;
  username: string;
  password: string;
  keepAlive: number;
  cleanSession: boolean;
  useSSL: boolean;
}

export interface PayloadData {
  key: string;
  type: string | number;
  device: SlaveDevice['name'];
  ioName: HardwareIO['name'];
}

export interface TopicConfig {
  topic: string;
  publishInterval: number;
  payload: PayloadData[];
}

export interface MqttConfiguration {
  mqttConfig: MqttBrokerConfig;
  topics: TopicConfig[];
}
