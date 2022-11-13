import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import { lazy, Suspense } from 'react';
import { GlobalStyles } from '~Global.styled';
import { Loading } from '~popup/Loading/Loading';

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: var(--bg, #263238);
  color: var(--fg, #b0bec5);
`;

function delay(lazyComponent: Promise<any>): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, 1000)).then(() => lazyComponent);
}

const Panel = lazy(() => delay(import('~popup/Panel/Panel')));

const Popup = () => (
  <>
    <Global styles={GlobalStyles} />
    <Suspense fallback={<Loading />}>
      <Container>
        <Panel />
      </Container>
    </Suspense>
  </>
);

export default Popup;


