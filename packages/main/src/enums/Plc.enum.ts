export enum MitsuPlcRegisterEnum {
  X = 1,
  Y = 2,
  M = 3,
  D = 4,
  W = 5,
  L = 6,
  R = 7,
  F = 8,
  V = 9,
  B = 10,
  Z = 11,
  ZR = 12,
}
export enum SiemenPlcRegisterEnum {
  I = 21,
  Q = 22,
  M = 23,
  DB = 24,
  T = 25,
  C = 26,
  V = 27,
}

export enum PlcRegisterEnum {
  Mitsubishi_X = MitsuPlcRegisterEnum.X,
  Mitsubishi_Y = MitsuPlcRegisterEnum.Y,
  Mitsubishi_M = MitsuPlcRegisterEnum.M,
  Mitsubishi_D = MitsuPlcRegisterEnum.D,
  Mitsubishi_W = MitsuPlcRegisterEnum.W,
  Mitsubishi_L = MitsuPlcRegisterEnum.L,
  Mitsubishi_R = MitsuPlcRegisterEnum.R,
  Mitsubishi_F = MitsuPlcRegisterEnum.F,
  Mitsubishi_V = MitsuPlcRegisterEnum.V,
  Mitsubishi_B = MitsuPlcRegisterEnum.B,
  Mitsubishi_Z = MitsuPlcRegisterEnum.Z,
  Mitsubishi_ZR = MitsuPlcRegisterEnum.ZR,
  Siemens_I = SiemenPlcRegisterEnum.I,
  Siemens_Q = SiemenPlcRegisterEnum.Q,
  Siemens_M = SiemenPlcRegisterEnum.M,
  Siemens_DB = SiemenPlcRegisterEnum.DB,
  Siemens_T = SiemenPlcRegisterEnum.T,
  Siemens_C = SiemenPlcRegisterEnum.C,
  Siemens_V = SiemenPlcRegisterEnum.V,
}

export enum MitsuPlcModel {
  Fx3 = 1,
  Fx5 = 2,
  Q_CPU = 3,
}

export enum SiemenPLCModel {
  S7_200Smart = 11,
  S7_200 = 12,
  S7_300 = 13,
  S7_400 = 14,
  S7_1200 = 15,
  S7_1500 = 16,
}

export enum PlcModelEnum {
  Fx3 = 1,
  Fx5 = 2,
  Q_CPU = 3,
  S7_200Smart = 11,
  S7_200 = 12,
  S7_300 = 13,
  S7_400 = 14,
  S7_1200 = 15,
  S7_1500 = 16,
}
