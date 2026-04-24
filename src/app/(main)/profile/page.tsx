"use client";

import { useProfile, useUpdateAvatarUrl } from "@/lib/hooks/useProfile";
import Image from "next/image";
import { useState } from "react";

export default function ProfilePage() {
  const { data: user, isLoading, isError } = useProfile();
  const { mutate: updateAvatarUrlMutate } = useUpdateAvatarUrl();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");

  if (isLoading) {
    return <div className="p-6 text-sm text-gray-500">Loading profile...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load profile</div>;
  }

  if (!user) {
    return <div className="p-6 text-gray-500">User not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        {/* HEADER */}
        <div className="flex items-center gap-4 pb-6 border-b">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt="avatar"
              width={64}
              height={64}
              className="rounded-full object-cover border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-600 border">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h1 className="text-lg font-semibold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* BODY */}
        <div className="pt-6 space-y-4 text-sm">
          <div className="flex justify-between items-center">
            <p className="text-gray-500">Joined</p>
            <p className="font-medium text-gray-900">
              {new Date(user.createdAt).toLocaleDateString("en-GB")}
            </p>
          </div>

          <div>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => updateAvatarUrlMutate(avatarUrl)}
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Update Avatar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}