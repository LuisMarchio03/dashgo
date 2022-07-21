import Link from "next/link";
import { RiAddLine, RiEditLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  Link as LinkChakra,
} from "@chakra-ui/react";

import { GetServerSideProps } from "next";
import { useState } from "react";
import { useUsers } from "../../services/hooks/useUsers";
import { getUsers } from "../../services/hooks/useUsers";
import { getUser } from "../../services/hooks/useUser";
import { queryClient } from "../../services/queryClient";

export default function UserList({ users }) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page, {
    initialData: users,
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handlePrefetchUser = async (userId: string) => {
    await queryClient.prefetchQuery(["user", userId], () => getUser(userId));
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading as="h2" size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" />}
            </Heading>

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="lg" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th
                      px={{ base: "4", md: "4", lg: "6" }}
                      color="gray.300"
                      width="8"
                    >
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    {/* {isWideVersion && } */}
                    <Th textAlign="center">#</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data?.users?.map((user, i) => (
                    <Tr key={i}>
                      <Td px={{ base: "4", md: "4", lg: "6" }}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <LinkChakra
                            color="purple.400"
                            onMouseEnter={() => handlePrefetchUser}
                          >
                            <Text fontWeight="bold">{user?.name}</Text>
                          </LinkChakra>

                          <Text fontSize="sm" color="gray.300">
                            {user?.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user?.createdAt}</Td>}
                      <Td textAlign="center">
                        {isWideVersion && (
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="green"
                            leftIcon={<Icon as={RiEditLine} />}
                          >
                            Editar
                          </Button>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                currentPage={page}
                onPageChange={setPage}
                totalCountOfRegisters={data?.totalCount}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await getUsers(1);

  return {
    props: {
      users,
    },
  };
};
