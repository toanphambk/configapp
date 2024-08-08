import {PlusOutlined} from '@ant-design/icons';
import type {Project} from '@prisma/client';
import {Card, Button} from 'antd';
import {useGetProjects, useUpdateProject, useDeleteProject, useCreateProject} from '../../api';
import type {CustomColumnType} from '/@/components/CustomTable';
import CustomTable from '/@/components/CustomTable';
import {setSelectedProject} from '/@/redux/UI/AppSlice';
import {useAppDispatch, useAppSelector} from '/@/redux/hooks';
import {useEditableTable} from '/@/hook/useEditableTable';
import type {ModalFormField} from '/@/components/FormModal';
import FormModal from '/@/components/FormModal';
import {useFormModal} from '/@/hook/useFormModal';

const columns: CustomColumnType<Project>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    inputType: 'text',
    enableEdit: true,
    width: 100,
    rules: [{required: true, message: 'Please input the project name!'}],
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    inputType: 'text',
    enableEdit: true,
    rules: [{required: true, message: 'Please input the project description!'}],
  },
  {
    title: 'Created At',
    key: 'createdAt',
    render: (text, record) => (
      <div key={record.id}>{new Date(record.createdAt).toLocaleString()}</div>
    ),
    align: 'center',
    width: 120,
  },
];

const createModalFields: ModalFormField<Project>[] = [
  {
    key: 'name',
    label: 'Name',
    rules: [{required: true, message: 'Please input the project name!'}],
    inputType: 'text',
  },
  {
    key: 'description',
    label: 'Description',
    rules: [{required: true, message: 'Please input the project description!'}],
    inputType: 'text',
  },
];

const ProjectCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedProject = useAppSelector(state => state.appSlice.selectedProject);
  const {data: dataSource, isLoading: isFetchingProjects} = useGetProjects({});
  const {mutateAsync: updateProject} = useUpdateProject();
  const {mutateAsync: deleteProject} = useDeleteProject();
  const {mutateAsync: createProject} = useCreateProject();

  const {
    editingRecord,
    form: tableForm,
    onEdit,
    onEditCancel,
    onEditConfirm,
    onRemove,
  } = useEditableTable<Project>();

  const {isModalOpen, form: modalForm, onSubmit, handleOpen, handleClose} = useFormModal<Project>();

  const handleRowClick = (record: Project) => {
    dispatch(setSelectedProject(record));
  };

  return (
    <div className="flex flex-col w-full">
      <Card
        className="w-full"
        title="Projects"
        extra={
          <Button
            className="font-semibold text-white bg-green-500"
            shape="default"
            icon={<PlusOutlined />}
            onClick={handleOpen}
          >
            New
          </Button>
        }
      >
        <FormModal<Project>
          title="Add Project"
          open={isModalOpen}
          onSubmit={() => onSubmit(createProject, {})}
          onCancel={handleClose}
          formFields={createModalFields}
          formInstance={modalForm}
        />
        <CustomTable<Project>
          rowKey={record => record.id}
          dataSource={dataSource}
          columns={columns}
          loading={isFetchingProjects}
          onRow={record => ({
            onClick: () => handleRowClick(record),
          })}
          selectedRecord={selectedProject}
          onEdit={onEdit}
          onDelete={record =>
            onRemove(record, deleteProject, () => dispatch(setSelectedProject({} as Project)))
          }
          onEditConfirm={record => onEditConfirm(record, updateProject)}
          onEditCancel={onEditCancel}
          editingRecord={editingRecord}
          form={tableForm}
          showActions={true}
        />
      </Card>
    </div>
  );
};

export default ProjectCard;
