const DashboardCardItem = ({ card }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
          {card?.title}
        </p>
        <p className="text-xl font-bold text-[#e394551] mt-2">{card?.count}</p>
        <p className="text-xs text-green-600 mt-1 flex items-center">
          {card?.change}
        </p>
      </div>
      <div
        className={`w-10 h-10 bg-gradient-to-br ${card?.color} rounded-xl flex items-center justify-center`}
      >
        {card?.icon}
      </div>
    </div>
  );
};
export default DashboardCardItem;
