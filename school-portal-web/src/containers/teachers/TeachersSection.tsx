import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useMemo, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { StringUtil, TeacherListRes } from 'school-portal-common';
import { Url } from '../../constants';
import { teacherService } from '../../services';
import { NotificationUtil } from '../../utils';

export const TeachersSection = () => {

  const [teachers, setTeachers] = useState<TeacherListRes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await teacherService.getTeachers();
      setTeachers(data);
    } catch (err) {
      const { error } = err;
      NotificationUtil.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<TeacherListRes> = useMemo(() => [
    {
      title: '#',
      key: 'index',
      render: (_, item, index) => index + 1
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Work Contact',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
      render: (_, { contactNumber }) => StringUtil.formatContactNumber(contactNumber)
    }
  ], []);

  return (
    <>
      <div className="flex-between pb-4 h-16">
        <div className="text-lg semi-bold">Teachers</div>
        {teachers.length > 0 && <Button className="btn-base" type="primary" icon={<PlusOutlined />} onClick={() => navigate(generatePath(Url.ADD_TEACHER))}>Add Teacher</Button>}
      </div>
      <Card className="card" bodyStyle={teachers.length > 0 ? { minHeight: 'inherit' } : { minHeight: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {loading
          ? <Spin /> 
          : teachers.length === 0
            ? (
              <>
                <div className="text-md semi-bold pb-4">There are no existing teachers yet.</div>
                <Button className="btn-base" type="primary" icon={<PlusOutlined />} onClick={() => navigate(generatePath(Url.ADD_TEACHER))}>Add Teacher</Button>
              </>
            )
            :
              <Table columns={columns} dataSource={teachers} pagination={false} />
        }
      </Card>
    </>
  );
};
