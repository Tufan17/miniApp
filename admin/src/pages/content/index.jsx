import { useQuery } from "@tanstack/react-query";
import { getContents, deleteContent } from "../../services/contentService";
import Container from "../../components/Container";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/Button";
import DataTable from "../../components/DataTable";
import { toast } from "react-toastify";
import LoaderComponent from "../../components/loader";
import { useEffect, useState } from "react";
import FilterButton from "../../components/FilterButton";
const ContentPage = () => {
    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["contents"],
        queryFn: getContents
    })
    const [filter, setFilter] = useState(false);
    const [cefrs, setCefrs] = useState([]);
    const [selectedCefr, setSelectedCefr] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [levels, setLevels] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedType, setSelectedType] = useState("10");
    const deleteData = async (id)=>{
        const response = await deleteContent(id);
        if(response?.status === true){
            toast.success("Content başarıyla silindi");
            refetch();
        }
      }

    const navigate = useNavigate();


    useEffect(()=>{
        if(data){
          let cefrs = [];
          setSelectedCefr("");
          setSelectedLevel("");
          setFilteredData(data);
          data.forEach((item)=>{
            if(!cefrs.some((cefr)=>cefr.id === item?.levelId?.cefrId?._id)){
              cefrs.push({id: item?.levelId?.cefrId?._id, name: item?.levelId?.cefrId?.name});
            }
          });
          setCefrs(cefrs);
        }
    },[data]);


    useEffect(()=>{
      if(data){
        setSelectedLevel("");
        let levels = [];
        data.filter((item)=>item?.levelId?.cefrId?._id === selectedCefr).forEach((item)=>{
          if(!levels.some((level)=>level.id === item?.levelId?._id)){
            levels.push({id: item?.levelId?._id, name: item?.levelId?.name});
          }
        });
        setLevels(levels);
      }
    },[selectedCefr]);



    useEffect(()=>{
      let newFilteredData = data;
      if(selectedCefr!=""){
        newFilteredData = newFilteredData.filter((item)=>item?.levelId?.cefrId?._id === selectedCefr);
      }
      if(selectedLevel!=""){
        newFilteredData = newFilteredData.filter((item)=>item?.levelId?._id === selectedLevel);
      }
      setFilteredData(newFilteredData);
        
    },[selectedCefr,selectedLevel,filteredData])

   
    if (isLoading) {
      return <LoaderComponent />;
    }
    if(isError) return <div>Error</div>

    const columns = [
        { name: '#', key: '#' },
        { name: 'İsim', key: 'name' },
        { name: 'Cefr', key: 'levelId.cefrId.name' },
        { name: 'Seviye', key: 'levelId.name' },
        { name: 'Kayıt Tarihi', key: 'createdAt'},
        { name: 'İşlemler',key: 'action', buttons: ['update', 'delete'] },
      ];
  return (
    <Container>
      <div className="w-full flex justify-between items-center">
        <h3 className="text-xl font-bold py-4 text-gray-500 text-start w-full">
          İçerikler
        </h3>
        <div className="flex items-center gap-2">
          
          <select className="w-fit p-2 rounded-md border border-gray-300 bg-white text-sm text-black"
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
            name="type"
            id="type"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          
          

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

              <div className="flex flex-col">
                <label htmlFor="level">Seviye</label>
                <select name="level" id="level" className="w-full p-2 rounded-md border border-gray-300"
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  <option value="">Tümü</option>
                  {levels.map((item) => (
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
      <DataTable
        columns={columns}
        data={filteredData}
        deleteFunction={deleteData}
        type={selectedType}
      />
    </Container>
  );
}

export default ContentPage;