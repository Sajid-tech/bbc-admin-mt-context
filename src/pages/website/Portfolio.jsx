import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";

const Portfolio = () => {
  const [sliderImages, setSliderImages] = useState({});

  const [selectedImages, setSelectedImages] = useState({});
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/panel-fetch-slider`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSliderImages(response.data.slider || {});
        setId(response.data.slider.id || {});
      } catch (error) {
        console.error("Error fetching slider images", error);
      }
    };

    fetchSliderImages();
  }, []);

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    setSelectedImages((prevSelectedImages) => ({
      ...prevSelectedImages,
      [`product_image${index}`]: file,
    }));
  };

  // api/panel-update-slider

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("id", sliderImages.id);

      for (let i = 1; i <= 5; i++) {
        if (selectedImages[`product_image${i}`]) {
          console.log(
            `Adding image ${i}:`,
            selectedImages[`product_image${i}`]
          );
          formData.append(
            `product_image${i}`,
            selectedImages[`product_image${i}`]
          );
        }
      }

      const response = await axios.post(
        `${BASE_URL}/api/panel-update-slider/${id}/?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Portfolio images updated successfully!");
      } else {
        alert("Failed to update portfolio images. Please try again.");
      }
    } catch (error) {
      console.error("Error updating slider images:", error);
      alert("An error occurred while updating the portfolio images.");
    }
  };

  console.log("Slider ID:", id);
  console.log("Slider Images:", sliderImages);

  const imagesArray = Object.entries(sliderImages).slice(1);

  return (
    <Layout>
      <div className="container mx-auto mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form id="addIndiv" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {imagesArray.map(([key, item], index) => (
                <div key={index} className="flex flex-col items-center">
                  <label className="block text-gray-700 mb-2">
                    Portfolio {index + 1} {/* Adjusted to start from 2 */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, index + 1)}
                      className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 p-2 rounded-lg hover:border-blue-200 cursor-pointer bg-gray-50"
                    />
                  </label>
                  <img
                    src={`https://businessboosters.club/public/images/product_images/${item}`}
                    alt={`Portfolio ${index}`}
                    className="w-full h-48 sm:h-56 md:h-72 md:w-72 lg:h-72 rounded-lg shadow-md object-cover mt-4"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex space-x-4 justify-center">
              <button
                type="submit"
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
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;
