from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os
import shutil
from pathlib import Path

app = FastAPI(title="Subtitle Player API")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 프로덕션에서는 구체적인 도메인 지정
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 정적 파일 서빙을 위한 디렉토리 생성
UPLOAD_DIR = Path("uploads")
STATIC_DIR = Path("static")
UPLOAD_DIR.mkdir(exist_ok=True)
STATIC_DIR.mkdir(exist_ok=True)

# 정적 파일 마운트
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    return {"message": "ASS Subtitle Player API"}

@app.post("/upload-subtitle/")
async def upload_subtitle(file: UploadFile = File(...)):
    """
    ASS 자막 파일을 업로드합니다.
    """
    if not file.filename.endswith('.ass'):
        raise HTTPException(status_code=400, detail="Only .ass files are allowed")
    
    try:
        # 파일 저장
        file_location = UPLOAD_DIR / file.filename
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(file.file, file_object)
        
        return {
            "message": "File uploaded successfully",
            "filename": file.filename,
            "file_path": str(file_location)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not upload file: {str(e)}")

@app.get("/download-sample-ass/")
async def download_sample_ass():
    """
    샘플 ASS 파일을 다운로드합니다.
    """
    sample_ass_content = """[Script Info]
Title: Emotional Sample Subtitles
ScriptType: v4.00+
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Happy,Arial,24,&H00FFFF00,&H000000FF,&H00000000,&H80000000,1,0,0,0,100,100,0,0,1,2,0,2,10,10,10,1
Style: Sad,Arial,20,&H00FF8080,&H000000FF,&H00000000,&H80000000,0,1,0,0,100,100,0,0,1,2,2,2,10,10,10,1
Style: Angry,Arial,26,&H000000FF,&H000000FF,&H00FFFFFF,&H80000000,1,0,0,0,110,100,0,0,1,3,0,2,10,10,10,1
Style: Excited,Arial,22,&H0000FFFF,&H000000FF,&H00000000,&H80000000,1,0,0,0,100,100,0,0,1,2,0,2,10,10,10,1
Style: Whisper,Arial,18,&H00C0C0C0,&H000000FF,&H00000000,&H80000000,0,1,0,0,100,100,2,0,1,1,2,2,10,10,10,1
Style: Dramatic,Arial,28,&H00FFFFFF,&H000000FF,&H00000000,&H80000000,1,0,0,0,100,100,0,0,1,3,2,2,10,10,10,1
Style: Love,Arial,24,&H00FF80FF,&H000000FF,&H00000000,&H80000000,0,1,0,0,100,100,0,0,1,2,1,2,10,10,10,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:01.00,0:00:03.50,Happy,,0,0,0,,{\\fad(300,300)\\t(0,500,\\fscx150\\fscy150)\\t(500,1000,\\fscx100\\fscy100)}안녕하세요! 오늘 정말 좋은 날이에요!
Dialogue: 0,0:00:04.00,0:00:07.00,Excited,,0,0,0,,{\\fad(200,200)\\t(0,300,\\c&H00FF00&)\\t(300,600,\\c&H0000FF&)\\t(600,900,\\c&H00FFFF&)}와! 이거 정말 신나는데요!
Dialogue: 0,0:00:08.00,0:00:11.50,Sad,,0,0,0,,{\\fad(500,500)\\t(0,1000,\\alpha&H80&)\\pos(400,400)}그런데... 가끔은 슬플 때도 있어요...
Dialogue: 0,0:00:12.00,0:00:15.00,Angry,,0,0,0,,{\\fad(100,100)\\t(0,200,\\fscx120\\fscy120)\\shad3}이건 정말 화가 나는 일이야!
Dialogue: 0,0:00:16.00,0:00:19.50,Whisper,,0,0,0,,{\\fad(400,400)\\alpha&H40&}쉿... 조용히 말해야 해요...
Dialogue: 0,0:00:20.00,0:00:24.00,Dramatic,,0,0,0,,{\\fad(300,300)\\t(0,500,\\blur2)\\t(500,1000,\\blur0)\\pos(400,300)}이것은... 운명의 순간이다!
Dialogue: 0,0:00:25.00,0:00:28.50,Love,,0,0,0,,{\\fad(250,250)\\t(0,400,\\frz5)\\t(400,800,\\frz-5)\\t(800,1200,\\frz0)}사랑은 아름다워요 ♥
Dialogue: 0,0:00:29.00,0:00:32.50,Happy,,0,0,0,,{\\fad(250,250)\\t(0,400,\\frz10)\\t(400,800,\\frz-10)\\t(800,1200,\\frz0)}마지막은 역시 웃으면서 끝내야죠!
"""
    
    # 임시 파일 생성
    sample_file_path = STATIC_DIR / "sample_emotional.ass"
    with open(sample_file_path, "w", encoding="utf-8") as f:
        f.write(sample_ass_content)
    
    return FileResponse(
        path=sample_file_path,
        filename="sample_emotional.ass",
        media_type="text/plain"
    )

@app.get("/subtitles/{filename}")
async def get_subtitle(filename: str):
    """
    업로드된 자막 파일을 반환합니다.
    """
    file_path = UPLOAD_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Subtitle file not found")
    
    return FileResponse(
        path=file_path,
        filename=filename,
        media_type="text/plain"
    )

@app.get("/subtitles/")
async def list_subtitles():
    """
    업로드된 자막 파일 목록을 반환합니다.
    """
    subtitle_files = [f.name for f in UPLOAD_DIR.glob("*.ass")]
    return {"subtitles": subtitle_files}

@app.delete("/subtitles/{filename}")
async def delete_subtitle(filename: str):
    """
    업로드된 자막 파일을 삭제합니다.
    """
    file_path = UPLOAD_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Subtitle file not found")
    
    try:
        os.remove(file_path)
        return {"message": f"File {filename} deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not delete file: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)