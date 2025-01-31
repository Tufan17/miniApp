import Container from "../../components/Container";
import { TextInput, Group, Select } from "@mantine/core";
import CustomButton from "../../components/Button";
import { createContent } from "../../services/contentService";
import { toast } from "react-toastify";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLevels } from "../../services/levelService";
import LoaderComponent from "../../components/loader";
import BackButton from "../../components/BackButon";
const ContentCreatePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [levelId, setLevelId] = useState("");
  const [disabled, setDisabled] = useState(false);
  const {data:levels, isLoading} = useQuery({
    queryKey: ["levels"],
    queryFn: getLevels
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

export default ContentCreatePage;
