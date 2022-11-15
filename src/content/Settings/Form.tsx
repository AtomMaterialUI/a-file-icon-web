import styled from '@emotion/styled';
import { Checkbox } from '~popup/Components/Checkbox';
import { useMonochrome, useIconSize, useIconColor } from '~common/selectors';

const Container = styled.div`
`;

const Section = styled.section`
  display: block;
  margin: 2rem auto;
`;

const Form = () => {
  const { isEnabled, setIsEnabled } = useMonochrome();
  const { iconSize, setIconSize } = useIconSize();
  const { accentColor, setAccentColor } = useIconColor();

  return (
    <Container>
      <section>
        <Checkbox
          isChecked={isEnabled ?? true}
          text='Monochrome'
          id='isMonochrome'
          setChecked={setIsEnabled}
        />
      </section>

      {/*<section>*/}
      {/*  <Range*/}
      {/*    id='iconSize'*/}
      {/*    label='Icon Size'*/}
      {/*    value={iconSize ?? 16}*/}
      {/*    setValue={setIconSize}*/}
      {/*  />*/}
      {/*</section>*/}

      {/*<section>*/}
      {/*  <ColorPicker*/}
      {/*    value={accentColor ?? null}*/}
      {/*    setValue={setAccentColor}*/}
      {/*    text='Icon Color'*/}
      {/*    id='iconColor'*/}
      {/*  />*/}
      {/*</section>*/}
    </Container>
  );
};

export default Form;