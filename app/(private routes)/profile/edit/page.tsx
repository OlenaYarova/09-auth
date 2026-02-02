"use client"

import css from "./EditProfilePage.module.css" 
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import { useAuthStore } from '@/lib/store/authStore';
import Image from "next/image";
import toast from 'react-hot-toast';

const EditProfilePage = () => {
  const router = useRouter();
    const user = useAuthStore(state => state.user);
    const setUser = useAuthStore(state => state.setUser);
    
  const [username, setUsername] = useState<string | undefined >(user?.username);
 

    const editProfilePageMutation = useMutation({
        mutationFn: updateMe,
        onSuccess: async () => {
            const updateUser = await getMe();
            setUser(updateUser);
            router.push('/profile');
        },
        onError: () => {
            toast.error('Failed! Please try again.')
        }
 })

     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
    
  const handleSubmit =  (formData: FormData) => {
    const newUsername = formData.get('username') as string;
    if (newUsername.length > 50) {
      toast.error('Username must be between 3 and 50 characters!');
      return;
    }

    editProfilePageMutation.mutate(newUsername);
  };


 
  const handleCancel = () => {
    router.push("/profile");
  };


    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>
                {user ? (
                    <>
                        <Image src={user.avatar}
                            alt="User Avatar"
                            width={120}
                            height={120}
                            className={css.avatar}
                        />

                        <form action={handleSubmit} className={css.profileInfo}>
                            <div className={css.usernameWrapper}>
                                <label htmlFor="username">Username:</label>
                                <input id="username"
                                    type="text"
                                    className={css.input}
                                    defaultValue={username}
                                    onChange={handleInputChange}
                                    disabled={editProfilePageMutation.isPending}
                                />
                            </div>

                            <p>Email:{user.email}</p>

                            <div className={css.actions}>
                                <button
                                    type="submit"
                                    className={css.saveButton}
                                    disabled={editProfilePageMutation.isPending}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className={css.cancelButton}
                                    disabled={editProfilePageMutation.isPending}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </>
    ) : (
                <div>User not found. Please sing in.</div>  
    )}
            </div>
        </main>

    );
}