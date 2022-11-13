import styled from '@emotion/styled';

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  max-width: 40rem;
  min-width: 24rem;
  background: var(--bg, #263238);
`;

const LoadingText = styled.h4`
  font-weight: normal;
  font-style: normal;
  text-rendering: optimizeLegibility;
  color: var(--fg, #b0bec5);
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1;
  font-size: 2em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Loading = () => (
  <StyledLoading>
    <LoadingText>Loading...</LoadingText>
  </StyledLoading>
);