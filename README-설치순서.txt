BLOSSOM 이벤트 달력 v5 — 3단계 적용 방법
========================================
대상 저장소: GitHub blossom-test (blossom-home 운영용 저장소는 수정하지 않습니다)

필요한 기존 설정
  - Supabase SQL: public.guild_calendar_events 테이블 (1단계)
  - Supabase Edge Function: blossom-calendar (2단계)
  - blossom-calendar / Verify JWT with legacy secret: OFF
  - 기존 blossom-access, blossom-auth, blossom-events, blossom-admin Edge Functions 유지

GitHub 파일 적용 — 딱 4개
  1. event.html     기존 파일 내용 전체 교체
  2. admin.html     기존 파일 내용 전체 교체
  3. calendar.css   새 파일 추가
  4. calendar.js    새 파일 추가

네 파일 모두 index.html과 같은 경로(저장소 최상위)에 저장합니다.
member-gate.js, auth.html, index.html, todo.html, timer.html, assets 폴더는 수정하지 않습니다.
SQL 추가 실행도, Supabase 함수 재배포도 이 단계에서는 필요하지 않습니다.

확인 방법
  1. 최고관리자로 로그인 → '관리자 센터' → '이벤트 달력' 탭 → '이벤트 일정 등록·관리 화면 열기'
     또는 테스트 홈페이지 → '이벤트 & 공지' 페이지.
  2. 화면 위쪽에 날짜별 35일 가로 타임라인이 보이는지 확인.
  3. '＋ 이벤트 등록' → 제목, 시작 일시, 종료 일시, 색상 지정 → 등록하기.
  4. 달력에 일정이 색깔 막대로 표시되는지 확인.
  5. 막대 클릭 → 상세 내용·남은 시간·수정·삭제·숨기기 기능 확인.
  6. 일반 회원 계정 로그인 → 이벤트 열람 가능 / 등록·수정 버튼 없음 확인.

중요
  - 기존 v4 공지 게시판(공지 글 작성/수정/삭제)은 event.html 아래쪽에 그대로 남아 있습니다.
  - event.html의 새로운 달력은 public.guild_calendar_events 테이블을 사용하고,
    기존 게시판은 기존 guild_posts 테이블을 그대로 사용합니다. 서로 독립적입니다.
  - 일정은 한국 시간(Asia/Seoul, UTC+09:00) 기준으로 입력·표시됩니다.
  - 서버에서 승인된 회원인지 확인하며, 운영진 이상인지 확인한 후 수정 기능을 허용합니다.
  - 숨긴 이벤트는 운영진 이상에게만 표시됩니다.
  - 별도의 이미지 주소를 입력하지 않아도 색상 그라데이션 막대가 표시됩니다.
  - GitHub Pages HTML은 공개되므로 비공개 데이터 접근 제어는 Edge Function을 통해 수행합니다.
  - 등록된 이벤트가 없다면 '이 기간에 등록된 이벤트가 없습니다'가 정상입니다.
  - 로그인 만료 시 다시 로그인해야 합니다. 기존 인증 방식을 유지했습니다.

문제가 생길 때
  - 예전 페이지가 나온다: Ctrl+Shift+R 새로고침 / GitHub Pages 배포 완료 확인.
  - 이벤트 목록 오류: Supabase blossom-calendar 배포 및 SQL 테이블 확인.
  - 관리자에게 등록 버튼이 없다: 로그인 계정 등급과 Supabase 응답 can_edit 확인.
  - 상대적인 URL 대신, 아래 주소로 접근:
    https://gktmddn07101825-coder.github.io/blossom-test/event.html?v=5
