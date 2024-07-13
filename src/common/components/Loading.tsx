import { ProgressSpinner } from "primereact/progressspinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <ProgressSpinner
        style={{ width: "100px", height: "100px" }}
        strokeWidth="6"
        animationDuration=".5s"
      />
    </div>
  );
};

export default Loading;
