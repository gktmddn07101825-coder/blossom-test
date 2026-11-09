BLOSSOM 길드 공지/이벤트 게시판 v4 - blossom-test 전용

이번에는 딱 3곳만 적용합니다. blossom-home 운영 사이트는 건드리지 마세요.

1) Supabase > SQL Editor > New query
   ZIP의 sql/01-guild-posts.sql 전체를 복사 -> Run.
   기존 회원/로그인 정보는 수정하지 않고 guild_posts 테이블만 만듭니다.

2) Supabase > Edge Functions > Create function
   이름: blossom-events
   supabase/blossom-events-index.ts 전체를 index.ts에 붙여넣기 -> Deploy.
   Settings에서 Verify JWT with legacy secret = OFF.
   함수 내부에서 로그인 토큰·회원 승인·역할을 직접 검증합니다.

3) GitHub blossom-test
   event.html을 ZIP의 event.html로 교체 -> Commit changes.
   index.html, auth.html, admin.html, member-gate.js 등 나머지 파일은 건드리지 않습니다.

테스트 방법
 - 일반 회원으로 로그인 -> event.html 접속 -> 게시물 읽기만 가능, 작성 폼 숨김.
 - 운영진 테스트 계정으로 로그인 -> event.html 접속 -> 공지 작성/수정/삭제.
 - 최고관리자 계정 -> 다른 운영진 게시물도 수정/삭제 가능.
 - 로그아웃 -> event.html 직접 접속 시 길드원 로그인 요청.
 - 운영진을 일반 회원으로 낮춘 뒤 새로고침 -> 글 작성 불가.

권한 표
 - 일반 회원: 읽기
 - 운영진/부마스터: 읽기 + 글 작성 + 자신이 쓴 글 수정/삭제
 - 길드마스터/최고관리자: 읽기 + 글 작성 + 모든 글 수정/삭제

주의
 - GitHub Pages의 HTML 파일은 누구나 볼 수 있습니다. 게시물 데이터는 Supabase 함수가 인증 후에만 제공합니다.
 - Supabase Service Role Key, 회원 비밀번호, 토큰을 GitHub에 업로드하지 마세요.
 - 글 목록은 최근 100개까지 출력합니다. 향후 검색/페이지 이동 기능을 추가할 수 있습니다.
 - 이번 버전은 실제 게시물 저장/조회/수정/삭제까지 구현했습니다. 기존 별도의 이벤트 데이터가 자동 이관되지는 않습니다.
 - 로그인 토큰 만료 시 재로그인 필요 (기존 인증 구조 유지).
 - 실제 배포 후 사용자 환경에서의 동작은 확인 전입니다.
