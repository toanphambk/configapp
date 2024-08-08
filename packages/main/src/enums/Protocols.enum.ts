export enum SerialProtocolEnum {
  ModbusRTU = 1,
  MCProtocol = 2,
}

export enum EthernetProtocolEnum {
  ModbusTCP = 11,
  S7Protocol = 12,
  MCProtocol = 13,
}

export enum ProtocolEnum {
  ModbusRTU = SerialProtocolEnum.ModbusRTU,
  MCProtocolSerial = SerialProtocolEnum.MCProtocol,
  MCProtocolEthernet = EthernetProtocolEnum.MCProtocol,
  ModbusTCP = EthernetProtocolEnum.ModbusTCP,
  S7Protocol = EthernetProtocolEnum.S7Protocol,
}
