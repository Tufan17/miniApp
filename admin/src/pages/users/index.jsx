import { getUsers } from "../../services/userService";
import LoaderComponent from "../../components/loader";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/DataTable";
import Container from "../../components/Container";
const UserPage = () => {
    const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });



  if (isLoading) {
    return <LoaderComponent />;
  }
  if (isError) {
    return <div>Error fetching users</div>;
  }
  const columns = [
    { name: '#', key: '#' },
    { name: 'Nickname', key: 'nickname' },
    { name: 'Role', key: 'roleId.name' },
    { name: 'Kayıt Tarihi', key: 'createdAt' },
  ];
  return (
    <Container>
      <h3 className="text-xl font-bold py-4 text-gray-500 text-start w-full">Kullanıcılar</h3>
      <DataTable data={data} columns={columns} />
    </Container>
  );
};

export default UserPage;
