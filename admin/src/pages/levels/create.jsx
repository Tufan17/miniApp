import Container from "../../components/Container";
import { TextInput, Group, Select } from "@mantine/core";
import CustomButton from "../../components/Button";
import { createLevel } from "../../services/levelService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButon";
import { useQuery } from "@tanstack/react-query";
import { getCefr } from "../../services/cefrService";
import LoaderComponent from "../../components/loader";
const LevelCreatePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [key, setKey] = useState(0);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [cefr, setCefr] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["cefrs"],
    queryFn: getCefr,
  });

  useEffect(() => {
    setKey(JSON.parse(localStorage.getItem("levelKey")) ?? 0);
  }, []);

  const handleSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    if (!name || !key) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    const response = await createLevel({
      name,
      description: description === "" ? "-" : description,
      key,
      cefrId: cefr,
    });

    if (response?.status === true) {
      toast.success("Level başarıyla oluşturuldu");
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    } else {
      toast.error(response?.message);
    }
    setDisabled(false);
  };

  return (
    <Container>
      <div className="w-full flex justify-between items-center">
        <h3 className="text-xl font-bold py-4 text-gray-500 text-start w-full">
          Level Ekle
        </h3>
        <BackButton />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 px-4"
      >
          <TextInput
            className="w-full  my-2"
            label="Sıra"
            placeholder="Sıra"
            type="number"
            required
            onChange={(e) => setKey(e.target.value)}
            value={key}
          />
          <TextInput
            className="w-full  my-2"
            label="İsim"
            placeholder="İsim"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
       
          <TextInput
            className="w-full  my-2"
            label="Açıklama"
            placeholder="Açıklama"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          {isLoading ? (
            <LoaderComponent />
          ) : (
            <Select
              required
              className="w-full my-2"
              data={data?.map((item) => ({
                value: item._id,
                label: item.name,
              }))}
              label="Cefr"
              placeholder="Cefr seçiniz"
              onChange={(value) => setCefr(value)}
            />
          )}

        <Group justify="end">
          <CustomButton type="submit" disabled={disabled}>
            Kaydet
          </CustomButton>
        </Group>
      </form>
    </Container>
  );
};

export default LevelCreatePage;
