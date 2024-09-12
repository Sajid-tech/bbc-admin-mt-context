import React from "react";
import { FiLoader } from "react-icons/fi";
import Layout from "../layout/Layout";

const Loader = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white/1 backdrop-blur-sm fixed inset-0 z-50">
        <FiLoader className="animate-spin text-blue-500" size={80} />

        <p className="mt-4 text-lg text-gray-600">Hey there how are you?</p>
      </div>
    </Layout>
  );
};

export default Loader;
