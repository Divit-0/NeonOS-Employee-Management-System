const StatsCard = ({
    title,
    value,
    color
}) => {

    return (

        <div className={`glass p-6 rounded-2xl border ${color}`}>

            <h3 className="text-slate-400 mb-2">
                {title}
            </h3>

            <h1 className="text-4xl font-bold">
                {value}
            </h1>

        </div>
    );
};

export default StatsCard;