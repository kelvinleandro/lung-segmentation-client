const NotFoundPage = () => {
  return (
    <div className="bg-gray-300 h-screen w-full flex flex-col gap-8 items-center py-8">
      <h1 className="text-3xl font-bold text-center">
        Nada por aqui...
      </h1>
      <img
        className="w-[300px] h-auto"
        src="https://i.pinimg.com/originals/89/5c/e7/895ce751ba0379700381d17a67086931.gif"
        alt="NEVER GONNA GIVE YOU UP"
      />
    </div>
  );
}

export default NotFoundPage