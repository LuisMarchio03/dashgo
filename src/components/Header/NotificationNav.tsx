import { HStack, Icon } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";

export function NotificationNav() {
  return (
    <HStack
      spacing={{ base: "6", md: "8" }}
      mx={{ base: "6", md: "8" }}
      pr={{ base: "6", md: "8" }}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Icon as={RiNotificationLine} fontSize="20" />
      <Icon as={RiUserAddLine} fontSize="20" />
    </HStack>
  );
}
