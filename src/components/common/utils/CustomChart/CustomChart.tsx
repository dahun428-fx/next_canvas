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
import { digit, percentage } from '@/utils/number';

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
export type CustomChartLineDataArray = {
	label: string;
	data: number[];
};
export type CustomChartLineData = CustomChartDoughnutData;
export type CustomChartData =
	| CustomChartDoughnutData
	| CustomChartLineData
	| CustomChartLineDataArray[];

type Props = {
	className?: string;
	dataLabels: string[];
	// chartData: CustomChartData;
	chartDoughnutData?: CustomChartDoughnutData;
	chartLineData?: CustomChartLineData;
	chartLineDataArray?: CustomChartLineDataArray[];
	chartName?: string;
	colors?: string[];
	zoomNeed?: boolean;
	chartType?: ChartType;
	labelPositon?: 'left' | 'right' | 'bottom' | 'top';
	isResponseSive?: boolean;
	needDigit?: boolean;
	needPercent?: boolean;
};

export const CustomChart: React.FC<Props> = ({
	dataLabels,
	// chartData,
	chartDoughnutData,
	chartLineData,
	chartLineDataArray,
	chartName,
	chartType = 'line',
	className,
	colors,
	zoomNeed,
	labelPositon,
	isResponseSive = true,
	needDigit,
	needPercent,
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
		if (colors && colors.length > 0) {
			return colors;
		}
		return [
			'#FF7F7F', // 짙은 분홍색
			'#FFA07A', // 짙은 살구색
			'#9370DB', // 짙은 보라색
			'#20B2AA', // 짙은 터키스색
			'#6B8E23', // 짙은 올리브색
			'#BDB76B', // 짙은 카키색
			'#CD5C5C', // 짙은 인디언 레드
			'#6495ED', // 짙은 코랄색
			'#8A2BE2', // 짙은 라벤더색
			'#5F9EA0', // 짙은 시안색
			'#7B68EE', // 짙은 파란색
			'#32CD32', // 짙은 라임색
			'#FFD700', // 짙은 금색
			'#CD853F', // 짙은 페치색
			'#8B4513', // 짙은 갈색
			'#CD5555', // 짙은 핑크색
			'#4682B4', // 짙은 스틸 블루
			'#FF6347', // 짙은 토마토색
			'#48D1CC', // 짙은 민트 크림
			'#9932CC', // 짙은 보라색
		];
	}, [colors]);

	const adjustLabels = useMemo(() => {
		if (chartDoughnutData) {
			if (needDigit || needPercent) {
				const labels: string[] = dataLabels;
				const chartDatas: number[] = Object.values(chartDoughnutData);
				let totalcount = chartDatas.reduce((prev, curr) => {
					return prev + curr;
				}, 0);

				let result = [];
				for (let i = 0; i < labels.length; i++) {
					let text = `${labels[i]}`;
					if (needDigit) {
						let digited = `${digit(chartDatas[i])}`;
						text = `${text} ( ${digited} )`;
					}
					if (needPercent) {
						let percent = `${percentage(chartDatas[i], totalcount)}`;
						text = `${text} ( ${percent} )`;
					}
					result.push(text);
				}
				return result;
			}
		}
		return dataLabels;
	}, [dataLabels]);

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
				labels: needDigit || needPercent ? adjustLabels : dataLabels,
				datasets: [
					{
						data: Object.values(chartDoughnutData),
						backgroundColor: defaultColor,
						borderColor: defaultColor,
					},
				],
			};
		} else {
			if (chartLineData) {
				return {
					labels: dataLabels,
					datasets: [
						{
							data: Object.values(chartLineData),
							backgroundColor: defaultColor,
							borderColor: defaultColor,
						},
						// {
						// 	label: 1,
						// 	data: 10,
						// 	backgroundColor: defaultColor[0],
						// 	borderColor: defaultColor[0],
						// },
						// {
						// 	label: 2,
						// 	data: 1,
						// 	backgroundColor: defaultColor[1],
						// 	borderColor: defaultColor[1],
						// },
						// {
						// 	label: 3,
						// 	data:2,
						// 	backgroundColor: defaultColor[2],
						// 	borderColor: defaultColor[2],
						// },
					],
				};
			}

			if (chartLineDataArray) {
				return {
					labels: dataLabels,
					datasets: chartLineDataArray.map((item, index) => {
						return {
							...item,
							backgroundColor: defaultColor[index],
							borderColor: defaultColor[index],
						};
					}),
				};
			}
		}
		return {
			datasets: [],
			labels: [],
		};
	}, [chartDoughnutData, chartLineData, chartLineDataArray]);

	if (!chartDoughnutData && !chartLineData && !chartLineDataArray) {
		return null;
	}

	return (
		<div className={className}>
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
					responsive: isResponseSive,
				}}
			/>
		</div>
	);
};

CustomChart.displayName = 'CustomChart';
