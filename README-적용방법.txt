BLOSSOM 관리 권한 통합 v10 - 적용 순서 (blossom-test 전용)

1) Supabase > Edge Functions > blossom-admin > Code > index.ts
   ZIP/supabase/blossom-admin-index.ts 전체로 교체 -> Deploy
   Verify JWT with legacy secret = OFF 기존 유지

2) Supabase > Edge Functions > blossom-events > Code > index.ts
   ZIP/supabase/blossom-events-index.ts 전체로 교체 -> Deploy
   운영진/부마스터도 모든 공지 수정·삭제 가능해집니다.

3) GitHub > blossom-test 저장소 (main 브랜치):
   admin.html 기존 파일 교체
   member-nav.js 기존 파일 교체
   Commit changes
   index.html, event.html, todo.html, timer.html 변경하지 마세요.

4) 테스트
   - 일반회원으로 로그인: 관리자 센터 버튼 없음
   - 운영진으로 로그인: 관리자 센터 표시, 가입 신청 승인/거절 가능
   - 회원 목록: 하위 직급 회원만 등급 변경/이용 중지
   - 이용 중지 회원은 로그인 불가, 데이터/계정 보존
   - '이용 중지' 탭에서 복구 가능(가입 거절한 계정도 포함)
   - 운영진으로 타인 공지 수정/삭제 가능

직급 순위: 최고관리자 > 길드마스터 > 부마스터 > 운영진 > 일반회원
동급 및 상위 직급은 등급 변경/이용 중지 불가능. 본인 및 최고관리자 보호.

중요:
 - '이용 중지'는 영구 삭제가 아닙니다. 기존 profiles.status의 rejected로 설정하여 승인 회원 인증을 거부합니다.
 - 기존 가입 거절도 rejected라서 '이용 중지' 탭에 같이 나옵니다.
 - 완전한 개인정보/계정 삭제 기능은 아직 포함되지 않습니다.
 - 관리자 등록/회원 정지는 서버에서 로그인 토큰과 승인된 등급으로 검증합니다.
 - 프로젝트가 현재 기존 profiles.status에 approved/pending/rejected를 쓰는 구조에 맞췄습니다.
 - 실제 배포 및 변경 테스트는 아직 진행하지 않았습니다.
