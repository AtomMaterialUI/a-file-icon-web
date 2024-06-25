import styled from '@emotion/styled';

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  gap: 1em;

  input[type="color"] {
    -webkit-appearance: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 50%;
  }

  input[type="color"]::-webkit-color-swatch {
    border-color: var(--atom-border);
    border-radius: 50%;
  }
`;

const Badge = styled.span<{ color: string }>`
  display: inline-block;
  background-color: ${({ color }) => color ?? 'var(--atom-accent)'};
  color: white;
  padding: 4px;
  border-radius: 4px;
`;

export const ColorPicker = ({ id, value, setValue, text }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Section>
      <label htmlFor={id}>{text}: <Badge color={value}>{value ?? 'Default'}</Badge></label>
      <div>
        <input
          id={id}
          type="color"
          value={value ?? '#009688'}
          onChange={handleChange}
        />
      </div>
    </Section>
  );
};
