import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/Button";
import Container from "../../components/Container";
import DataTable from "../../components/DataTable";
import { useQuery } from "@tanstack/react-query";
import { getLevels } from "../../services/levelService";
import LoaderComponent from "../../components/loader";
import { toast } from "react-toastify";
import { deleteLevel } from "../../services/levelService";
import { useEffect, useState } from "react";
import FilterButton from "../../components/FilterButton";

const LevelPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["levels"],
    queryFn: getLevels,
  });
  const [filter, setFilter] = useState(false);
  const [cefrs, setCefrs] = useState([]);
  const [selectedCefr, setSelectedCefr] = useState("");
  useEffect(() => {
    if (data && data.length > 0) {
      localStorage.setItem("levelKey", JSON.stringify(data[data.length - 1].key + 1));
      let cefrs = [];
      data.forEach((item) => {
        if (!cefrs.some((cefr) => cefr.id === item.cefrId._id)) {
          cefrs.push({ id: item.cefrId._id, name: item.cefrId.name });
        }
      });
      setCefrs(cefrs);
    }
  }, [data]);

  const deleteData = async (id) => {
    const response = await deleteLevel(id);
    if (response?.status === true) {
      toast.success("Level başarıyla silindi");
      refetch();
    }
  };

  if (isLoading) {
    return <LoaderComponent />;
  }
  if (isError) {
    return <div>Error fetching levels</div>;
  }
  const columns = [
    { name: "key", key: "key" },
    { name: "Cefr", key: "cefrId.name" },
    { name: "İsim", key: "name" },
    { name: "Matris Sayısı", key: "matrisCount" },
    { name: "Kayıt Tarihi", key: "createdAt" },
    { name: "İşlemler", key: "action", buttons: ["update", "delete"] },
  ];
  return (
    <Container>
      <div className="w-full flex justify-between items-center">
        <h3 className="text-xl font-bold py-4 text-gray-500 text-start w-full">
          Seviyeler
        </h3>
        <div className="flex items-center gap-2">
           <FilterButton filter={filter} setFilter={setFilter}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label htmlFor="cefr">Cefr</label>
                <select name="cefr" id="cefr" className="w-full p-2 rounded-md border border-gray-300"
                  onChange={(e) => setSelectedCefr(e.target.value)}
                >
                  <option value="">Tümü</option>
                  {cefrs.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
           </FilterButton>
          <CustomButton type="button" onClick={() => navigate("create")}>
            Ekle
          </CustomButton>
        </div>
      </div>
      <DataTable columns={columns} data={selectedCefr!="" ? data?.filter((item) => item.cefrId._id === selectedCefr) : data} deleteFunction={deleteData} />
    </Container>
  );
};

export default LevelPage;
