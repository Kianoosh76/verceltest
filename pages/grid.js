import React from "react";

const Card = ({ imageSrc, title, description }) => (
  <div className="card bg-white border border-2 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
    <img
      src={imageSrc}
      alt={title}
      className="card-image w-full h-32 object-cover rounded-lg"
    />
    <h2 className="card-title text-xl font-semibold mt-2">{title}</h2>
    <p className="card-description text-gray-600">{description}</p>
  </div>
);

const GridLayout = () => {
  const cards = [
    {
      imageSrc:
        "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcS4qSbzsK1AsPz1D1WXLaXZOUwr6Wahrm58Uz9V0Oi68W4Vo2-6cpNsI6wtXR_h9WDUDHhguPt8d-Mkl88sdcb6dxNZEhf5HvYL0R3Swg",
      title: "New York City",
      description:
        "The city that never sleeps, known for its iconic skyline, Times Square, and Central Park.",
    },
    {
      imageSrc:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/07/a8/2c/caption.jpg?w=1400&h=1400&s=1",
      title: "Paris",
      description:
        "The capital of France, famous for the Eiffel Tower, art, and romantic ambiance.",
    },
    {
      imageSrc: "https://media.nomadicmatt.com/2024/tokyothings.jpeg",
      title: "Tokyo",
      description:
        "A bustling metropolis blending modern skyscrapers with traditional temples.",
    },
    {
      imageSrc:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/640px-London_Skyline_%28125508655%29.jpeg",
      title: "London",
      description:
        "The capital of England, known for its historic landmarks like Big Ben and the Tower of London.",
    },
    {
      imageSrc:
        "https://cdn.britannica.com/71/188471-050-CF188A6B/Sydney-Opera-House-Port-Jackson.jpg",
      title: "Sydney",
      description:
        "A vibrant city famous for its Sydney Opera House and beautiful harbor.",
    },
    {
      imageSrc:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Dubai_Skylines_at_night_%28Pexels_3787839%29.jpg/640px-Dubai_Skylines_at_night_%28Pexels_3787839%29.jpg",
      title: "Dubai",
      description:
        "A modern city known for its ultramodern architecture, luxury shopping, and lively nightlife.",
    },
    {
      imageSrc:
        "https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateRome_Hero_shutterstock789412159.jpg",
      title: "Rome",
      description:
        "The capital of Italy, rich in history with landmarks like the Colosseum and the Vatican.",
    },
    {
      imageSrc:
        "https://static.independent.co.uk/2023/03/10/14/iStock-1320014700.jpg",
      title: "Barcelona",
      description:
        "A city in Spain known for its art, architecture, and vibrant street life.",
    },
    {
      imageSrc:
        "https://www.sftravel.com/sites/default/files/styles/hero/public/2022-10/painted-ladies-city-skyline-twilight.jpg.webp?itok=MVU3kPdc",
      title: "San Francisco",
      description:
        "Known for the Golden Gate Bridge, steep streets, and vibrant cultural scene.",
    },
    {
      imageSrc:
        "https://www.discoverhongkong.com/content/dam/dhk/intl/explore/attractions/the-charm-of-the-bright-city/the-charm-of-the-bright-city-1920x1080.jpg",
      title: "Hong Kong",
      description:
        "A major port and global financial hub with a skyline filled with skyscrapers.",
    },
  ];
  return (
    <div
      className="grid-container m-8 container mx-auto p-4 rounded bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      id="grid"
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          imageSrc={card.imageSrc}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default GridLayout;
