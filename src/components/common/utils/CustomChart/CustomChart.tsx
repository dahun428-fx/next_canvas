import { useEffect, useMemo, useRef } from 'react';
import { Chart } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	BubbleDataPoint,
	ChartData,
	ChartType,
	ChartTypeRegistry,
	Point,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	PointElement,
	LineElement,
	ArcElement,
	RadialLinearScale,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	RadialLinearScale,
	ArcElement,
	Title,
	Tooltip,
	Legend
);

export type CustomChartDoughnutData = {
	[key: string]: number;
};
export type CustomChartLineData = {
	label: string;
	data: number[];
};
export type CustomChartData = CustomChartDoughnutData | CustomChartLineData[];

type Props = {
	className?: string;
	dataLabels: string[];
	// chartData: CustomChartData;
	chartDoughnutData?: CustomChartDoughnutData;
	chartLineData?: CustomChartLineData[];
	chartName?: string;
	colors?: string[];
	zoomNeed?: boolean;
	chartType?: ChartType;
	labelPositon?: 'left' | 'right' | 'bottom' | 'top';
};

export const CustomChart: React.FC<Props> = ({
	dataLabels,
	// chartData,
	chartDoughnutData,
	chartLineData,
	chartName,
	chartType = 'line',
	className,
	colors,
	zoomNeed,
	labelPositon,
}) => {
	/**
	 * Zoom library 는 register 시 서버 측 렌더링 되므로 window is not defined 에러 발생 => 로딩 이후 시점으로 초기화
	 * next/dynamic 으로 이용 가능하나, Zoom 내부 함수 사용 불가능 ((ex) resetZoom )
	 *  => Type이 달라지므로 useRef 를 통해서 불러오지 못함
	 *
	 */
	useEffect(() => {
		if (zoomNeed) {
			(async () => {
				const zoom = (await import('chartjs-plugin-zoom')).default;
				ChartJS.register(zoom);
			})();
		}
	}, []);
	const chartRef = useRef<ChartJS | null>(null);

	const defaultColor = useMemo(() => {
		return [
			'#FF6347',
			'#FFD700',
			'#40E0D0',
			'#9ACD32',
			'#00BFFF',
			'#FF4500',
			'#FF69B4',
			'#FFFF00',
			'#00FF00',
			'#1E90FF',
			'#8A2BE2',
			'#FFA500',
			'#FF1493',
			'#FF00FF',
			'#32CD32',
			'#00FFFF',
			'#FFDAB9',
			'#FFB6C1',
			'#FFA07A',
		];
	}, [colors]);

	const DATA: ChartData<
		keyof ChartTypeRegistry,
		(number | [number, number] | Point | BubbleDataPoint | null)[],
		unknown
	> = useMemo(() => {
		if (
			(chartType === 'doughnut' ||
				chartType === 'pie' ||
				chartType === 'polarArea') &&
			chartDoughnutData
		) {
			return {
				labels: dataLabels,
				datasets: [
					{
						data: Object.values(chartDoughnutData),
						backgroundColor: defaultColor,
						borderColor: defaultColor,
					},
				],
			};
		} else if (chartLineData) {
			return {
				labels: dataLabels,
				datasets: chartLineData.map((item, index) => {
					return {
						...item,
						backgroundColor: defaultColor[index],
						borderColor: defaultColor[index],
					};
				}),
			};
		}
		return {
			datasets: [],
			labels: [],
		};
	}, [chartDoughnutData, chartLineData]);

	if (!chartDoughnutData && !chartLineData) {
		return null;
	}

	return (
		<div>
			{chartName && <div>{chartName}</div>}
			<Chart
				ref={chartRef}
				data={DATA}
				type={chartType}
				options={{
					plugins: {
						zoom: !zoomNeed
							? {}
							: {
									pan: {
										enabled: true,
										mode: 'xy',
									},
									zoom: {
										wheel: {
											enabled: true,
										},
										pinch: {
											enabled: true,
										},
										mode: 'xy',
									},
								},
						legend: {
							display: labelPositon ? true : false,
							position: labelPositon,
						},
					},
					responsive: true,
				}}
			/>
		</div>
	);
};

CustomChart.displayName = 'CustomChart';
