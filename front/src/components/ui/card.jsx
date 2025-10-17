import CardBase from './CardBase';

const Card = (props) => {
  return (
    <CardBase
      {...props}
      showPrice={true}
    />
  );
};

export default Card;
