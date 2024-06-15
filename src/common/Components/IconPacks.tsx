import styled from '@emotion/styled';

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const IconPacks = ({ value, setValue }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Section>
      <label htmlFor='iconPacks'>Icon Packs:</label>
      <ul id='iconPacks'>
        <li value='ANGULAR2'>Angular</li>
        <li value='NEST'>Nest</li>
        <li value='REDUX'>Redux</li>
        <li value='NGRX'>Rx.JS</li>
        <li value='NEXTJS'>NextJS</li>
        <li value='RAILS'>Rails</li>
      </ul>
    </Section>
  );
};