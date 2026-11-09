BLOSSOM TEST v2 — 권한별 메인 메뉴 + 로그아웃

업로드 장소: GitHub gktmddn07101825-coder/blossom-test 최상위

1. index.html을 ZIP 안의 index.html로 덮어쓰기
2. member-nav.js를 같은 폴더에 새로 업로드
3. 나머지 파일(admin.html / auth.html / todo.html / timer.html / event.html / member-gate.js)은 그대로 유지
4. Supabase 설정 수정 없음

확인 순서:
- 로그아웃 상태: 로그인/회원가입 표시, 관리자 센터 메뉴는 보이지 않음
- 일반 회원(블로썸테스트2) 로그인: 닉네임, '길드원' 배지, 로그아웃 버튼 표시. 관리자 센터는 숨김
- 최고관리자 로그인: 닉네임, '최고관리자' 배지, 관리자 센터 링크 표시
- 로그아웃: 익명 메뉴로 돌아오고 todo.html 방문 시 로그인 요구

주의:
- 관리자 센터 링크를 숨기는 건 화면 처리일 뿐 권한 보안 기능이 아닙니다.
- 실제 관리자 요청은 blossom-admin이 서버 측에서 site_owner를 확인하므로 유지됩니다.
- 브라우저의 sessionStorage에 로그인 세션을 보관하는 기존 구조는 변경하지 않았습니다.
- 이 버전은 회원관리 API, 권한 변경 기능까지 추가한 버전은 아닙니다.
