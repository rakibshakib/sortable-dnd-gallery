const GridBox = ({ children, columns }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: 15,
        maxWidth: "800px",
        margin: "0 auto",
        padding: 30
      }}
    >
      {children}
    </div>
  );
};

export default GridBox;
