import "./PromoteCard.css";

interface PromoteCardProps {
  icon: string;
  title: string;
  description: string;
}

const PromoteCard = ({ icon, title, description }: PromoteCardProps) => {
  return (
    <div className="group relative w-[300px] h-[350px] rounded-lg shadow-lg p-5 bg-white shadow-gray-400 border border-gray-200 cursor-pointer overflow-hidden">
      <div className="flex flex-col space-y-5 items-center justify-center h-full transition-all duration-300 ease-in-out transform group-hover:translate-y-[-65px]">
        <img src={icon} alt={title} className="w-16 h-16" />
        <h3 className="text-2xl text-dark font-semibold font-montserrat text-center">{title}</h3>
      </div>
      <p className="absolute bottom-2 left-0 w-full text-center text-sm text-dark font-light font-montserrat p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        {description}
      </p>
    </div>
  );
};

export default PromoteCard;
