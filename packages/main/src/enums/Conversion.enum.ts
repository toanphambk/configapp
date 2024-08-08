export enum ConversionEnum {
  /** 16-bit unsigned integer, Big Endian (byte order: AB) */
  UInt16BigEndian = 1,
  /** 16-bit unsigned integer, Little Endian (byte order: BA) */
  UInt16LittleEndian = 2,
  /** 16-bit signed integer, Big Endian (byte order: AB) */
  Int16BigEndian = 3,
  /** 16-bit signed integer, Little Endian (byte order: BA) */
  Int16LittleEndian = 4,
  /** 32-bit floating point, Big Endian (byte order: ABCD) */
  FloatBigEndian = 5,
  /** 32-bit floating point, Little Endian (byte order: CDAB) */
  FloatLittleEndian = 6,
  /** 32-bit floating point, Big Endian with byte swap (byte order: BADC) */
  FloatBigEndianByteSwap = 7,
  /** 32-bit floating point, Little Endian with byte swap (byte order: DCBA) */
  FloatLittleEndianByteSwap = 8,
  /** 32-bit signed integer, Big Endian (byte order: ABCD) */
  Int32BigEndian = 9,
  /** 32-bit signed integer, Little Endian (byte order: CDAB) */
  Int32LittleEndian = 10,
  /** 32-bit signed integer, Big Endian with byte swap (byte order: BADC) */
  Int32BigEndianByteSwap = 11,
  /** 32-bit signed integer, Little Endian with byte swap (byte order: DCBA) */
  Int32LittleEndianByteSwap = 12,
  /** 32-bit unsigned integer, Big Endian (byte order: ABCD) */
  UInt32BigEndian = 13,
  /** 32-bit unsigned integer, Little Endian (byte order: CDAB) */
  UInt32LittleEndian = 14,
  /** 32-bit unsigned integer, Big Endian with byte swap (byte order: BADC) */
  UInt32BigEndianByteSwap = 15,
  /** 32-bit unsigned integer, Little Endian with byte swap (byte order: DCBA) */
  UInt32LittleEndianByteSwap = 16,
}
