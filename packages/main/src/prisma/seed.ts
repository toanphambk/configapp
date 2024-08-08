import {PrismaClient} from '@prisma/client';
import {EthernetPortTypeEnum, SerialPortTypeEnum} from '../enums/PortType.enum';

const prisma = new PrismaClient();

async function seed() {
  const deviceTypes = [
    {
      name: 'Type A',
      description: 'Description for Type A',
      model: 'Model A',
      portInfo: {
        create: [
          {
            portName: 'Ethernet 1',
            portType: EthernetPortTypeEnum.Monitor,
            description: 'Monitor port for monitoring',
          },
          {
            portName: 'Ethernet 2',
            portType: EthernetPortTypeEnum.Communication,
            description: 'Communication port for communication',
          },
          {
            portName: 'Serial 1',
            portType: SerialPortTypeEnum.RS232,
            description: 'Serial port for communication',
          },
          {
            portName: 'Serial 2',
            portType: SerialPortTypeEnum.RS232,
            description: 'Serial port for communication',
          },
        ],
      },
    },
    {
      name: 'Type B',
      description: 'Description for Type B',
      model: 'Model B',
      portInfo: {
        create: [
          {
            portName: 'Ethernet 1',
            portType: EthernetPortTypeEnum.Monitor,
            description: 'Monitor port for monitoring',
          },
          {
            portName: 'Ethernet 2',
            portType: EthernetPortTypeEnum.Communication,
            description: 'Communication port for communication',
          },
          {
            portName: 'Serial 1',
            portType: SerialPortTypeEnum.RS485,
            description: 'Serial port for communication',
          },
        ],
      },
    },
    {
      name: 'Type C',
      description: 'Description for Type C',
      model: 'Model C',
      portInfo: {
        create: [
          {
            portName: 'Ethernet 1',
            portType: EthernetPortTypeEnum.Monitor,
            description: 'Monitor port for monitoring',
          },
          {
            portName: 'Ethernet 2',
            portType: EthernetPortTypeEnum.Communication,
            description: 'Communication port for communication',
          },
          {
            portName: 'Serial 1',
            portType: SerialPortTypeEnum.RS485,
            description: 'Serial port for communication',
          },
        ],
      },
    },
  ];

  for (const deviceType of deviceTypes) {
    await prisma.deviceType.upsert({
      where: {model: deviceType.model},
      update: {},
      create: {
        name: deviceType.name,
        description: deviceType.description,
        model: deviceType.model,
        portInfo: deviceType.portInfo,
      },
    });
  }
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
