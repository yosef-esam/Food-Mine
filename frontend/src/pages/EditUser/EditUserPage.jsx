import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditUser, getById } from "../../services/userServices";

function EditUserPage() {
  const userId = useParams();

  const isEditMode = userId;
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    if (isEditMode) LoadUser();
    console.log(user);
  }, [userId]);
  const LoadUser = async () => {
    await getById(userId.userId).then((user) => {
      setUser(user);
      setName(user.name);
      setEmail(user.email);
      setAddress(user.address);
      setIsAdmin(user.isAdmin);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await EditUser({ ...user, isAdmin, name, email, address });
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-6 text-gray-700 text-center">
          Edit User
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            id="address"
            type="text"
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            id="isAdmin"
            defaultValue={isAdmin}
            type="checkbox"
            onClick={(e) => setIsAdmin(e.target.checked)}
            className="mr-2 leading-tight focus:ring focus:ring-blue-300"
          />
          <label htmlFor="isAdmin" className="text-gray-700 text-sm font-bold">
            Is Admin
          </label>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUserPage;
