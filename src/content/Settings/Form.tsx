import styled from '@emotion/styled';
import { useStorage } from '@plasmohq/storage/hook';
import { Checkbox } from '~popup/Components/Checkbox';
import { Range } from '~popup/Components/Range';
import { ColorPicker } from '~popup/Components/ColorPicker';

const Container = styled.div`
`;

const Section = styled.section`
  display: block;
  margin: 2rem auto;
`;

const Form = () => {
  const [isEnabled, setIsEnabled] = useStorage('atom:isEnabled', true);
  const [iconSize, setIconSize] = useStorage<number>('atom:iconSize', 16);
  const [accentColor, setAccentColor] = useStorage<string | null>('atom:accentColor', null);

  return (
    <Container>
      <section>
        <Checkbox
          isChecked={isEnabled ?? true}
          text='Enabled'
          id='isEnabled'
          setChecked={setIsEnabled}
        />
      </section>

      <section>
        <Range
          id='iconSize'
          label='Icon Size'
          value={iconSize ?? 16}
          setValue={setIconSize}
        />
      </section>

      <section>
        <ColorPicker
          value={accentColor ?? null}
          setValue={setAccentColor}
          text='Accent Color'
          id='accentColor'
        />
      </section>
    </Container>
  );
};

export default Form;