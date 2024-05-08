const TechIconCard = ({
  imgSrc,
  altImgSrc,
  title,
}: {
  imgSrc: string;
  altImgSrc: string;
  title: string;
}) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img style={{ width: "64", height: "64px" }} src={imgSrc} alt={altImgSrc} />
        <p>{title}</p>
      </div>
    </>
  );
};

export default TechIconCard;
