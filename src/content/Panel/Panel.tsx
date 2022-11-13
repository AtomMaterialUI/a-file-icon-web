import styled from '@emotion/styled';
import Settings from '~content/Settings/Settings';

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
    <Settings />
  </StyledPanel>
);

export default Panel;