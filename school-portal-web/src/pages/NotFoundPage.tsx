import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {

  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Result
        style={{ margin: 'auto' }}
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={() => navigate(-1)}>Back</Button>}
      />
    </div>
  );
};

export { NotFoundPage as default };
