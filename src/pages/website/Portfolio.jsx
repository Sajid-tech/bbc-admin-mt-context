import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import toast, { Toaster } from "react-hot-toast";

const Portfolio = () => {
  const [sliderImages, setSliderImages] = useState({});

  const [selectedFile1, setSelectedFile1] = React.useState(null);
  const [selectedFile2, setSelectedFile2] = React.useState(null);
  const [selectedFile3, setSelectedFile3] = React.useState(null);
  const [selectedFile4, setSelectedFile4] = React.useState(null);
  const [selectedFile5, setSelectedFile5] = React.useState(null);
  const [ids, setIds] = useState(null);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/panel-fetch-slider`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSliderImages(response?.data?.slider || {});
        setIds(response.data.slider.id || {});
      } catch (error) {
        console.error("Error fetching slider images", error);
      }
    };

    fetchSliderImages();
  }, []);

  // api/panel-update-slider

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("product_image1", selectedFile1);
      data.append("product_image2", selectedFile2);
      data.append("product_image3", selectedFile3);
      data.append("product_image4", selectedFile4);
      data.append("product_image5", selectedFile5);

      console.log("Slider ID put:", ids);

      await axios({
        url: BASE_URL + "/api/panel-update-slider/" + ids + "?_method=PUT",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        if (res.data.code == "200") {
          toast.success("Portfolio update succesfully");
        } else {
          toast.error("Failed to update portfolio images. Please try again.");
        }
      });
      // toast.success("Update Succesfully");
    } catch (error) {
      console.error("Error updating slider images:", error);
      toast.error("Err While Updating");
    }
  };

  console.log("Slider Images:", sliderImages);

  return (
    <Layout>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "white",
              marginTop: "48px",
              padding: "12px",
            },
          },
          error: {
            style: {
              background: "red",
              marginTop: "48px",
              padding: "12px",
            },
          },
        }}
        position="top-right"
        reverseOrder={false}
      />
      <div className="container mx-auto mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 1 st  */}
            <div className="flex flex-col items-center">
              <label className="block text-gray-700 mb-2">
                Portfolio 1 {/* Adjusted to start from 2 */}
                <input
                  name="product_image1"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile1(e.target.files[0])}
                  className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 p-2 rounded-lg hover:border-blue-200 cursor-pointer bg-gray-50"
                />
              </label>
              {sliderImages.product_image1 && (
                <img
                  src={`https://businessboosters.club/public/images/product_images/${sliderImages.product_image1}`}
                  alt="product_image1"
                  className="w-full h-48 sm:h-56 md:h-72 md:w-72 lg:h-72 rounded-lg shadow-md object-cover mt-4"
                />
              )}
            </div>
            {/* 2nd */}
            <div className="flex flex-col items-center">
              <label className="block text-gray-700 mb-2">
                Portfolio 2 {/* Adjusted to start from 2 */}
                <input
                  name="product_image2"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile2(e.target.files[0])}
                  className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 p-2 rounded-lg hover:border-blue-200 cursor-pointer bg-gray-50"
                />
              </label>
              {sliderImages.product_image2 && (
                <img
                  src={`https://businessboosters.club/public/images/product_images/${sliderImages.product_image2}`}
                  alt="product_image2"
                  className="w-full h-48 sm:h-56 md:h-72 md:w-72 lg:h-72 rounded-lg shadow-md object-cover mt-4"
                />
              )}
            </div>
            {/* 3rd  */}
            <div className="flex flex-col items-center">
              <label className="block text-gray-700 mb-2">
                Portfolio 3 {/* Adjusted to start from 2 */}
                <input
                  name="product_image3"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile3(e.target.files[0])}
                  className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 p-2 rounded-lg hover:border-blue-200 cursor-pointer bg-gray-50"
                />
              </label>
              {sliderImages.product_image3 && (
                <img
                  src={`https://businessboosters.club/public/images/product_images/${sliderImages.product_image3}`}
                  alt="product_image3"
                  className="w-full h-48 sm:h-56 md:h-72 md:w-72 lg:h-72 rounded-lg shadow-md object-cover mt-4"
                />
              )}
            </div>
            {/* 4  */}
            <div className="flex flex-col items-center">
              <label className="block text-gray-700 mb-2">
                Portfolio 4 {/* Adjusted to start from 2 */}
                <input
                  name="product_image4"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile4(e.target.files[0])}
                  className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 p-2 rounded-lg hover:border-blue-200 cursor-pointer bg-gray-50"
                />
              </label>
              {sliderImages.product_image4 && (
                <img
                  src={`https://businessboosters.club/public/images/product_images/${sliderImages.product_image4}`}
                  alt="product_image4"
                  className="w-full h-48 sm:h-56 md:h-72 md:w-72 lg:h-72 rounded-lg shadow-md object-cover mt-4"
                />
              )}
            </div>
            {/* 5  */}
            <div className="flex flex-col items-center">
              <label className="block text-gray-700 mb-2">
                Portfolio 5 {/* Adjusted to start from 2 */}
                <input
                  name="product_image5"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile5(e.target.files[0])}
                  className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 p-2 rounded-lg hover:border-blue-200 cursor-pointer bg-gray-50"
                />
              </label>
              {sliderImages.product_image5 && (
                <img
                  src={`https://businessboosters.club/public/images/product_images/${sliderImages.product_image5}`}
                  alt="product_image5"
                  className="w-full h-48 sm:h-56 md:h-72 md:w-72 lg:h-72 rounded-lg shadow-md object-cover mt-4"
                />
              )}
            </div>
          </div>

          <div className="mt-6 flex space-x-4 justify-center">
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
            >
              Update
            </button>
            <Link to="#">
              <button
                disabled
                type="button"
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;
