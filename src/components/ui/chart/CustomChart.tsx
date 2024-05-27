import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { Chart } from 'react-chartjs-2';
import {
	BubbleDataPoint,
	ChartData,
	Chart as ChartJS,
	ChartType,
	ChartTypeRegistry,
	Point,
} from 'chart.js';
import { registerables } from 'chart.js/auto';
import { digit, percentage } from '@/utils/number';

ChartJS.register(...registerables);

interface CustomChartTypeBase {
	className?: string;
	chartType: ChartType;
	chartLabels: string[];
	chartName?: string | ReactNode;
	colors?: string[];
	responsiveOff?: boolean;
	zoomOn?: boolean;
	digitOff?: boolean;
	percentOff?: boolean;
	labelPositon?: 'left' | 'right' | 'bottom' | 'top';
	width?: number | string;
	height?: number | string;
}

export interface MultiChartDataType {
	label: string;
	data: number[];
}

/**
 * Only Accept 'doughnut', 'pie', 'polarArea'
 */
export interface SingleChartType extends CustomChartTypeBase {
	data: Record<string, number>;
}
/**
 * Only Accept 'line', 'bar'
 */
export interface MultiChartType extends CustomChartTypeBase {
	data: MultiChartDataType[];
}

// 조건부 타입을 사용하여 CustomChartType을 정의합니다.
type CustomChartType<T extends ChartType = ChartType> = T extends
	| 'doughnut'
	| 'pie'
	| 'polarArea'
	? SingleChartType
	: MultiChartType;

type Props = CustomChartType;

/**
 * Make Chart By Chart.js
 * @param param0
 * @returns
 */
export const CustomChart: React.FC<Props> = ({
	className,
	chartName,
	chartLabels,
	chartType,
	data,
	colors,
	digitOff = false,
	percentOff = false,
	responsiveOff,
	labelPositon,
	zoomOn,
	width,
	height,
}) => {
	/**
	 * Zoom library 는 register 시 서버 측 렌더링 되므로 window is not defined 에러 발생 => 로딩 이후 시점으로 초기화
	 * next/dynamic 으로 이용 가능하나, Zoom 내부 함수 사용 불가능 ((ex) resetZoom )
	 *  => Type이 달라지므로 useRef 를 통해서 불러오지 못함
	 *
	 */
	useEffect(() => {
		if (zoomOn) {
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

	const customLabels = useMemo(() => {
		if (isRecordType(data)) {
			if (!digitOff || !percentOff) {
				const labels: string[] = chartLabels;
				const chartDatas: number[] = Object.values(data);
				let totalcount = chartDatas.reduce((prev, curr) => {
					return prev + curr;
				}, 0);

				let result = [];
				for (let i = 0; i < labels.length; i++) {
					let text = `${labels[i]}`;
					if (!digitOff) {
						let digited = `${digit(chartDatas[i])}`;
						text = `${text} ( ${digited} )`;
					}
					if (!percentOff) {
						let percent = `${percentage(chartDatas[i], totalcount, 0)}`;
						text = `${text} ( ${percent} )`;
					}
					result.push(text);
				}
				return result;
			}
		}
		return chartLabels;
	}, [chartLabels, data, digitOff, percentOff]);

	const datas: ChartData<
		keyof ChartTypeRegistry,
		(number | [number, number] | Point | BubbleDataPoint | null)[],
		unknown
	> = useMemo(() => {
		//doughnut, pie, polarArea
		if (isRecordType(data)) {
			return {
				labels: customLabels,
				datasets: [
					{
						data: Object.values(data),
						backgroundColor: defaultColor,
						borderColor: defaultColor,
					},
				],
			};
		} else {
			return {
				labels: customLabels,
				datasets: data.map((item, index) => {
					return {
						...item,
						backgroundColor: defaultColor[index],
						borderColor: defaultColor[index],
					};
				}),
			};
		}
	}, [chartLabels, data, customLabels]);

	return (
		<div className={className} style={{ width: width, height: height }}>
			{chartName && <div>{chartName}</div>}
			<>
				<Chart
					ref={chartRef}
					data={datas}
					type={chartType}
					options={{
						plugins: {
							zoom: zoomOn
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
						responsive: !responsiveOff,
					}}
				/>
			</>
		</div>
	);
};

function isRecordType(data: any): data is Record<string, number> {
	if (typeof data !== 'object' || data === null) {
		return false;
	}

	return Object.entries(data).every(
		([key, value]) => typeof key === 'string' && typeof value === 'number'
	);
}

CustomChart.displayName = 'CustomChart';
