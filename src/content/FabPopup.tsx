import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import Panel from '~content/Panel/Panel';

const slideIn = keyframes`
  from {
    height: 0;
    opacity: 0;
  }
  80% {
    height: 600px;
  }
  to {
    opacity: 1;
    height: 600px;
  }
`;

const PanelContainer = styled.div`
  position: fixed;
  bottom: 5rem;
  right: 2rem;
  width: 600px;
  height: 600px;
  background-color: var(--bg, #263238);
  color: var(--fg, #b0bec5);
  border: none;
  border-radius: 10px;

  animation: ${slideIn} 0.3s ease-in-out;
`;

export const FabPopup = () => (
  <PanelContainer>
    <Panel />
  </PanelContainer>
);