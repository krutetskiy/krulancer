import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const AuthGuard = () => {
  const router = useRouter();
  const session = useSession()

  useEffect(() => {
    if (session.status === 'unauthenticated')
      router.push("/")
  })

  return <></>
}

export default AuthGuard;