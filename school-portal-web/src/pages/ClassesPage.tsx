import { HeaderMenu } from '../constants';
import { ClassesSection } from '../containers/classes';
import { PageWrapper } from '../containers/layout';

const ClassesPage = () => (
    <PageWrapper headerMenu={HeaderMenu.CLASSES}>
      <ClassesSection />
    </PageWrapper>
);

export { ClassesPage as default };
