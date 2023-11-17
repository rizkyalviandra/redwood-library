type AvatarProps = {
  imageSrc: string
}

const Avatar: React.FC<AvatarProps> = ({ imageSrc }) => {
  return (
    <img
      className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
      alt="avatar"
      src={imageSrc}
    />
  )
}

export default Avatar
