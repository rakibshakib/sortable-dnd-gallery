import image1 from "../assets/images/image-1.webp";
import image2 from "../assets/images/image-2.webp";
import image3 from "../assets/images/image-3.webp";
import image4 from "../assets/images/image-4.webp";
import image5 from "../assets/images/image-5.webp";
import image6 from "../assets/images/image-6.webp";
import image7 from "../assets/images/image-7.webp";
import image8 from "../assets/images/image-8.webp";
import image9 from "../assets/images/image-9.webp";
import image10 from "../assets/images/image-10.jpeg";
import image11 from "../assets/images/image-11.jpeg";

const imagesDataSet = [
  {
    img: image1,
    id: 1,
    isSelected: false,
  },
  {
    img: image2,
    id: 2,
    isSelected: false,
  },
  {
    img: image3,
    id: 3,
    isSelected: false,
  },
  {
    img: image4,
    id: 4,
    isSelected: false,
  },
  {
    img: image5,
    id: 5,
    isSelected: false,
  },
  {
    img: image6,
    id: 6,
    isSelected: false,
  },
  {
    img: image7,
    id: 7,
    isSelected: false,
  },
  {
    img: image8,
    id: 8,
    isSelected: false,
  },
  {
    img: image9,
    id: 9,
    isSelected: false,
  },
  {
    img: image10,
    id: 10,
    isSelected: false,
  },
  {
    img: image11,
    id: 11,
    isSelected: false,
  },
];

export const initialState = {
  imagesList: imagesDataSet || [],
};
