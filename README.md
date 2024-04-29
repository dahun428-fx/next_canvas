## 경찰청 통계/차트 대쉬보드 만들기

---

- 사용 기술

  chart.js / canvas.js / Next.js / Redux / React.js /
  공공데이터포털 오픈 API / storybook / scss / RESTfulAPI

- 배포 사이트 ( Vercel )
  : https://next-canvas-pied.vercel.app/dashboard/nation-wide

---

1. 대시보드

   > 설명

   - 공공데이터포털 ( https://www.data.go.kr/ ) : 경찰청 범죄 발생 지역별 통계 , 경찰청\_전국 경찰서별 강력범죄 발생현황 API 수신
   - API 데이터를 정제하여 대시보드 형태로 제작

   > 항목

   1. 전국 - 연도 범죄 발생현황 게시판

      - 연도별 특이사항 항목 : 총 범죄 건수 / 최다-최저 범죄 발생지 / 최다 범죄-최저 범죄 / 범죄 유형별 건수 / 경찰서별 현황 / 지역별 범죄
      - 연도별 / 지역별 범죄 상황 차트 항목 : ( ex) 서울 / 경기 / ... )
      - 연도별 / 범죄별 통계 차트 항목 : 강도 / 살인, 절도 / 폭력

   2. 지역 - 범죄 발생현황 게시판

      - 지역별 특이사항 항목 : 연도별-지역별 범죄 건수 / 최다-최저범죄 발생연도 / 범죄유형별 건수
      - 지역 / 연도별 범죄 추이 차트 항목 : ( ex) 서울 2014 / 2015 / 2016 ... )
      - 지역 / 연도별 범죄 분류 차트 : 범죄 대분류 / 중분류

---

2. 강력범죄 발생현황 데이터 (전체)

   > 설명

   - 공공데이터포털 ( https://www.data.go.kr/ ) : 경찰청 범죄 발생 지역별 통계 , 경찰청\_전국 경찰서별 강력범죄 발생현황 API 수신
   - API 데이터를 UI/UX 로 제작하여 출력

1. 경찰서별

- 전체 / 지역별 / 연도별 로 사용자가 데이터를 차트 형태로 한눈에 볼 수 있도록 제작

2.  연도 / 지역별

- 전체 / 범죄별 / 연도별로 사용자가 한누에 강력범죄 추이를 볼 수 있도록 제작
- 사용자가 차트 및 표를 조작하여 볼 수 있도록 확대 / orderBy / 지역 삭제-추가 기능 제작

3.  지역별 상세

- 지역 / 연도별로 범죄 대분류, 중분류로 나누어 차트로 볼 수 있도록 페이지제작
- 대도시별 , 대도시 내 지역별로 사용자가 볼 수 있도록 UI/UX 제작

---

> 이미지

1. 대시보드 : 전국

![image](https://github.com/dahun428-fx/next_canvas/assets/70366042/09c7d142-b318-43d3-971c-24f09ab787ce)
![image](https://github.com/dahun428-fx/next_canvas/assets/70366042/f3f5330e-2c70-4541-ac74-f807e36376d0)

2. 대시보드 : 지역

![image](https://github.com/dahun428-fx/next_canvas/assets/70366042/4be0a7fc-542d-4f72-a04b-0757399c490f)
![image](https://github.com/dahun428-fx/next_canvas/assets/70366042/de903300-b788-4a02-81ba-0840c80441e6)

3. 현황 데이터 : 경찰서별

![image](https://github.com/dahun428-fx/next_canvas/assets/70366042/50494d2d-6560-44c9-8463-4c19f2588134)

4. 현황 데이터 : 연도 / 지역

![image](https://github.com/dahun428-fx/next_canvas/assets/70366042/b9a3451a-61d3-401e-8324-87266b526c62)

5. 현황 데이터 : 지역별상세

![image](https://github.com/dahun428-fx/next_canvas/assets/70366042/b3141f72-42e1-40eb-b957-e06cdee01859)
