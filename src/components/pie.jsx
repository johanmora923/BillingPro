import { Pie } from "react-chartjs-2";
import { useMemo } from "react";

export const PieGrafic = ({ mostSoldProducts }) => {
    const chartData = useMemo(() => {
        const labels = mostSoldProducts.map((product) => product.name);
        const data = mostSoldProducts.map((product) => product.sales);

        const backgroundColor = [
            "#3B82F6", // blue
            "#10B981", // emerald
            "#F59E0B", // amber
            "#EF4444", // red
            "#8B5CF6", // violet
        ];

        const hoverColor = backgroundColor.map((color) =>
            color.replace(")", ", 0.85)").replace("#", "rgba(" + parseInt(color.slice(1, 3), 16) + "," + parseInt(color.slice(3, 5), 16) + "," + parseInt(color.slice(5, 7), 16))
        );

        return {
            labels,
            datasets: [
                {
                    data,
                    backgroundColor,
                    hoverBackgroundColor: hoverColor,
                    borderColor: "#ffffff",
                    borderWidth: 2,
                },
            ],
        };
    }, [mostSoldProducts]);

    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right",
                labels: {
                    color: "#374151", // gray-700
                    font: {
                        size: 14,
                        family: "Inter, sans-serif",
                        weight: "500",
                    },
                    padding: 16,
                    boxWidth: 18,
                },
            },
            tooltip: {
                backgroundColor: "#111827", // gray-900
                titleColor: "#F9FAFB", // gray-50
                bodyColor: "#E5E7EB", // gray-200
                borderColor: "#4B5563",
                borderWidth: 1,
                padding: 12,
                cornerRadius: 6,
                callbacks: {
                    label: (context) => {
                        const value = context.raw;
                        const total = mostSoldProducts.reduce((acc, product) => acc + product.sales, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${context.label}: ${value} ventas (${percentage}%)`;
                    },
                },
            },
        },
    }), [mostSoldProducts]);

    return (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]">
            <Pie data={chartData} options={chartOptions} />
        </div>
    );
};
