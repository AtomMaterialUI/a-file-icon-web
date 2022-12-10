import styled from '@emotion/styled';
import { Checkbox, Range } from '~common/Components';
import { useMonochrome, useIconSize, useFab } from '~common/selectors';

const Section = styled.section`
  display: block;
  margin: 2rem auto;
`;

const Form = () => {
  const { localMonochrome, setIsMonochrome } = useMonochrome();
  const { localIconSize, setIconSize } = useIconSize();
  const { localShowFab, setShowFab } = useFab();
  // const { accentColor, setAccentColor } = useIconColor();

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

      {/*<section>*/}
      {/*  <ColorPicker*/}
      {/*    value={accentColor ?? null}*/}
      {/*    setValue={setAccentColor}*/}
      {/*    text='Icon Color'*/}
      {/*    id='iconColor'*/}
      {/*  />*/}
      {/*</section>*/}
    </>
  );
};

export default Form;