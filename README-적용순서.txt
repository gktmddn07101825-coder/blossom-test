BLOSSOM v6 | 홈 진행·예정 이벤트 자동 연동
==========================================
적용 대상: GitHub blossom-test 저장소만 (운영용 blossom-home 수정 X)

GitHub 업로드 파일은 딱 2개:
1. index.html     → 저장소의 기존 index.html 내용 전체 교체
2. home-events.js → 새 파일로 업로드 (index.html과 같은 위치)

그 외 admin.html, event.html, auth.html, member-nav.js, calendar.js, calendar.css, todo.html, timer.html, assets 등은 건드리지 마세요.
Supabase SQL/Edge Functions 추가 작업도 필요 없습니다.

기능:
- 서버 blossom-calendar에 등록한 '공개' 일정만 메인 페이지에 표시
- 현재 진행 중인 이벤트 우선, 다음 예정 이벤트 순으로 최대 4건
- 시작/종료 카운트다운 30초마다 자동 갱신
- 진행 중 이벤트는 경과 비율을 작은 가로 막대로 표시
- 오늘의 길드 현황에 '진행/예정' 일정 건수 자동 표시
- 매 5분 또는 탭 복귀 시 서버의 최신 일정 재조회
- 숨긴 이벤트는 최고관리자에게도 홈 미리보기에서는 표시되지 않음
- 로그인하지 않은 방문자는 이벤트 데이터를 받지 않고 로그인 안내 표시

테스트:
1. blossom-test 메인 홈페이지 열기
2. 로그인하지 않은 상태 → 이벤트 영역에 '로그인 후' 안내 표시
3. 로그인 → '진행 중인 이벤트' 영역에 등록한 공개 일정 표시
4. event.html에서 기존 이벤트를 숨기기 → 메인에서 새로고침 시 사라짐
5. 이벤트 삭제 → 메인에서 새로고침 시 사라짐

주의:
- 앞으로 90일 안에 시작하거나 현재 진행 중인 이벤트를 조회합니다.
- 기존 세션 저장 방식(sessionStorage)을 그대로 사용합니다.
- GitHub Pages는 정적 파일 공개 사이트이고, 실제 회원 데이터 접근 권한은 blossom-calendar Edge Function에서 검증합니다.
- 홈에서의 카운트다운은 브라우저를 열어둔 동안 자동으로 갱신됩니다.
- GitHub Pages 배포 완료 후 Ctrl+Shift+R로 캐시를 새로고침하세요.
