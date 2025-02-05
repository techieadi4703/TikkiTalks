import CardItem from "./Cards";

const cardData = [
  {
    title: "Meet India's biggest Tech Giants",
    image:
      "https://thumbs.dreamstime.com/b/two-businessmen-business-meeting-discussing-new-project-laptop-office-vector-illustration-isolated-white-95143332.jpg",
  },
  {
    title: "Connect with like-minded people",
    image:
      "https://media.istockphoto.com/id/1212563469/vector/people-icons-think-different-sign-vector-illustration.jpg?s=612x612&w=0&k=20&c=iZzedYaTWA6PvvgEotorNNTg3Az_Turb2V3Boekc1GQ=",
  },
  {
    title: "Opportunities to work on a real life problem statement",
    image:
      "https://t3.ftcdn.net/jpg/02/51/30/52/360_F_251305284_M7NOdeDXcXx44WkUWkHQijztn3yneroq.jpg",
  },
  {
    title: "Job Opportunities",
    image:
      "https://media.istockphoto.com/id/1156527377/vector/businessman-holding-a-briefcase-in-hand.jpg?s=612x612&w=0&k=20&c=nYnoH26V8u0-_GpXTzh9Dwzt6vhYiYZK53y1ZRgreAo=",
  },
  {
    title: "Get free food & fun environment",
    image:
      "https://img.freepik.com/free-vector/takeaway-packages-3d-vector-illustration-coffee-soda-cup-burger-fast-food-packs-from-restaurant-cartoon-style-isolated-white-background-fast-food-shop-menu-concept_778687-647.jpg",
  },
  {
    title: "Chance to win exciting swags and goodies",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/912/460/small_2x/beautiful-gift-clipart-generative-ai-png.png",
  },
];

const Hello = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 p-12 bg-blue-300">
      {cardData.map((card, index) => (
        <CardItem key={index} title={card.title} image={card.image} />
      ))}
    </div>
  );
};

export default Hello;
