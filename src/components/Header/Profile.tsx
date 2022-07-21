import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Luís Gabriel M.</Text>
          <Text color="gray.300" fontSize="small">
            luisgabrielmarchio75@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Luís Gabriel"
        // src="https://github.com/Luis_Marchio03.png"
      />
    </Flex>
  );
}
