# 테스트 방법

### CSS 변경 테스트 (CSS 스타일 + ASS 렌더링)

백엔드

```jsx
mkdir backend
cd backend
pip install fastapi uvicorn python-multipart
python main.py
```

프론트엔드

```jsx
npx create-react-app frontend
cd frontend
npm install lucide-react
npm start
```

1. 브라우저에서 localhost:3000 접속
2. Download Sample ASS 클릭해서 자막 파일 받아서 업로드 하거나, `frontend/public/`에 위치한 ass 파일들 업로드 해보기
3. 비디오 재생해서 자막 확인

### ASS.js 렌더링 테스트

브라우저에서 루트 폴더에 있는 index.html 열어서 확인
