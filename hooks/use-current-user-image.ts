import { genAvatar } from '@/lib/gravatar';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export const useCurrentUserImage = () => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserImage = async () => {
      const { data, error } = await createClient().auth.getSession();
      if (error) {
        console.error(error);
      }

      setImage(
        data.session?.user.user_metadata.avatar_url ?? data.session?.user.email
          ? genAvatar(data.session.user.email!)
          : null,
      );
    };
    fetchUserImage();
  }, []);

  return image;
};
