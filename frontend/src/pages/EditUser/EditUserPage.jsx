import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditUser, getById } from "../../services/userServices";

function EditUserPage() {
  const { userId } = useParams();
  const isEditMode = Boolean(userId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    isAdmin: false,
  });

  useEffect(() => {
    if (!isEditMode) return;

    const loadUser = async () => {
      const user = await getById(userId);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        isAdmin: user.isAdmin || false,
      });
    };

    loadUser();
  }, [userId, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await EditUser({ id: userId, ...formData });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-6 text-center">
          Edit User
        </h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="input"
        />

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="input"
        />

        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="input"
        />

        <label className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
          />
          Is Admin
        </label>

        <button className="btn-primary mt-6 w-full">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditUserPage;
