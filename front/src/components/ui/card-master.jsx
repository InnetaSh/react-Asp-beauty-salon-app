import CardBase from './CardBase';

const CardMaster = ({ name, buttonText, ...rest }) => {
  return (
    <CardBase
      {...rest}
      title={name}
      showPrice={false}
      buttonText = {buttonText}
    />
  );
};

export default CardMaster;
