import styled from '@emotion/styled';

const Section = styled.div`
  display: block;
  //margin: 1rem auto;

  label {
    display: block;
    text-align: left;
    margin-bottom: 0.5em;
  }

  input {
    display: block;
    background-image: none;
  }

  input[type='checkbox'] {
    filter: none;
    position: absolute;
    opacity: 0;
    background: var(--atom-bg);

    & + label {
      position: relative;
      cursor: pointer;
      padding: 0;

      &:before {
        position: relative;
        content: '';
        margin-right: 10px;
        display: inline-block;
        vertical-align: text-top;
        width: 16px;
        height: 16px;
        background: var(--atom-bg);
        border: 2px solid var(--atom-accent);
        border-radius: 4px;
      }
    }

    &:hover {
      & + label:before {
        background: var(--atom-contrast);
      }
    }

    &:focus {
      & + label:before {
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
      }
    }

    &:checked {
      & + label:before {
        background: var(--atom-accent);
        color: var(--atom-bg);
      }

      & + label:after {
        content: '';
        position: absolute;
        left: 3px;
        top: 38%;
        background: var(--atom-bg);
        width: 2px;
        height: 2px;
        box-shadow: 2px 0 0 var(--atom-bg), 4px 0 0 var(--atom-bg), 4px -2px 0 var(--atom-bg), 4px -4px 0 var(--atom-bg),
        4px -6px 0 var(--atom-bg), 4px -8px 0 var(--atom-bg);
        transform: rotate(45deg);
      }
    }

    &:disabled {
      & + label {
        color: #b8b8b8;
        cursor: auto;
      }

      & + label:before {
        box-shadow: none;
        opacity: 0.6;
      }
    }
  }
`;

interface Props {
  id: string;
  isChecked: boolean;
  setChecked: (isChecked: boolean) => void;
  text: string;
  icon?: string;
}

export const Checkbox = ({ id, isChecked, setChecked, text, icon }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <Section>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor={id}>
        {icon && <img src={icon} alt={text} width={24} height={24}/>}
        {text}
      </label>
    </Section>
  );
};
