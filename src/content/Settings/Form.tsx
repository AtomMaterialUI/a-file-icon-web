import styled from '@emotion/styled';
import { Checkbox, Range } from '~common/Components';
import { useMonochrome, useIconSize } from '~common/selectors';

const Section = styled.section`
  display: block;
  margin: 2rem auto;
`;

const Form = () => {
  const { isMonochrome, setIsMonochrome } = useMonochrome();
  const { iconSize, setIconSize } = useIconSize();
  // const { accentColor, setAccentColor } = useIconColor();

  return (
    <>
      <section>
        <Checkbox
          isChecked={isMonochrome ?? false}
          text='Monochrome'
          id='isMonochrome'
          setChecked={setIsMonochrome}
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