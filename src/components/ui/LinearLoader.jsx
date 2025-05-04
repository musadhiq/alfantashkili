const LinearLoader = () => (
    <div className="w-full h-0.5 bg-gray-200 relative overflow-hidden">
        <div className="absolute h-full w-full bg-secondary animate-loading-bar"></div>
    </div>
);

export default LinearLoader;  