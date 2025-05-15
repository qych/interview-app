import { HeaderMenu } from '../constants';
import { PageWrapper } from '../containers/layout';
import { TeachersSection } from '../containers/teachers';

const TeachersPage = () => (
  <PageWrapper headerMenu={HeaderMenu.TEACHERS}>
    <TeachersSection />
  </PageWrapper>
);

export { TeachersPage as default };
