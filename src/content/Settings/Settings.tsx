import styled from '@emotion/styled';
import Form from '~content/Settings/Form';

const Container = styled.main`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  max-width: 20rem;
  min-width: 16rem;
`;

const Title = styled.header`
  h1, h4 {
    font-weight: normal;
    font-style: normal;
    color: var(--fg);
    text-rendering: optimizeLegibility;
    margin-top: 0.1rem;
    margin-bottom: 0.25rem;
    line-height: 1.4;
  }

  h1 {
    font-size: 2em;
    font-weight: lighter;
    line-height: 1;
    margin-top: 0.125em;
    margin-bottom: 0.125em;
    letter-spacing: 0.025em;
    animation: fadeInDownShort 0.5s cubic-bezier(0.55, 0, 0.1, 1) both 0.5s;
    pointer-events: none;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 0;
    line-height: 1;
    font-size: 1.5em;
  }

  small {
    font-size: 60%;
    color: var(--text);
    line-height: 0;
    font-weight: 300;
    letter-spacing: 0.05em;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 20px;
`;

const Settings = () => (
  <Container>
    <Title>
      <h4>Atom Material Icons</h4>

      <h1><small>Settings</small></h1>
    </Title>

    <Grid>
      <Form />
    </Grid>
  </Container>
);

export default Settings;