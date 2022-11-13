import styled from '@emotion/styled';
import { Footer } from './Footer';

const StyledPanel = styled.div`
  padding-top: 2.5rem;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: [content] 100% [footer] 32px;
  grid-template-areas:
        "content"
        "footer";
`;

const Panel = () => (
  <StyledPanel>
    <Footer />
  </StyledPanel>
);

export default Panel;