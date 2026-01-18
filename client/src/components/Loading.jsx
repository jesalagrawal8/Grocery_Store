import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Loading = () => {
  const { navigate } = useAppContext();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextURL = query.get("next");

  useEffect(() => {
    if (nextURL) {
      setTimeout(() => {
        navigate(`/${nextURL}`);
      }, 2000);
    }
  }, [nextURL, navigate]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-indigo-500"></div>
    </div>
  );
};

export default Loading;
