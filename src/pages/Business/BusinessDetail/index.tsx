import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { setHeader } from "../../../redux/slices/headerSlice";

const BusinessDetail = () => {
  const business = useSelector((state: RootState) => state.business.business);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeader("Business Detail | " + business?.name));
  }, [business]);

  return (
    <div className="flex flex-col">
      <span>{business?.name}</span>
      <span>{business?.email}</span>
      <span>{business?.phone}</span>
    </div>
  );
};

export default BusinessDetail;
