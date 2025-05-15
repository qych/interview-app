import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, } from 'antd';
import { useMemo, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { CreateTeacherReq, Subject } from 'school-portal-common';
import { HeaderMenu, Url } from '../constants';
import { PageWrapper } from '../containers/layout';
import { teacherService } from '../services';
import { NotificationUtil } from '../utils';

// TODO #2: Fix Error on "Add Teacher" page
// TODO #4: Add FE antd form validation for contact number

const { Option } = Select;

const TeacherPage = () => {

  const [form] = Form.useForm<CreateTeacherReq>();
  const subjectOptions = useMemo<string[]>(() => Object.values(Subject), []);

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const createNewTeacher = async (req: CreateTeacherReq) => {
    setLoading(true);
    try {
      await teacherService.createTeacher(req);
      form.resetFields();
      NotificationUtil.success(`${req.name} was added as a teacher successfully.`, 'Teacher created');
      navigate(generatePath(Url.TEACHERS));
    } catch (err) {
      const { error } = err;
      NotificationUtil.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTeacher = () => {
    form.validateFields()
      .then(values => createNewTeacher(values))
      .catch(() => NotificationUtil.error('Please fill in all mandatory fields.', 'Incomplete form'));
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "Please input teacher's ${label}.",
    types: {
      email: 'Please enter a valid email.'
    }
  };
  /* eslint-enable no-template-curly-in-string */

  return (
    <PageWrapper headerMenu={HeaderMenu.TEACHERS}>
      <div className="text-lg semi-bold pb-4 h-16 flex align-items-center">Add Teacher</div>
      <Card className="card" bodyStyle={{ minHeight: 'inherit' }}>
        <Form form={form} layout="vertical" validateMessages={validateMessages}>
          <Form.Item className="w-116" name="name" label={<div className="semi-bold">Name</div>} rules={[{ required: true }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item className="w-116" name="subject" label={<div className="semi-bold">Subject</div>} rules={[{ required: true }]}>
            <Select placeholder="Select a subject">
              {subjectOptions.map(subject => <Option key={subject} value={subject}>{subject}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item className="w-116" name="email" label={<div className="semi-bold">Email Address</div>} rules={[{ type: 'email', required: true }]}>
            <Input placeholder="Email address" />
          </Form.Item>
          <Form.Item className="w-116" name="mobileNumber" label={<div className="semi-bold">Work Contact Number</div>} rules={[{ required: true }]}>
            <Input placeholder="Work contact number" />
          </Form.Item>
        </Form>
      </Card>
      <div className="flex-end pt-4">
        <Button className="btn-base" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>Back</Button>
        <Button loading={loading} className="btn-base" type="primary" onClick={() => handleAddTeacher()}>Add Teacher</Button>
      </div>
    </PageWrapper>
  );
};

export { TeacherPage as default };
