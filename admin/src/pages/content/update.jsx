import Container from "../../components/Container";
import { TextInput, Group, Select } from "@mantine/core";
import CustomButton from "../../components/Button";
import { getContent, updateContent } from "../../services/contentService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLevels } from "../../services/levelService";
import LoaderComponent from "../../components/loader";
const ContentUpdatePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [levelId, setLevelId] = useState("");
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const {id} = useParams();
  const {data:levels, isLoading} = useQuery({
    queryKey: ["levels"],
    queryFn: getLevels
  })

  const {data:content} = useQuery({
    queryKey: ["content", id],
    queryFn: () => getContent(id),
  })
  useEffect(()=>{
    if(levels && content){
      setName(content?.name);
      setDescription(content?.description);
      setLevelId(content?.levelId);
    }
  },[levels, content]);

  const handleSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    if (!name || !description) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    const response = await updateContent(id, { name, description, levelId });
    
    if (response) {
      toast.success("İçerik başarıyla güncellendi");
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } else {
      toast.error(response?.message);
    }
    setDisabled(false);
  };

  if(isLoading) return <LoaderComponent/>

  return (
    <Container>
      <h3 className="text-xl font-bold py-4 text-gray-500 text-start w-full">
        İçerik Güncelle
      </h3>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col  items-end justify-end content-end gap-2"
      >
        <div className="w-full flex flex-col md:flex-row p-2 rounded-md gap-2">
        <Select
            className="w-full md:w-1/2 my-2"
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
          <TextInput
            className="w-full md:w-1/2 my-2"
            label="İsim"
            placeholder="İsim"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <TextInput
            className="w-full md:w-1/2 my-2"
            label="Açıklama"
            placeholder="Açıklama"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <Group justify="center">
          <CustomButton type="submit" disabled={disabled}>Kaydet</CustomButton>
        </Group>
      </form>
    </Container>
  );
};

export default ContentUpdatePage;