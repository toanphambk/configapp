-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deviceTypeId" INTEGER NOT NULL,
    CONSTRAINT "Device_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Device_deviceTypeId_fkey" FOREIGN KEY ("deviceTypeId") REFERENCES "DeviceType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DeviceType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "image" BLOB
);

-- CreateTable
CREATE TABLE "DevicePortInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" BLOB,
    "deviceTypeId" INTEGER NOT NULL,
    "portName" TEXT NOT NULL,
    "portType" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "DevicePortInfo_deviceTypeId_fkey" FOREIGN KEY ("deviceTypeId") REFERENCES "DeviceType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DevicePort" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceId" INTEGER NOT NULL,
    "portName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "portType" INTEGER NOT NULL,
    CONSTRAINT "DevicePort_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Protocol" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "devicePortId" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "tcpPort" INTEGER,
    CONSTRAINT "Protocol_devicePortId_fkey" FOREIGN KEY ("devicePortId") REFERENCES "DevicePort" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SlaveDevice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "protocolId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "deviceAddress" TEXT NOT NULL,
    "description" TEXT,
    "plcModel" INTEGER,
    "scanRate" INTEGER NOT NULL,
    CONSTRAINT "SlaveDevice_protocolId_fkey" FOREIGN KEY ("protocolId") REFERENCES "Protocol" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PortSetting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "devicePortId" INTEGER NOT NULL,
    "ipAddress" TEXT,
    "subnetMask" TEXT,
    "defaultGateway" TEXT,
    "baudRate" INTEGER,
    "dataBits" INTEGER,
    "stopBits" INTEGER,
    "parity" INTEGER,
    "flowControl" INTEGER,
    CONSTRAINT "PortSetting_devicePortId_fkey" FOREIGN KEY ("devicePortId") REFERENCES "DevicePort" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IO" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "slaveDeviceId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "register" INTEGER,
    "startAddress" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "conversion" INTEGER NOT NULL,
    CONSTRAINT "IO_slaveDeviceId_fkey" FOREIGN KEY ("slaveDeviceId") REFERENCES "SlaveDevice" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mqtt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceId" INTEGER NOT NULL,
    "brokerAddress" TEXT,
    "port" INTEGER,
    "clientId" TEXT,
    "username" TEXT,
    "password" TEXT,
    "keepAlive" INTEGER,
    "cleanSession" BOOLEAN,
    "useSSL" BOOLEAN,
    CONSTRAINT "Mqtt_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MqttTopic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mqttId" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "publishInterval" INTEGER NOT NULL,
    CONSTRAINT "MqttTopic_mqttId_fkey" FOREIGN KEY ("mqttId") REFERENCES "Mqtt" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MqttPayload" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mqttTopicId" INTEGER NOT NULL,
    "IOId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "MqttPayload_mqttTopicId_fkey" FOREIGN KEY ("mqttTopicId") REFERENCES "MqttTopic" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MqttPayload_IOId_fkey" FOREIGN KEY ("IOId") REFERENCES "IO" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Device_name_key" ON "Device"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceType_name_key" ON "DeviceType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DeviceType_model_key" ON "DeviceType"("model");

-- CreateIndex
CREATE UNIQUE INDEX "PortSetting_devicePortId_key" ON "PortSetting"("devicePortId");

-- CreateIndex
CREATE UNIQUE INDEX "Mqtt_deviceId_key" ON "Mqtt"("deviceId");
