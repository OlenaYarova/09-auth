import css from "./ProfilePage.module.css"
import { Metadata } from 'next';
import { getMe } from "../../../lib/api/serverApi"
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata(): Promise<Metadata> {
  const { username, avatar } = await getMe()

  return {
    title: `Profile: ${username}`,
    description: `View the profile of ${username}`,
    openGraph: {
      title: `Profile: ${username}`,
      description:`View the profile of ${username}`,
      url: `https://localhost:3000/profile`,
      siteName: 'NoteHub',
      images: [
        {
          url: avatar,
          width: 1200,
          height: 630,
          alt:`${username} avatar`,
        },
      ],
    },
  }
}


const Profile = async () => {
  const { username, email, avatar } = await getMe();
    
    
    return(
        <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href= "/profile/edit" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      <Image
        src={avatar}
        alt={username}
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {username}
      </p>
      <p>
        Email: {email}
      </p>
    </div>
  </div>
</main>

    )
}

export default Profile;