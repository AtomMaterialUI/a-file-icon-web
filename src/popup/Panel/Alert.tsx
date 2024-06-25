import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useAlert } from '~common/selectors';

const fadeInDown = keyframes`
  from {
    opacity: 0;
    height: 0;
  }
  30% {
    opacity: 1;
    height: 2.5rem;
  }
  to {
    opacity: 0;
    height: 0;
  }
`;

const TopAlert = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 24rem;
  height: 2.5rem;
  padding: 0.625rem 0;
  background-color: var(--atom-accent);
  color: var(--atom-selFg);
  text-align: center;
  font-size: 0.875rem;
  transition: all 0.25s ease;
  animation: ${fadeInDown} 5s cubic-bezier(.55, 0, .1, 1) both 1s;
  animation-delay: 0.5s;
`;

export const Alert = () => {
  const { isAlertVisible } = useAlert();
  if (!isAlertVisible) return null;

  return (
    <TopAlert>
      Refresh the page(s) to apply your changes!
    </TopAlert>
  );
};
