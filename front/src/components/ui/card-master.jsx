import CardBase from './CardBase';

const CardMaster = ({ name, ...rest }) => {
  return (
    <CardBase
      {...rest}
      title={name}
      showPrice={false}
      buttonText = "Записаться"
    />
  );
};

export default CardMaster;
