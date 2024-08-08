export enum SerialPortTypeEnum {
  RS232 = 1,
  RS422 = 2,
  RS485 = 3,
}

export enum EthernetPortTypeEnum {
  Monitor = 11, //use for monitoring only
  Communication = 12, // use for communication
}

export enum PortTypeEnum {
  RS232 = SerialPortTypeEnum.RS232,
  RS422 = SerialPortTypeEnum.RS422,
  RS485 = SerialPortTypeEnum.RS485,
  Monitor = EthernetPortTypeEnum.Monitor,
  Communication = EthernetPortTypeEnum.Communication,
}
