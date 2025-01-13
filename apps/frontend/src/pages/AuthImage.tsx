

const AuthImagePattern = ({ 
  title, 
  subtitle 
}: { 
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 h-screen">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`
                aspect-square 
                rounded-2xl 
                bg-gradient-to-tr 
                from-blue-500/80 
                to-blue-600/80
                ${i % 2 === 0 ? "animate-pulse" : ""}
              `}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;