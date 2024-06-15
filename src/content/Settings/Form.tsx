import styled from '@emotion/styled';
import { Checkbox, Range, ColorPicker } from '~common/Components';
import { useMonochrome, useIconSize, useFab, useIconColor, useIconPacks } from '~common/selectors';
import { IconPacks } from '~common/Components/IconPacks';

const Section = styled.section`
  display: block;
  margin: 2rem auto;
`;

const Form = () => {
  const { localMonochrome, setIsMonochrome } = useMonochrome();
  const { localIconSize, setIconSize } = useIconSize();
  const { localShowFab, setShowFab } = useFab();
  const { accentColor, setAccentColor } = useIconColor();
  const { iconPacks, setIconPacks } = useIconPacks();

  return (
    <>
      <section>
        <Checkbox
          isChecked={localShowFab ?? true}
          text='Show Settings Button'
          id='showFab'
          setChecked={setShowFab}
        />
      </section>

      <section>
        <Checkbox
          isChecked={localMonochrome ?? false}
          text='Monochrome'
          id='isMonochrome'
          setChecked={setIsMonochrome}
        />
      </section>

      <section>
        <Range
          id='iconSize'
          label='Icon Size'
          value={localIconSize ?? 20}
          setValue={setIconSize}
        />
      </section>

      <section>
        <ColorPicker
          value={accentColor ?? null}
          setValue={setAccentColor}
          text='Folder Icon Color'
          id='iconColor'
        />
      </section>

      <section>
        <label>Icon Packs:</label>
        <IconPacks
          value={iconPacks}
          setValue={setIconPacks}
        />
      </section>
    </>
  );
};

export default Form;