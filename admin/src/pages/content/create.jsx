import Container from "../../components/Container";
import { Group, Select, Textarea } from "@mantine/core";
import CustomButton from "../../components/Button";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoaderComponent from "../../components/loader";
import BackButton from "../../components/BackButon";
import { getCefr, getCefrLevels } from "../../services/cefrService";
import { createContent } from "../../services/contentService";
const ContentCreatePage = () => {
  const [name, setName] = useState("");
  const [levelId, setLevelId] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [cefrId, setCefrId] = useState("");
  const { data: levels } = useQuery({
    queryKey: ["cefrLevels", cefrId],
    queryFn: () => getCefrLevels(cefrId),
    enabled: !!cefrId,
  });
  const { data: getCefrs, isLoading } = useQuery({
    queryKey: ["cefrs"],
    queryFn: getCefr,
  });

  const [maxWord, setMaxWord] = useState(0);
  const [maxLength, setMaxLength] = useState(0);
  const [typeWord, setTypeWord] = useState("");
  const [typeLength, setTypeLength] = useState("");

  const handleSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
    if (!name || !levelId) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    if (typeWord == "wrong" || typeLength == "wrong") {
      toast.error("Lütfen tüm alanları kontrol edin");
      return;
    }
     const response = await createContent({ name, levelId });

    if (response?.status === true) {
      toast.success("İçerik başarıyla oluşturuldu");
      setName("");
      setLevelId("");
    } else {
      toast.error(response?.message);
    }
    setDisabled(false);
  };

  useEffect(() => {
    setLevelId(null);
  }, [cefrId]);

  useEffect(() => {
    const list = name.split("\n");
    if (name == "") {
      setTypeWord("wrong");
      setTypeLength("wrong");
      return;
    } else if (list.length == 0) {
      setTypeWord("wrong");
      setTypeLength("wrong");
      return;
    } else if (list.length > maxWord) {
      setTypeWord("wrong");
    } else if (list.length == maxWord) {
      setTypeWord("correct");
    } else if (list.length < maxWord) {
      setTypeWord("correct");

      setTypeLength("correct");
    } 
    
    if (list.some((item) => item.length > maxLength)) {
      setTypeLength("wrong");
    } else if (list.length <= maxLength) {
      setTypeLength("correct");
    }
  }, [name]);

  if (isLoading) return <LoaderComponent />;

  return (
    <Container>
      <div className="w-full flex justify-between items-center">
        <h3 className="text-xl font-bold py-4 text-gray-500 text-start w-full">
          İçerik Ekle
        </h3>
        <BackButton />
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
            label: cefr?.name,
          }))}
        />
        <Select
          disabled={!cefrId}
          className="w-full my-2"
          label="Seviye"
          placeholder="Seviye Seçiniz"
          required
          onChange={(e) => {
            setLevelId(e);
            if (levels?.find((level) => level?._id === e)?.matrisCount == 3) {
              setMaxWord(2);
              setMaxLength(3);
            } else if (
              levels?.find((level) => level?._id === e)?.matrisCount == 4
            ) {
              setMaxWord(3);
              setMaxLength(4);
            } else {
              setMaxWord(
                levels?.find((level) => level?._id === e)?.matrisCount - 1
              );
              setMaxLength(
                levels?.find((level) => level?._id === e)?.matrisCount - 2
              );
            }
          }}
          value={levelId}
          data={levels?.map((level) => ({
            value: level?._id,
            label: level?.name,
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
        {maxWord > 0 && maxLength > 0 && (
          <div className="w-full my-2 h-full flex justify-center items-center gap-2">
            <p
              className={
                typeWord == "wrong"
                  ? "text-red-500"
                  : typeWord == "correct"
                  ? "text-green-500"
                  : "text-gray-500"
              }
            >
              Max Kelime: {maxWord}
            </p>
            ||
            <p
              className={
                typeLength == "wrong"
                  ? "text-red-500"
                  : typeLength == "correct"
                  ? "text-green-500"
                  : "text-gray-500"
              }
            >
              Max Harf: {maxLength}
            </p>
          </div>
        )}
        <Group justify="center">
          <CustomButton type="submit" disabled={disabled}>
            Kaydet
          </CustomButton>
        </Group>
      </form>
    </Container>
  );
};

export default ContentCreatePage;
