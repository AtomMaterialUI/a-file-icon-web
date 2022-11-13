import styled from '@emotion/styled';

const StyledFooter = styled.footer`
  grid-area: footer;
  text-align: right;

  a {
    text-decoration: none;
    color: var(--links, #80cbc4);
  }
`;

export const Footer = () => {
  // get current year
  const year = new Date().getFullYear();
  return (
    <StyledFooter>
      <small>© 2015-{year} <a href='https://www.material-theme.com' target='_blank'>Atom Material Themes and Plugins</a></small>
    </StyledFooter>
  );
};