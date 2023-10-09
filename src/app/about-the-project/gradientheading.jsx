function GradientHeading({ children, gradient }) {
  return (
    <div className="relative">
      <h1
        className={`
                    text-5xl font font-extrabold p-1 
                    text-transparent bg-clip-text
                    bg-gradient-to-r ${gradient}
                `}
      >
        {children}
      </h1>

      <div
        className={`
                    absolute inset-0 blur-3xl opacity-70 
                    bg-gradient-to-r ${gradient} animate-pulse
                `}
      />
    </div>
  );
}

export default GradientHeading;
