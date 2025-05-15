import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { BriefTeacherRes, ClassLevel, CreateClassReq } from 'school-portal-common';
import { HeaderMenu, Url } from '../constants';
import { PageWrapper } from '../containers/layout';
import { classService, teacherService } from '../services';
import { NotificationUtil } from '../utils';

// TODO #5: Populate FE dropdown with existing teachers
// TODO #6: Link teacher to classes. Every class must be assigned 1 teacher as form teacher

const { Option } = Select;

const ClassPage = () => {

  const [form] = Form.useForm<CreateClassReq>();
  const levelOptions = useMemo<string[]>(() => Object.values(ClassLevel), []);

  const [teacherOptions, setTeacherOptions] = useState<BriefTeacherRes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadTeacherOptions();
  }, []);

  const loadTeacherOptions = async () => {
    // TODO
  };

  const createNewClass = async (req: CreateClassReq) => {
    setLoading(true);
    try {
      await classService.createClass(req);
      form.resetFields();
      NotificationUtil.success(`${req.name} class has been created successfully.`, 'Class created');
      navigate(generatePath(Url.CLASSES));
    } catch (err) {
      const { error } = err;
      NotificationUtil.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClass = () => {
    form.validateFields()
      .then(values => createNewClass(values))
      .catch(() => NotificationUtil.error('Please fill in all mandatory fields.', 'Incomplete form'));
  };

  return (
    <PageWrapper headerMenu={HeaderMenu.CLASSES}>
      <div className="text-lg semi-bold pb-4 h-16 flex align-items-center">Add Class</div>
      <Card className="card" bodyStyle={{ minHeight: 'inherit' }}>
        <Form form={form} layout="vertical">
          <Form.Item className="w-116" name="level" label={<div className="semi-bold">Class Level</div>} rules={[{ required: true, message: "Please select class' level" }]}>
            <Select placeholder="Select a level">
              {levelOptions.map(level => <Option key={level} value={level}>{level}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item className="w-116" name="name" label={<div className="semi-bold">Class Name</div>} rules={[{ required: true, message: "Please input class' name" }]}>
            <Input placeholder="Name" />
          </Form.Item>
          {/* <Form.Item className="w-116" name="teacherEmail" label={<div className="semi-bold">Form Teacher</div>} rules={[{ required: true, message: "Please select class' form teacher" }]}>
            <Select
              placeholder="Assign a form teacher"
              dropdownRender={menu => teacherOptions.length > 0
                ? (<>{menu}</>)
                : (
                  <div style={{ padding: '6px 12px' }}>
                    <div className="text-black">No existing teachers.</div>
                    <span className="text-primary cursor-pointer" onClick={() => navigate(generatePath(Url.ADD_TEACHER))}>Add a teacher</span>
                  </div>
                )
              }
            >
              {teacherOptions.map(teacher => <Option key={teacher.email} value={teacher.email}>{teacher.name}</Option>)}
            </Select>
          </Form.Item> */}
        </Form>
      </Card>
      <div className="flex-end pt-4">
        <Button className="btn-base" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>Back</Button>
        <Button loading={loading} className="btn-base" type="primary" onClick={() => handleAddClass()}>Add Class</Button>
      </div>
    </PageWrapper>
  );
};

export { ClassPage as default };
