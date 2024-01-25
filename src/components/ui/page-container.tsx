type Props = {
  children: React.ReactNode;
};

export const PageContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-screen-2xl">{children}</div>
    </div>
  );
};
