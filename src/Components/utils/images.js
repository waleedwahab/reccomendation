const images = {
  images: [
    { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750" },
    {
      image:
        "https://architecturebeast.com/wp-content/uploads/2018/04/Simple-modern-house-with-an-amazing-floating-stairs-Architecture-Beast-33-main-min.jpg",
    },
    {
      image:
        "https://www.mydomaine.com/thmb/XLIl7bniDtQ-zx8o_9R-wgmAsHE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/MaydanArchitects2-7d8ed56fa3a846e08130ac68bf41267d.jpg",
    },
    {
      image:
        "https://www.mydomaine.com/thmb/uYobv04JAzweRmKAceORrM6ycUs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1369-03-copy-1b6760fab1984e4393ca4082b2780c7c.jpg",
    },
    {
      image:
        "https://www.mydomaine.com/thmb/TUFH7cxIFbCymov0SeRu1ZX-bPQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/IMG_1266-1240x827-740d518231c54b98bd6316437e9408d3.jpg",
    },
    {
      image:
        "https://www.mydomaine.com/thmb/qfc13qpHnxMkqp8Ja-XwYjC1JQ8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SuCasaDesign-Modern-9335be77ca0446c7883c5cf8d974e47c.jpg",
    },
    {
      image:
        "https://architecturebeast.com/wp-content/uploads/2018/04/Simple-modern-house-with-an-amazing-floating-stairs-Architecture-Beast-33-main-min.jpg",
    },
    {
      image:
        "https://www.mydomaine.com/thmb/8Gqt3pK0zRXK9dJ9kHl-7AUaEeo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SuCasaDesign-Modern2-ec89013bd4d74c6693f8247eee10134b.jpg",
    },
    {
      image:
        "https://www.mydomaine.com/thmb/8Gqt3pK0zRXK9dJ9kHl-7AUaEeo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SuCasaDesign-Modern2-ec89013bd4d74c6693f8247eee10134b.jpg",
    },
  ],
};

export const getRandomHouseImage = () => {
  const randomIndex = Math.floor(Math.random() * images.images.length);
  return images.images[randomIndex].image;
};

export default images;
