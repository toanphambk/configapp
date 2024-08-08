interface MCProtocolConfig {
  ascii: boolean;
}

interface ModbusConfig {}

interface S7Protocolconfig {}

export type ProtocolConfig = ModbusConfig | MCProtocolConfig | S7Protocolconfig;
