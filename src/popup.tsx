import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import { Suspense } from 'react';
import { GlobalStyles } from '~Global.styled';
import { Loading } from '~popup/Loading/Loading';
import Panel from '~popup/Panel/Panel';

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: var(--atom-bg, #263238);
  color: var(--atom-g, #b0bec5);
`;

function delay(lazyComponent: Promise<any>): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, 500)).then(() => lazyComponent);
}

const Popup = () => (
  <>
    <Global styles={GlobalStyles}/>
    <Suspense fallback={<Loading/>}>
      <Container>
        <Panel/>
      </Container>
    </Suspense>
  </>
);

export default Popup;
