import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "../../services/api";

import { useMutation } from "react-query";
import { queryClient } from "../../services/queryClient";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import {
  RiSave3Line,
  RiSkipBackLine,
  RiSkipBackMiniLine,
} from "react-icons/ri";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório!"),
  email: yup.string().required("E-mail obrigatório!").email("E-mail invalido!"),
  password: yup
    .string()
    .required("Senha obrigatória!")
    .min(6, "No mínimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function UserCreate() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const { errors } = formState;

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post("users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response?.data?.user;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser?.mutateAsync(values);

    router.push("/users");
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={{ base: "6", md: "8" }}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider mb="8" mt="2" />

          <VStack spacing="8">
            <SimpleGrid
              minChildWidth="240px"
              spacing={{ base: "6", md: "8" }}
              w="100%"
            >
              <Input
                type="text"
                name="name"
                id="name"
                label="Nome completo"
                error={errors.name}
                {...register("name")}
              />
              <Input
                type="email"
                name="email"
                id="email"
                label="E-mail"
                error={errors.email}
                {...register("email")}
              />
            </SimpleGrid>

            <SimpleGrid
              minChildWidth="240px"
              spacing={{ base: "6", md: "8" }}
              w="100%"
            >
              <Input
                type="password"
                name="password"
                id="password"
                label="Senha"
                error={errors.password}
                {...register("password")}
              />
              <Input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                label="Confirmação da senha"
                error={errors.password_confirmation}
                {...register("password_confirmation")}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar <Icon as={RiSave3Line} fontSize="lg" ml="2" />
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
