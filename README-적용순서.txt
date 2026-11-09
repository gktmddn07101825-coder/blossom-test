BLOSSOM 회원 관리 v3 - blossom-test 전용

이번에는 2개 파일만 적용합니다. 운영용 blossom-home은 수정하지 않습니다.

[1] Supabase Edge Functions > blossom-admin > Code > index.ts
   supabase/blossom-admin-index.ts 전체 코드를 기존 함수 코드 대신 붙여넣기
   Deploy(배포) 클릭
   기존 Verify JWT with legacy secret: OFF 설정 유지

[2] GitHub blossom-test 저장소
   admin.html 파일을 새 버전으로 교체하고 Commit changes
   index.html / auth.html / member-nav.js / todo.html / timer.html / event.html 수정하지 않음

[3] 테스트
   최고관리자로 blossom-test/admin.html 접속
   '가입 대기' 탭에서 기존 승인 기능 확인
   '전체 회원' 탭에서 회원 목록 확인
   테스트 계정 blossomtest13 또는 다른 일반 회원을 선택해
      일반 회원 -> 운영진 -> 다시 일반 회원으로 변경
   홈페이지를 새로고침하면 해당 계정의 권한 표시가 바뀌는지 확인

설명
 - 최고관리자 계정의 등급은 웹에서 바꿀 수 없습니다.
 - 승인된 회원만 등급을 바꿀 수 있습니다.
 - 데이터 변경은 최고관리자 인증을 서버에서 검증한 뒤 진행합니다.
 - 기존 가입 승인 기능은 유지했습니다.
 - 테스트 계정으로만 처음 변경해 보세요.
 - Supabase 테스트 창에 액세스 토큰을 입력할 필요는 없습니다.
 - 별도 SQL 실행은 필요 없습니다.
 - 현재 관리자 변경 내역은 Edge Function 서버 로그에만 남깁니다.
