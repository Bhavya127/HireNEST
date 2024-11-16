import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const postDetails = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "images_preset");
        data.append("cloud_name", "dyuyehrgv");

        fetch("https://api.cloudinary.com/v1_1/dyuyehrgv/image/upload", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                createPost(data.secure_url, data.public_id); // Call createPost with Cloudinary URL and public_id
            })
            .catch((err) => console.error("Error uploading image:", err));
    };

    const createPost = (imageUrl, publicId) => {
        fetch("http://localhost:5000/api/user/upload/createPost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                body,
                image: { public_id: publicId, url: imageUrl }
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.error(data.error);
                } else {
                    console.log("Successfully Posted");
                    navigate("/clienthome");
                }
            })
            .catch((err) => console.error("Error posting:", err));
    };

    const loadFile = (event) => {
        setImage(event.target.files[0]);
        const output = document.getElementById("output");
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src); // Free memory
        };
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-2xl font-semibold">Create New Post</h4>
                <button
                    onClick={postDetails}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Share
                </button>
            </div>
            <div className="mb-6">
                <img
                    id="output"
                    src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
                    alt="preview"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={loadFile}
                    className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-blue-500 hover:file:bg-blue-100"
                />
            </div>
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write a caption...."
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
        </div>
    );
}
