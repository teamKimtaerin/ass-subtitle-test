import React, { useState } from "react";

function SubtitleEditor() {
  const [assText, setAssText] = useState("");
  const [renderer, setRenderer] = useState(null);

  // 업로드 핸들러
  const handleFile = async (e) => {
    const file = e.target.files[0];
    const text = await file.text();
    setAssText(text);
    renderASS(text); // 최초 렌더링
  };

  // 렌더링 함수 (libjass 예시)
  const renderASS = (text) => {
    if (renderer) {
      renderer.dispose(); // 기존 렌더러 제거
    }
    const ass = new window.libjass.ASS(text, window.libjass.Format.ASS);
    const video = document.getElementById("video");
    const container = document.getElementById("sub-container");

    const r = new window.libjass.renderers.WebRenderer(ass, container, video);
    setRenderer(r);
  };

  // 스타일 적용 (클릭 시 실행)
  const applyStyle = (preset) => {
    if (!assText) return;

    let modified = assText.replace(
      /(Style:\s*.*?,)([^,]*),(\d+),([^,]*),/,
      (match, prefix) => {
        if (preset === "neon") {
          return `${prefix}Comic Sans MS,40,&H00FF00FF,`; // 네온 느낌
        } else if (preset === "minimal") {
          return `${prefix}Arial,28,&H00FFFFFF,`; // 심플 화이트
        }
        return match;
      }
    );

    renderASS(modified); // 다시 렌더링
  };

  return (
    <div>
      <input type="file" accept=".ass" onChange={handleFile} />
      <video id="video" controls width="600" src="sample.mp4" />
      <div id="sub-container" style={{ width: "600px", height: "400px" }} />
      <div>
        <button onClick={() => applyStyle("neon")}>네온 스타일</button>
        <button onClick={() => applyStyle("minimal")}>미니멀 스타일</button>
      </div>
    </div>
  );
}
