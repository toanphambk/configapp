import type {PlcModelEnum, PlcRegisterEnum} from '../enums/Plc.enum';
import type {ConversionEnum} from '../enums/Conversion.enum';

export interface SlaveDevice {
  name: string;
  description?: string;
  plcModel: PlcModelEnum;
  scanRate: number; //ms
  IO: HardwareIO[];
}

export interface HardwareIO {
  name: string;
  description?: string;
  register: PlcRegisterEnum;
  startAddress: number;
  length: number;
  conversion: ConversionEnum;
}

export interface SerialSlaveDevice extends SlaveDevice {
  deviceAddress: number; // 1-255
}

export interface EthernetSlaveDevice extends SlaveDevice {
  ipAddress: string; //ip address of slave device
}

// read from regiter -> byte [] -> convert to readble data
