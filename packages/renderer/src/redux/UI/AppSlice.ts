import type {Project} from '.prisma/client';
import type {Device, DevicePort, Protocol, SlaveDevice} from '@prisma/client';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface AppState {
  selectedProject: Project;
  selectedDevice: Device;
  selectedDevicePort: DevicePort;
  selectedProtocol: Protocol;
  selectedSlaveDevice: SlaveDevice;
}

const initialState: AppState = {} as AppState;

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedProject: (state, action: PayloadAction<Project>) => {
      if (action.payload.id !== state.selectedProject?.id) {
        state.selectedProject = action.payload;
        state.selectedDevice = initialState.selectedDevice;
      }
    },
    setSelectedDevice: (state, action: PayloadAction<Device>) => {
      if (action.payload.id !== state.selectedDevice?.id) {
        state.selectedDevice = action.payload;
        state.selectedDevicePort = initialState.selectedDevicePort;
      }
    },
    setSelectedDevicePort: (state, action: PayloadAction<DevicePort>) => {
      if (action.payload.id !== state.selectedDevicePort?.id) {
        state.selectedDevicePort = action.payload;
        state.selectedProtocol = initialState.selectedProtocol;
      }
    },
    setSelectedProtocol: (state, action: PayloadAction<Protocol>) => {
      state.selectedProtocol = action.payload;
      state.selectedSlaveDevice = initialState.selectedSlaveDevice;
    },
    setSelectedSlaveDevice: (state, action: PayloadAction<SlaveDevice>) => {
      state.selectedSlaveDevice = action.payload;
    },
  },
});

export const {
  setSelectedProject,
  setSelectedDevice,
  setSelectedDevicePort,
  setSelectedProtocol,
  setSelectedSlaveDevice,
} = appSlice.actions;
export default appSlice.reducer;
