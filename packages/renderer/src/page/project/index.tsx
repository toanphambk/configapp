import DeviceCard from './DeviceCard';
import ProjectCard from './ProjectCard';
import ConfigCard from './ConfigCard';
import MqttCard from './MqttCard';
import PortSettingCard from './PortSettingCard';
import SlaveDeviceTable from './SlaveDeviceTable';
import SlaveIOTable from './SlaveIOTable';
import ProtocolTable from './ProtocolTable';

const ProjectPage: React.FC = () => {
  return (
    <>
      <ProjectCard />
      <DeviceCard />
      <ConfigCard />
      <MqttCard />
      <PortSettingCard />
      <ProtocolTable />
      <SlaveDeviceTable />
      <SlaveIOTable />
    </>
  );
};

export default ProjectPage;
