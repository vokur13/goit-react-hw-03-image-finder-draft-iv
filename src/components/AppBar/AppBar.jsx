import { Box } from '../Box/Box.styled';
import { Logo } from '../Logo/Logo';

export const AppBar = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bg="red"
      px={4}
      py={3}
      as="header"
    >
      <Logo />
      <div>Menu</div>
    </Box>
  );
};
