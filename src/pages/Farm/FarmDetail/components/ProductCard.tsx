import { toAbsoluteUrl } from "../../../../helpers";

interface Props {
  name: string;
  quantity: number;
  price: number;
}

const ProductCard = ({ name, quantity, price }: Props) => {
  return (
    <div className="flex gap-4 h-[150px] w-full border border-dark rounded-xl shadow">
      <img
        src={toAbsoluteUrl("/media/images/test.jpg")}
        alt="product"
        className="w-[200px] h-[150px] object-cover rounded-l-xl"
      />
      <div className="flex flex-col justify-between w-full p-2">
        <span className="flex items-center justify-between">
          <span className="text-dark font-semibold">{name}</span>
          <span className="text-black font-semibold">$ {price} / Lbs</span>
        </span>
        <span className="text-dark">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
        <span className="text-dark">{quantity} Lbs</span>
        <span className="flex justify-end items-center">
          <button className="bg-primary text-white px-3 py-1 rounded">
            View Product
          </button>
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
