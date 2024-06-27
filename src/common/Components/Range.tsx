import styled from '@emotion/styled';
import type { FC } from 'react';

const Section = styled.section`
  display: block;
  margin: 1rem auto;

  label {
    display: block;
    text-align: left;
    margin-bottom: 0.5em;
  }

  input {
    display: block;
    background-image: none;
    font-size: 0.875rem;
  }

  input[type='range'],
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: transparent;
    outline: none;
    width: 100%;
    height: 2.3125rem;
    padding: 0.5rem;
    margin: 0;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  input[type='range'] {
    border: 0 none;
    line-height: normal;
    font: inherit;
    transition: all 0.15s ease;

    &:focus {
      &::-webkit-slider-thumb {
        box-shadow: 0 0 0 0.5rem rgba(0, 0, 0, 0.075);
      }
    }
  }

  input[type='range']::-webkit-slider-thumb {
    width: 1rem;
    height: 1rem;
    border: 0.1875rem solid var(--atom-accent);
    background-color: var(--atom-accent);
    box-shadow: 0 0 0 0.1875rem var(--atom-border);
    border-radius: 100%;
    margin-top: -0.5rem;
    transition: inherit;
  }

  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.125rem;
    cursor: pointer;
    background: var(--atom-hl);
    border-radius: 0.25rem;
  }
`;

type Props = {
  label: string;
  value: number;
  setValue: (value: number) => void;
  id: string;
  min?: number;
  max?: number
}

export const Range: FC<Props> = ({ label, value, setValue, id, min = 10, max = 30 }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value));
  };

  return (
    <Section>
      <label htmlFor={id}>{label}: <output>{value}</output></label>
      <input type="range"
             min={min}
             max={max}
             id={id}
             value={value}
             onChange={handleChange}/>
    </Section>
  );
};
