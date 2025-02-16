import { Pagination, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BiMessageSquareEdit } from "react-icons/bi";
import { IoTrashBinOutline } from "react-icons/io5";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
const DataTable = ({ data, columns, deleteFunction, type=10 }) => {
  DataTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        buttons: PropTypes.arrayOf(PropTypes.string) ?? [],
      })
    ),
    deleteFunction: PropTypes.func,
    type: PropTypes.number,
  };
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const [activePage, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    if (data) {
      let page = data.length % type==0?data.length/type:data.length/type +1;
      setPageSize(parseInt(page)); 
    }
  }, [data,type]);
  if (!data) return null;

  const neData = (item, key, index, buttons) => {
    if (key === "action") {
      return (
        <div className="flex flex-row gap-2">
          {buttons.includes("update") && (
            <div
              className="cursor-pointer hover:text-blue-500"
              onClick={() => {
                navigate(`update/${item._id}`);
              }}
            >
              <BiMessageSquareEdit />
            </div>
          )}
          {buttons.includes("delete") && (
            <div
              className="cursor-pointer hover:text-red-500"
              onClick={() => {
                setId(item._id);
                open();
              }}
            >
              <IoTrashBinOutline />
            </div>
          )}
        </div>
      );
    }
    if (key === "#") {
      return ((activePage-1)*10+index) + 1;
    }
    if (key.includes(".")) {
      const keys = key.split(".");
      return item ? keys.reduce((acc, curr) => acc ? acc[curr] : null, item) : null;
    }
    return item ? item[key] : null;
  };
  const deleteItem = async () => {
    await deleteFunction(id);
    close();
  };
  return (
    <div className="w-full">
      <Table
        striped
        withRowBorders={false}
        stickyHeader
        stickyHeaderOffset={60}
        verticalSpacing="sm"
      >
        <Table.Thead>
          <Table.Tr>
            {columns?.map((column, index) => (
              <Table.Th key={index}>{column.name}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.length>0?data?.slice((activePage   - 1) * type, activePage * type).map((item, index) => (
            <Table.Tr key={index}>
              {columns?.map((column, i) => (
                <Table.Td key={i}>
                    {column.key==="createdAt"
                    ? new Date(item[column.key]).toLocaleString(undefined, { 
                        year: 'numeric', 
                        month: 'numeric', 
                        day: 'numeric', 
                        hour: 'numeric', 
                        minute: 'numeric' 
                      })
                    : neData(item, column.key, index, column.buttons)}
                </Table.Td>
              ))}
            </Table.Tr>
          )):
          <Table.Tr>
            <Table.Td colSpan={columns?.length} className="text-center">
              Veri bulunamadı
            </Table.Td>
          </Table.Tr>
          }
        </Table.Tbody>
      </Table>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="text-xs text-gray-500">
          Toplam {data.length} kayıt bulunmaktadır.
        </p>
        <Pagination
          total={pageSize}
          value={activePage}
          onChange={setPage}
          mt="sm"
        />
      </div>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title="Silmek istediğinizden emin misiniz?"
      >
        <div className="w-full flex flex-row justify-center items-center gap-2">
          <Button variant="filled" color="yellow" onClick={close}>
            Kapat
          </Button>
          <Button variant="filled" color="red" onClick={deleteItem}>
            Sil
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DataTable;
