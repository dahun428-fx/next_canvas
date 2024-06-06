import { Box } from "@mui/material";
import Link from "next/link";

type Props = {};

export default function Home() {

	return (
		<Box sx={{width:400}}>
			<div>안녕하세요.</div>
			<div>경찰청 공공데이터API 를 활용한</div>
			<div>대시보드 입니다. </div>
			<div>화면 왼쪽의 네비게이션을 클릭하여</div>
			<div>이용해보세요</div>
		</Box>
	);
}

