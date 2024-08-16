"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import { getToken } from '@/utils/config';

type Prediction = {
  _id: string;
  title: string;
  description: string;
};

const Page: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [editPrediction, setEditPrediction] = useState<Prediction | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', details: '' });
  const token = getToken()
  useEffect(() => {
    fetchPredictions();
  }, [token]);

   

  const fetchPredictions = async () => {
    if(token){
      try {
        const response = await axios.get(`/api/user/predictions`,{

          headers: {
            'Content-Type': 'application/json',
            // Include the token if needed
            'Authorization': `Bearer ${token}` 
          },
        });
        setPredictions(response.data);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    }
  };



  //  const fetchPredictions = async () => {
  //   try {
  //     const response = await fetch('/api/predictions', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Include the token if needed
  //         'Authorization': `Bearer ${token}` 
  //       },
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error('There was a problem with the fetch operation:', error);
  //   }
  // }

  const handleAddPrediction = async () => {
    try {
      await axios.post(`/api/user/predictions`, formData);
      fetchPredictions();
      setFormData({ title: '', details: '' });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding prediction:', error);
    }
  };

  const handleDeletePrediction = async (id: string) => {
    try {
      await axios.delete(`/api/user/predictions/${id}`);
      fetchPredictions();
    } catch (error) {
      console.error('Error deleting prediction:', error);
    }
  };

  const handleEditPrediction = async () => {
    if (editPrediction) {
      try {
        await axios.put(`/api/user/predictions/${editPrediction._id}`, formData);
        fetchPredictions();
        setEditPrediction(null);
        setFormData({ title: '', details: '' });
        setIsEditDialogOpen(false);
      } catch (error) {
        console.error('Error editing prediction:', error);
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Predictions</h1>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="mb-6 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Prediction
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Details</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction) => (
            <tr key={prediction._id}>
              <td className="py-2 px-4 border-b">{prediction.title}</td>
              <td className="py-2 px-4 border-b">{prediction.description}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => {
                    setEditPrediction(prediction);
                    setFormData({ title: prediction.title, details: prediction.description });
                    setIsEditDialogOpen(true);
                  }}
                  className="mr-2 bg-yellow-500 text-white py-1 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePrediction(prediction._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Prediction Dialog */}
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger asChild>
          <button className="hidden">Add Prediction</button>
        </Dialog.Trigger>
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white border rounded shadow-lg">
          <Dialog.Title className="text-lg font-bold">Add Prediction</Dialog.Title>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Details</label>
            <textarea
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            ></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button onClick={() => setIsDialogOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded">
              Cancel
            </button>
            <button onClick={handleAddPrediction} className="bg-blue-500 text-white py-2 px-4 rounded">
              Add
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Root>

      {/* Edit Prediction Dialog */}
      <Dialog.Root open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <Dialog.Trigger asChild>
          <button className="hidden">Edit Prediction</button>
        </Dialog.Trigger>
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white border rounded shadow-lg">
          <Dialog.Title className="text-lg font-bold">Edit Prediction</Dialog.Title>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Details</label>
            <textarea
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            ></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button onClick={() => setIsEditDialogOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded">
              Cancel
            </button>
            <button onClick={handleEditPrediction} className="bg-blue-500 text-white py-2 px-4 rounded">
              Save
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default Page;
