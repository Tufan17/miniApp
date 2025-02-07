import Container from "../../components/Container";
import { TextInput, Group, Select, Textarea } from "@mantine/core";
import CustomButton from "../../components/Button";
import { createContent } from "../../services/contentService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoaderComponent from "../../components/loader";
import BackButton from "../../components/BackButon";
import { getCefr, getCefrLevels } from "../../services/cefrService";
const ContentCreatePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [levelId, setLevelId] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [cefrId, setCefrId] = useState("");
  const {data:levels} = useQuery({
    queryKey: ["cefrLevels", cefrId],
    queryFn: () => getCefrLevels(cefrId),
    enabled: !!cefrId,
  })
  const {data:getCefrs,isLoading} = useQuery({
    queryKey: ["cefrs"],
    queryFn: getCefr
  })
  const handleSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    if (!name || !levelId) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

   
    const response = await createContent({ name, description:description===""?"-":description, levelId });
    
    if (response?.status === true) {
      toast.success("İçerik başarıyla oluşturuldu");
      setName("");
      setDescription("");
      setLevelId("");
    } else {
      toast.error(response?.message);
    }
    setDisabled(false);
  };

  useEffect(()=>{
    setLevelId(null);      
},[cefrId])

  if(isLoading) return <LoaderComponent/>

  return (
    <Container>
      <div className="w-full flex justify-between items-center">
        <h3 className="text-xl font-bold py-4 text-gray-500 text-start w-full">
          İçerik Ekle
        </h3>
        <BackButton/>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-2"
      >
         <Select
            className="w-full my-2"
            label="Cefr Seviye"
            placeholder="Cefr Seviye Seçiniz"
            required
            onChange={(e) => setCefrId(e)}
            value={cefrId}
            data={getCefrs?.map((cefr) => ({
              value: cefr?._id,
              label: cefr?.name
            }))}
            />
        <Select
            disabled={!cefrId}
            className="w-full my-2"
            label="Seviye"
            placeholder="Seviye Seçiniz"
            required
            onChange={(e) => setLevelId(e)}
            value={levelId}
            data={levels?.map((level) => ({
              value: level?._id,
              label: level?.name
            }))}
            />
          <Textarea
            className="w-full my-2"
            label="İsim"
            placeholder="İsim"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <TextInput
            className="w-full my-2"
            label="Açıklama"
            placeholder="Açıklama"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />

        <Group justify="center">
          <CustomButton type="submit" disabled={disabled}>Kaydet</CustomButton>
        </Group>
      </form>
    </Container>
  );
};

export default ContentCreatePage;
