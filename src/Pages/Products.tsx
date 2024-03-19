import useStoreProducts from "../App/ProductsSet";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Modal } from "flowbite-react";
import axios from "axios";

const Products = () => {
  const [Search, setSearch] = useState("");
  const [Select, setSelect] = useState("");
  let {
    allProducts,
    getProducts,
    loading,
    v,
    DaleteProduct,
    GetIdProduct,
    idsProduct,
    EdidProduct,
  } = useStoreProducts();
  let [a, setA] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  let [val, setval] = useState<{
    id: string;
    name: string;
    price: string;
    img: string;
    description: string;
    category: string;
  }>({ id: "", name: "", price: "", img: "", description: "", category: "" });

  let daletid = (ii: number): void => {
    if (confirm("Mahsulotni o'chirmoqchimisiz?")) {
      DaleteProduct(ii);
      setA(a + 100);
      getProducts();
    }
  };

  let func = async () => {
    getProducts();
  };

  let EditedValue = async (id: number) => {
    let a = await axios.get(
      `https://65f4af82f54db27bc0223815.mockapi.io/api/products/${id}`
    );
    let b = await a.data;
    setval(b);
    setOpenModal(true);
  };

  let SavedPruduct = (id: any) => {
    EdidProduct(id);
    getProducts();
    setA(a + 1000);
    setOpenModal(false);
  };

  useEffect(() => {
    getProducts();
    func();
  }, [a]);

  return (
    <div className="w-[900px] mx-auto">
      <div
        className="flex justify-between items-center
    "
      >
        <input
          type="email"
          name=""
          id=""
          placeholder="Searching..."
          className="rounded-lg"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          name="select"
          id="select"
          className="rounded-lg"
          onChange={(e) => setSelect(e.target.value)}
        >
          <option value="">All products</option>
          <option value={"Furniture"}>Furniture</option>
          <option value={"Homeware"}>Homeware</option>
          <option value={"Sofas"}>Sofas</option>
          <option value={"Light fittings"}>Light fittings</option>
          <option value={"Accessories"}>Accessories</option>
        </select>
      </div>
      {loading ? (
        <div className="w-full h-dvh flex flex-col justify-center items-center">
          <p className="text-center">Yuklanmoqda...</p>
        </div>
      ) : (
        <section className="py-[30px] rounded-xl  mt-[30px] bg-white">
          <div className="container">
            {/* //////////////// */}
            {/* / */}
            <div className="w-full flex flex-col items-center gap-y-[50px] border-b">
              <div className="w-full px-5 flex items-center justify-between text-[18px] font-bold">
                <p className="">Picture</p>
                <p className="">Name</p>
                <p className="">Price</p>
                <p className="">Category</p>
                <p className="">Action</p>
              </div>
              {allProducts
                .filter((e) => {
                  if (Search === "" && Select === "") {
                    return e;
                  } else if (
                    e.name.toLowerCase().includes(Search.toLowerCase()) &&
                    e.category.toLowerCase().includes(Select.toLowerCase())
                  ) {
                    return e;
                  }
                })
                .map(
                  (
                    e: {
                      img: string;
                      name: string;
                      price: number;
                      category: string;
                      description: string;
                      id: number;
                    },
                    i
                  ) => (
                    <div
                      className="flex gap-y-[10px] border-b flex-col md:flex-row md:justify-between w-full lg:items-center  cursor-pointer hover:bg-slate-200 rounded-md p-1"
                      key={i}
                    >
                      <img
                        className="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]"
                        src={e.img}
                        alt="alt"
                      />
                      <p className="text-[15px]">{e.name}</p>
                      <p className="text-[15px]">£{e.price}</p>
                      <p className="text-[15px]">{e.category}</p>
                      <div className="flex gap-1">
                        <button
                          onClick={() => EditedValue(e.id)}
                          className="bg-blue-600 text-white px-3 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => daletid(e.id)}
                          className="bg-red-600 text-white px-3 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </section>
      )}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit product</Modal.Header>
        <Modal.Body>
          <form className="space-y-6">
            <div className="flex items-center">
              <img className=" mx-auto" src={val.img} alt="alt" />
            </div>
            <label htmlFor="p._name" className="mb-[-20px]">
              Name:
            </label>
            <input
              className="block w-full"
              type="text"
              value={val.name}
              onChange={(e) =>
                setval({
                  name: e.target.value,
                  price: val.price,
                  img: val.img,
                  description: val.description,
                  category: val.category,
                  id: val.id,
                })
              }
            />
            <label htmlFor="p._prace">Price:</label>
            <input
              className="block w-full"
              type="text"
              value={val.price}
              onChange={(e) =>
                setval({
                  name: val.name,
                  price: e.target.value,
                  img: val.img,
                  description: val.description,
                  category: val.category,
                  id: val.id,
                })
              }
            />
            <label htmlFor="p._des">Description:</label>
            <input
              className="block w-full"
              type="text"
              value={val.description}
              onChange={(e) =>
                setval({
                  name: val.name,
                  price: val.price,
                  img: val.img,
                  description: e.target.value,
                  category: val.category,
                  id: val.id,
                })
              }
            />
            <label htmlFor="p._Cat">Category:</label>
            <input
              className="block w-full"
              type="text"
              value={val.category}
              onChange={(e) =>
                setval({
                  name: val.name,
                  price: val.price,
                  img: val.img,
                  description: val.description,
                  category: e.target.value,
                  id: val.id,
                })
              }
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => SavedPruduct(val)}>Change</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
