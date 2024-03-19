import { Link, NavLink } from "react-router-dom";

const SaidBar = ({ setUser }) => {
  return (
    <div className=" w-[315px] rounded-2xl my-[5px] bg-white h-screen pl-[45px] mb-[10px] ml-[5px]">
      <div className=" flex items-center justify-start gap-3  py-[58px]">
        <img src="logo.jpg" alt="" className="w-[50px] h-[50px]" />
        <p className="text-[24px] font-bold text-[#535353]"> Avion</p>
      </div>
      <div className="flex items-center justify-start gap-[12px]  pb-[30px]">
        <img src="products.svg" alt="" className="w-[40px] ml-[-5px]" />
        <Link to="/all" className="text-[#4f4f4f] text-[24px] ml-[-5px]">
          Products
        </Link>
      </div>
      <div className="flex items-center justify-start gap-[12px]  pb-[30px]">
        <img src="shopping.svg" alt="" />
        <Link to="/add" className="text-[#4f4f4f] text-[24px]">
          Add product
        </Link>
      </div>

      <div className="flex items-center justify-start gap-[12px]  pb-[30px]">
        <img src="shipping.svg" alt="" />
        <Link className="text-[#CDCDCD] text-[24px]">Shipments</Link>
      </div>
      <div className="flex items-center justify-start gap-[12px]  pb-[30px]">
        <img src="payment.svg" alt="" />
        <Link className="text-[#CDCDCD] text-[24px]">Transactions</Link>
      </div>
      <div className="flex items-center justify-start gap-[12px]  pb-[30px]">
        <img src="setting.svg" alt="" />
        <Link className="text-[#CDCDCD] text-[24px]">Settings</Link>
      </div>
      <div className="flex items-center justify-start gap-[12px]  pb-[30px]">
        <img src="logout.svg" alt="" />
        <button onClick={() => setUser("")}>
          <NavLink to={"/"} className="text-[#4f4f4f] text-[24px]">
            Logout
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default SaidBar;
