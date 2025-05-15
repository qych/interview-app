import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useMemo, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { ClassListRes } from 'school-portal-common';
import { Url } from '../../constants';
import { classService } from '../../services';
import { NotificationUtil } from '../../utils';

export const ClassesSection = () => {

  const [classes, setClasses] = useState<ClassListRes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await classService.getClasses();
      setClasses(data);
    } catch (err) {
      const { error } = err;
      NotificationUtil.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<ClassListRes> = useMemo(() => [
    {
      title: '#',
      key: 'index',
      render: (_, __, index) => index + 1
    },
    {
      title: 'Class Level',
      dataIndex: 'level',
      key: 'level'
    },
    {
      title: 'Class Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Form Teacher',
      dataIndex: 'formTeacher',
      key: 'formTeacher',
      render: (_) => 'TODO'
    }
  ], []);

  return (
    <>
      <div className="flex-between pb-4 h-16">
        <div className="text-lg semi-bold">Classes</div>
        {classes.length > 0 && <Button className="btn-base" type="primary" icon={<PlusOutlined />} onClick={() => navigate(generatePath(Url.ADD_CLASS))}>Add Class</Button>}
      </div>
      <Card className="card" bodyStyle={classes.length > 0 ? { minHeight: 'inherit' } : { minHeight: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {loading
          ? <Spin />
          : classes.length === 0
            ? (
              <>
                <div className="text-md semi-bold pb-4">There are no existing classes yet.</div>
                <Button className="btn-base" type="primary" icon={<PlusOutlined />} onClick={() => navigate(generatePath(Url.ADD_CLASS))}>Add Class</Button>
              </>
            )
            :
              <Table columns={columns} dataSource={classes} pagination={false} />
        }
      </Card>
    </>
  );
};
