# BLOSSOM 테스트용 회원 접근 확인 (v1)

## GitHub blossom-test 업로드
다음 6개 파일을 `index.html`과 같은 저장소 최상위 폴더에 업로드하세요.
- index.html (기존 파일 교체, 내부 링크 새 창 열기 해제)
- auth.html (기존 파일 교체, 로그인 후 이전 페이지 돌아가기)
- todo.html (기존 파일 교체, 회원 확인 화면)
- timer.html (기존 파일 교체, 회원 확인 통과 후 타이머 초기화)
- event.html (기존 파일 교체, 회원 확인 화면)
- member-gate.js (새 파일 추가)

`admin.html`과 `assets/`는 그대로 유지합니다.

## Supabase Edge Function 배포
Supabase > Edge Functions > Create a new function > via Editor.
Function name: `blossom-access`.
`supabase/blossom-access-index.ts`의 전체 코드를 복사해서 `index.ts`에 붙여넣고 Deploy.
Function Settings: `Verify JWT with legacy secret`를 **OFF**로 설정.
(함수 코드 안에서 Supabase Auth getUser로 JWT를 직접 검증합니다.)
서비스 역할 키는 Supabase 함수 환경변수로만 사용하고 GitHub에 올리지 마세요.

## 테스트
1. 로그아웃(또는 새 시크릿 창) 후 todo.html 접속 -> 로그인 요청 화면.
2. 로그인 후 '이용하던 페이지로' 클릭 -> todo.html 표시.
3. timer.html / event.html 정상 표시.
4. auth.html 로그아웃 -> 다시 todo.html -> 접근 안내 화면.
5. 승인 전 계정은 blossom-auth 로그인 자체가 거절되는지 확인.

## 보안 범위
GitHub Pages 정적 HTML/JS는 공개 저장소에서 누구나 내려받을 수 있습니다. 이 코드는 UX 접근 게이트이며, HTML 파일을 서버 차원에서 비공개로 만들지 않습니다.
`blossom-access`는 매 진입 때 실제 인증 상태와 `profiles.status=approved`를 서버에서 검증합니다.
장차 비공개 길드 게시물/회원정보/숙제 데이터가 생긴다면 Supabase RLS 또는 회원 인증된 Edge Functions 뒤에서만 제공해야 합니다.
기존 테스트용 숙제/이벤트 페이지는 실제 데이터 연동 없는 안내 페이지입니다.
로그인 토큰 만료 시 다시 로그인해야 합니다 (자동 갱신 미구현).
