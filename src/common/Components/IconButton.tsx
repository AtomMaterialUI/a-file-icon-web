import styled from '@emotion/styled';

const Root = styled.div`
  input {
    display: block;
    background-image: none;
  }

  input[type='checkbox'] {
    display: none;
  }
`;

const Button = styled.button`
  display: flex;
  border: 1px solid var(--atom-button);
  border-radius: 4px;
  background-color: var(--atom-button);
  padding: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;
  width: 100%;
  height: 100%;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: var(--atom-hl);
  }

  [checked] + & {
    border: 2px solid var(--atom-accent)
  }
`;

interface Props {
  id: string;
  isChecked: boolean;
  setChecked: (isChecked: boolean) => void;
  text: string;
  icon?: string;
}

export const IconButton = ({ id, isChecked, setChecked, text, icon }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const toggle = () => {
    setChecked(!isChecked);
  };

  return (
    <Root>
      <label htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        <Button onClick={toggle}>
          {icon && <img src={icon} alt={text} width={24} height={24}/>}
          {text}
        </Button>
      </label>
    </Root>
  );
};
