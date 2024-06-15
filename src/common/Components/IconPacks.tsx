import styled from '@emotion/styled';
import { iconPacks } from '~associations/IconPack';
import { Checkbox } from '~common/Components/Checkbox';

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

export const IconPacks = ({ value, setValue }) => {
  const handleChange = (value, id) => {
    const newValue = {
      ...value,
      [id]: value,
    };
    setValue(value);
  };

  return (
    <Section>
      {iconPacks.map(({ icon, name, id }) => (
        <Checkbox
          isChecked={!!value[id]}
          text={name}
          id={id}
          setChecked={(e) => handleChange(e, id)}
        />
      ))}
    </Section>
  );
};