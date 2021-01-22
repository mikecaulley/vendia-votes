import React from 'react';
import { Flex, Heading, Link } from 'rebass';
import { useColorMode } from 'theme-ui';

interface OwnProps {
  title: string;
}

const Header = (props: OwnProps) => {
  const [mode, setMode] = useColorMode();
  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const { title } = props;

  return (
    <Flex mb={4} width="100%" justifyContent="space-between">
      <Heading ml={5}>{title}</Heading>
      <Link mr={5} sx={{ cursor: 'point' }} onClick={toggleMode}>
        {mode === 'dark' ? '🌑' : '☀️'}
      </Link>
    </Flex>
  );
};

export default Header;
