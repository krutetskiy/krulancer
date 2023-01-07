import Image from 'next/image';

const Avatar = () => {
  return (
    <>
      <div className="rounded-2xl bg-gray-regular-1 p-6">
        <div className="relative h-[400px] rounded-2xl">
          <Image className="rounded-2xl" alt="#" src="/profile-image.jpeg" fill />
        </div>
      </div>
    </>
  )
}

export default Avatar;