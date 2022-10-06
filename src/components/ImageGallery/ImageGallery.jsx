import { ImageGalleryItem } from 'components/ImageGalleryItem';

export const ImageGallery = ({ data, ...otherProps }) => {
  return (
    <ul className="ImageGallery">
      {data.map(item => (
        <ImageGalleryItem key={item.id} item={item} {...otherProps} />
      ))}
    </ul>
  );
};
