import styled from '@emotion/styled';
import { IconPack, iconPacks } from '~associations/IconPack';
import { IconButton } from '~common/Components/IconButton';

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1em;
`;

export const IconPacks = ({ config, setConfig }) => {
  const handleChange = (value: any, id: IconPack) => {
    const newConfig = {
      ...config,
      [id]: value,
    };
    setConfig(newConfig);
  };

  // @ts-ignore
  const assetsFolderUrl = chrome.runtime.getURL('assets/packs/');

  return (
    <Section>
      {iconPacks.map(({ icon, name, id }) => {
        return (
          <IconButton
            isChecked={config[id]}
            text={name}
            id={id}
            key={id}
            icon={`${assetsFolderUrl}${icon}`}
            setChecked={(e) => handleChange(e, id)}
          />
        );
      })}
    </Section>
  );
};
