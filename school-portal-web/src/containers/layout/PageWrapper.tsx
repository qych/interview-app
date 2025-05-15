import { Layout, Menu } from 'antd';
import { ReactNode } from 'react';
import { useNavigate, generatePath } from 'react-router';
import { HeaderMenu, Url } from '../../constants';
import { useWindowSize } from '../../hooks';
import logo from '../../images/Mortarboard.png'

const { Header, Content } = Layout;

interface PageWrapperProps {
  headerMenu?: HeaderMenu;
  children: ReactNode;
}

interface MenuConfig {
  key: HeaderMenu;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
}

export const PageWrapper = ({ headerMenu, children }: PageWrapperProps) => {
  const navigate = useNavigate();

  const { windowHeight }  = useWindowSize();

  const getMenuItems = () =>
    [
      {
        key: HeaderMenu.CLASSES,
        label: 'Classes',
        onClick: () => navigate(generatePath(Url.CLASSES))
      },
      {
        key: HeaderMenu.TEACHERS,
        label: 'Teachers',
        onClick: () => navigate(generatePath(Url.TEACHERS))
      }
    ] as MenuConfig[];

  return (
    <Layout style={{ minHeight: windowHeight }}>
      <Header className="header">
        <div style={{ float: 'left', paddingRight: 50, fontSize: 18, display: 'flex', gap: 8, alignItems: 'center' }} className="semi-bold">
          <img src={logo} alt="motarboardLogo" height={36} width={36} />
          <div>School Portal</div>
        </div>
        <Menu
          mode="horizontal"
          items={getMenuItems()}
          activeKey={headerMenu}
        />
      </Header>
      <Content className="page-container">
        {children}
      </Content>
    </Layout>
  );
}
