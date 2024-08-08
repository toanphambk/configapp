export enum BaudRateEnum {
  B9600 = 9600,
  B19200 = 19200,
  B38400 = 38400,
  B57600 = 57600,
  B115200 = 115200,
}

export enum DataBitsEnum {
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
}

export enum StopBitsEnum {
  One = 1,
  Two = 2,
}

export enum ParityEnum {
  None = 1,
  Even = 2,
  Odd = 3,
  Mark = 4,
  Space = 5,
}

export enum FlowControlEnum {
  None = 1,
  Hardware = 2,
  Software = 3,
}
