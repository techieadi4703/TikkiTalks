const CardItem = ({ title, image }) => {
  return (
    <div className="py-2 flex flex-col items-center text-center shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="border-blue-400 border-b-2">
      <img src={image} alt={title} className="mb-2 w-60 h-60 pb-5" />
      </div>
      <div >
        <h3 className="text-lg font-semibold pt-2">{title}</h3>
      </div>
    </div>
  );
};

export default CardItem;