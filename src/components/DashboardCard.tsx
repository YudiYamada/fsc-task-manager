type DashboardCardProps = {
  icon: React.ReactNode;
  mainText: string;
  secondaryText: string;
};

const DashboardCard = ({
  icon,
  mainText,
  secondaryText,
}: DashboardCardProps) => {
  return (
    <div className="bg-brand-white flex h-[150px] flex-col items-center justify-center gap-1 rounded-[10px]">
      <div className="flex items-center gap-2">
        <span className="text-brand-primary">{icon}</span>
        <p className="text-brand-dark-blue text-2xl font-semibold">
          {mainText}
        </p>
      </div>
      <div>{secondaryText}</div>
    </div>
  );
};

export default DashboardCard;
