import styled from '@emotion/styled';
import { IconPack, iconPacks } from '~associations/IconPack';
import { IconButton } from '~common/Components/IconButton';

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1em;
`;

export const IconPacks = ({ value, setValue }) => {
  const handleChange = (value: any, id: IconPack) => {
    const newValue = {
      ...value,
      [id]: value,
    };
    setValue(value);
  };

  // @ts-ignore
  const assetsFolderUrl = chrome.runtime.getURL('assets/packs/');

  return (
    <Section>
      {iconPacks.map(({ icon, name, id }) => (
        <IconButton
          isChecked={!!value[id]}
          text={name}
          id={id}
          icon={`${assetsFolderUrl}${icon}`}
          setChecked={(e) => handleChange(e, id)}
        />
      ))}
    </Section>
  );
};
