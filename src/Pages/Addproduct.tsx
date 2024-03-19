import { Button, ButtonGroup, FileInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Label, TextInput, Textarea, Select } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import useStoreProducts from "../App/ProductsSet";
import React, { ChangeEvent } from "react";

import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import { NavLink, Navigate } from "react-router-dom";

const Addproduct = () => {
  let [torf, setTorf] = useState(false);

  let { allProducts, waites, setProducts, getProducts }: any =
    useStoreProducts();

  let [val, setVal] = useState<{
    name: string;
    price: string;
    img: string;
    description: string;
    category: string;
  }>({
    name: "The Dandy Chair",
    price: "250",
    img: "",
    description:
      "A timeless design, with premium materials features as one of our most popular and iconic pieces. The dandy chair is perfect for any stylish living space with beech legs and lambskin leather upholstery.",
    category: "Homeware",
  });

  let [error, setError] = useState(true);
  let [Saqla, setSaqla] = useState(true);

  const [img, setImg] = useState(null);

  const [product, setProduct] = useState<{ img: string | null }>({
    img: "",
  });

  const handleUploadImage = async (e: any) => {
    const img = e.target.files[0];
    setImg(e.target.files[0]);
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + img.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        () => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProduct({ ...product, img: downloadURL });
            setVal({ ...val, img: downloadURL });
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  let submitValues = async () => {
    if (
      val.category !== "" &&
      val.description !== "" &&
      val.img !== "" &&
      val.name !== "" &&
      val.img !== ""
    ) {
      setProducts(val);
      setError(true);
      setVal({ name: "", price: "", img: "", description: "", category: "" });
      product.img = null;
      setSaqla(false);
      <Navigate to="/" />;
    } else {
      setError(false);
      setSaqla(true);
    }
  };

  return (
    <div className="w-[700px] mx-auto">
      <form>
        <div className="container py-[30px]  w-[600px] mx-[30px]  mt-[70px] bg-white">
          <div className="py-[10px]">
            <h1 className="text-3xl text-center text-gray-700">Add product</h1>
            <div className="text-center">
              <div className={Saqla ? "hidden" : "block"}>
                <p className="text-sky-600">
                  Mahsulotingiz muvaffaqiyatli saqlandi!
                </p>
              </div>
              <div className={error ? "hidden" : "block"}>
                <p className="text-red-500">
                  Ma'lumot to'liq emas, to'ldirib qayta harakat qiling!
                </p>
              </div>
            </div>
            <div className=" p-2 mx-auto">
              <label htmlFor="" className="mb-3 block text-xl">
                Product photo
              </label>
              <FileInput onChange={handleUploadImage} />
              <div className="relative">
                {product.img && (
                  <div className="absolute right-[-40px] top-[-40px] flex items-center">
                    <i className="bx bxs-file-png text-[40px] text-yellow-200"></i>
                    <i className="bx bxs-check-circle absolute top-0 right-0 text-green-400"></i>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex  mx-auto flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="small" value="Product Name" />
              </div>
              <TextInput
                value={val.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setVal({
                    name: e.target.value,
                    price: val.price,
                    img: val.img,
                    description: val.description,
                    category: val.category,
                  })
                }
                id="small"
                type="text"
                sizing="sm"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="base" value="Product Price" />
              </div>
              <TextInput
                value={val.price}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setVal({
                    name: val.name,
                    price: e.target.value,
                    img: val.img,
                    description: val.description,
                    category: val.category,
                  })
                }
                id="base"
                type="number"
                sizing="md"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Description" />
              </div>
              <Textarea
                value={val.description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setVal({
                    name: val.name,
                    price: val.price,
                    img: val.img,
                    description: e.target.value,
                    category: val.category,
                  })
                }
                id="comment"
                placeholder="Mahsulot xususiyatlarini kiriting..."
                required
                rows={4}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Select product category" />
              </div>
              <Select
                value={val.category}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setVal({
                    name: val.name,
                    price: val.price,
                    img: val.img,
                    description: val.description,
                    category: e.target.value,
                  })
                }
                id="countries"
                required
              >
                <option>Furniture</option>
                <option>Homeware</option>
                <option>Sofas</option>
                <option>Light fittings</option>
                <option>Accessories</option>
              </Select>
            </div>
            <Button onClick={() => submitValues()} label="2">
              Saqlash
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addproduct;
