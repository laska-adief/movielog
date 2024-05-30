const LoadingCard = () => {
  return (
    <div className="rounded-lg animate-pulse shadow-sm bg-white">
      <div className="bg-slate-700 h-40 rounded-t-lg"></div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-slate-700 h-6 w-12 rounded-lg"></div>
          <div className="bg-slate-700 h-6 w-8 rounded-lg"></div>
        </div>
        <div className="bg-slate-700 h-6 rounded-lg"></div>
      </div>
    </div>
  );
};
export default LoadingCard;
