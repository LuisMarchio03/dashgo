import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export const getUser = async (userId: string): Promise<User> => {
  const { data } = await api.get(`/user/${userId}`);

  const user = {
    id: data?.user?.id,
    name: data?.user?.name,
    email: data?.user?.email,
    createdAt: new Date(data?.user?.createdAt).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };

  return user;
};

export const useUser = (userId: string) => {
  return useQuery(["user", userId], () => getUser(userId), {
    staleTime: 1000 * 60 * 10, // 10 Minutos
  });
};
