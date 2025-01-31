import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/Button";
import Container from "../../components/Container";
import DataTable from "../../components/DataTable";
import { useQuery } from "@tanstack/react-query";
import { getLevels } from "../../services/levelService";
import LoaderComponent from "../../components/loader";
import { toast } from "react-toastify";
import { deleteLevel } from "../../services/levelService";
import { useEffect } from "react";

const LevelPage = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError,refetch } = useQuery({
        queryKey: ["levels"],
        queryFn: getLevels,
      });

      useEffect(()=>{
        if(data){
            localStorage.setItem("levelKey",JSON.stringify(data[data.length-1].key+1));
        }
      },[data]);



      const deleteData = async (id)=>{
        const response = await deleteLevel(id);
        if(response?.status === true){
            toast.success("Level başarıyla silindi");
            refetch();
        }
      }
    
      if (isLoading) {
        return <LoaderComponent />;
      }
      if (isError) {
        return <div>Error fetching levels</div>;
      }
      const columns = [
        { name: 'key', key: 'key' },
        { name: 'İsim', key: 'name' },
        { name: 'Açıklama', key: 'description' },
        { name: 'Kayıt Tarihi', key: 'createdAt'},
        { name: 'İşlemler',key: 'action', buttons: ['update', 'delete'] },
      ];
  return (
      <Container>
        <div className="w-full flex justify-between items-center">
          <h3 className="text-xl font-bold py-4 text-gray-500 text-start w-full">
            Seviyeler
          </h3>
          <CustomButton type="button" onClick={() => navigate("create")}>Ekle</CustomButton>
        </div>
        <DataTable
          columns={columns}
          data={data}
          deleteFunction={deleteData}
        />
      </Container>
  );
};

export default LevelPage;
