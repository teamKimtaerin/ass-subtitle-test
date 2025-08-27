import React, { useState, useRef, useEffect } from 'react';
import { Upload, Play, Pause, Volume2, Palette, Type, Zap, Download, Settings } from 'lucide-react';

const SubtitlePlayer = () => {
  // CSS 추가
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background-color: #f9fafb;
      }
      .container {
        max-width: 90rem;
        margin: 0 auto;
        padding: 1.5rem;
        background-color: white;
        min-height: 100vh;
      }
      .title {
        font-size: 2.5rem;
        font-weight: bold;
        color: #1f2937;
        margin-bottom: 1.5rem;
        text-align: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .main-layout {
        display: grid;
        grid-template-columns: 1fr 350px;
        gap: 2rem;
      }
      .video-section {
        display: flex;
        flex-direction: column;
      }
      .style-panel {
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        border-radius: 16px;
        padding: 2rem;
        border: 2px solid #e2e8f0;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        position: sticky;
        top: 1rem;
        max-height: calc(100vh - 2rem);
        overflow-y: auto;
      }
      .panel-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #e2e8f0;
      }
      .panel-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1f2937;
      }
      .style-section {
        margin-bottom: 2.5rem;
      }
      .section-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #374151;
        margin-bottom: 1.25rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        background: rgba(99, 102, 241, 0.1);
        border-radius: 8px;
      }
      .style-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
      .style-button {
        padding: 1.25rem;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        background: white;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
        font-size: 0.875rem;
        font-weight: 600;
        position: relative;
        overflow: hidden;
      }
      .style-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.5s ease;
      }
      .style-button:hover::before {
        left: 100%;
      }
      .style-button:hover {
        border-color: #6366f1;
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(99, 102, 241, 0.2);
      }
      .style-button.active {
        border-color: #6366f1;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
      }
      .emotion-happy { background: linear-gradient(135deg, #fbbf24, #f59e0b); }
      .emotion-sad { background: linear-gradient(135deg, #6b7280, #4b5563); }
      .emotion-angry { background: linear-gradient(135deg, #ef4444, #dc2626); }
      .emotion-excited { background: linear-gradient(135deg, #06b6d4, #0891b2); }
      .emotion-whisper { background: linear-gradient(135deg, #d1d5db, #9ca3af); }
      .emotion-dramatic { background: linear-gradient(135deg, #7c3aed, #5b21b6); }
      
      .font-arial { font-family: Arial, sans-serif; }
      .font-times { font-family: 'Times New Roman', serif; }
      .font-helvetica { font-family: Helvetica, sans-serif; }
      .font-georgia { font-family: Georgia, serif; }
      .font-comic { font-family: 'Comic Sans MS', cursive; }
      .font-impact { font-family: Impact, sans-serif; }
      
      .animation-fade { background: linear-gradient(135deg, #fcd34d, #f59e0b); }
      .animation-scale { background: linear-gradient(135deg, #34d399, #10b981); }
      .animation-colorshift { background: linear-gradient(135deg, #f472b6, #ec4899); }
      .animation-bounce { background: linear-gradient(135deg, #a78bfa, #8b5cf6); }
      .animation-blur { background: linear-gradient(135deg, #60a5fa, #3b82f6); }
      .animation-shake { background: linear-gradient(135deg, #fb7185, #f43f5e); }
      
      .upload-area {
        margin-bottom: 2rem;
        padding: 2rem;
        border: 3px dashed #d1d5db;
        border-radius: 16px;
        background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
        transition: all 0.3s ease;
      }
      .upload-area:hover {
        border-color: #6366f1;
        background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      }
      .upload-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
      }
      .upload-icon {
        width: 4rem;
        height: 4rem;
        color: #6b7280;
      }
      .upload-text {
        color: #6b7280;
        font-size: 1.125rem;
        font-weight: 500;
      }
      .btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
        font-size: 0.875rem;
      }
      .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      .btn-blue {
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        color: white;
      }
      .btn-green {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
      }
      .btn-purple {
        background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        color: white;
      }
      .video-container {
        position: relative;
        background: linear-gradient(135deg, #1f2937, #111827);
        border-radius: 16px;
        overflow: hidden;
        margin-bottom: 1.5rem;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
      }
      .video {
        width: 100%;
        height: auto;
        display: block;
      }
      .subtitle-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10;
        overflow: hidden;
      }
      .controls {
        background: linear-gradient(135deg, #f8fafc, #e2e8f0);
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
      }
      .controls-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
      }
      .volume-control {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .volume-icon {
        width: 1.25rem;
        height: 1.25rem;
        color: #6b7280;
      }
      .slider {
        width: 6rem;
        height: 0.5rem;
        border-radius: 9999px;
        background: #d1d5db;
        outline: none;
        cursor: pointer;
      }
      .progress-container {
        margin-bottom: 0.75rem;
      }
      .progress-bar {
        width: 100%;
        height: 0.75rem;
        background: linear-gradient(135deg, #e5e7eb, #d1d5db);
        border-radius: 9999px;
        cursor: pointer;
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border-radius: 9999px;
        transition: width 0.1s ease;
      }
      .time-display {
        display: flex;
        justify-content: space-between;
        font-size: 0.875rem;
        color: #6b7280;
        font-weight: 500;
      }
      .instructions {
        margin-top: 2rem;
        padding: 2rem;
        background: linear-gradient(135deg, #eff6ff, #dbeafe);
        border-radius: 16px;
        border: 2px solid #93c5fd;
      }
      .instructions-title {
        font-weight: 700;
        color: #1e40af;
        margin-bottom: 1rem;
        font-size: 1.25rem;
      }
      .instructions-list {
        font-size: 0.875rem;
        color: #1d4ed8;
        line-height: 1.6;
      }
      .instructions-list li {
        margin-bottom: 0.5rem;
      }
      .file-name {
        font-size: 0.875rem;
        color: #374151;
        font-weight: 500;
        padding: 0.5rem 1rem;
        background: rgba(99, 102, 241, 0.1);
        border-radius: 8px;
      }
      .style-preview {
        margin-top: 1.5rem;
        padding: 1.5rem;
        background: linear-gradient(135deg, #1f2937, #111827);
        border-radius: 12px;
        color: white;
        font-size: 0.875rem;
        border: 2px solid #374151;
      }
      .preview-text {
        background: rgba(255, 255, 255, 0.1);
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      .current-style-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        margin-top: 1rem;
        font-size: 0.75rem;
        color: #9ca3af;
      }
      .active-indicator {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #10b981;
        border-radius: 50%;
        margin-right: 0.5rem;
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      @media (max-width: 1280px) {
        .main-layout {
          grid-template-columns: 1fr;
        }
        .style-panel {
          position: static;
          max-height: none;
        }
        .style-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      @media (max-width: 768px) {
        .style-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        .container {
          padding: 1rem;
        }
        .title {
          font-size: 2rem;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [assFile, setAssFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentAssContent, setCurrentAssContent] = useState('');
  const [parsedData, setParsedData] = useState({ dialogues: [], styles: new Map() });
  
  // 현재 선택된 스타일 상태
  const [selectedEmotion, setSelectedEmotion] = useState('Happy');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [selectedAnimation, setSelectedAnimation] = useState('fade');
  
  const videoRef = useRef(null);
  const subtitleDivRef = useRef(null);
  const fileInputRef = useRef(null);

  // 스타일 프리셋 정의 (더 다양하고 강화된 스타일)
  const emotionStyles = {
    Happy: { 
      color: '#FFFF00', 
      fontSize: 28, 
      bold: true, 
      shadow: 0,
      outline: 2,
      description: 'Bright yellow, bold and cheerful'
    },
    Sad: { 
      color: '#6B8CAE', 
      fontSize: 22, 
      bold: false, 
      shadow: 3,
      outline: 1,
      description: 'Soft blue-gray, gentle and melancholic'
    },
    Angry: { 
      color: '#FF0000', 
      fontSize: 32, 
      bold: true, 
      shadow: 2,
      outline: 3,
      description: 'Bold red, strong and intense'
    },
    Excited: { 
      color: '#00FFFF', 
      fontSize: 26, 
      bold: true, 
      shadow: 0,
      outline: 2,
      description: 'Electric cyan, energetic and vibrant'
    },
    Whisper: { 
      color: '#C0C0C0', 
      fontSize: 18, 
      bold: false, 
      shadow: 4,
      outline: 1,
      description: 'Soft gray, quiet and intimate'
    },
    Dramatic: { 
      color: '#FFFFFF', 
      fontSize: 34, 
      bold: true, 
      shadow: 3,
      outline: 2,
      description: 'Pure white, large and commanding'
    }
  };

  const fontOptions = [
    { name: 'Arial', description: 'Clean and modern' },
    { name: 'Times New Roman', description: 'Classic serif' },
    { name: 'Helvetica', description: 'Swiss precision' },
    { name: 'Georgia', description: 'Elegant serif' },
    { name: 'Comic Sans MS', description: 'Playful and casual' },
    { name: 'Impact', description: 'Bold and impactful' }
  ];

  const animationEffects = {
    fade: {
      code: '\\fad(300,300)',
      description: 'Smooth fade in/out'
    },
    scale: {
      code: '\\fad(200,200)\\t(0,500,\\fscx150\\fscy150)\\t(500,1000,\\fscx100\\fscy100)',
      description: 'Scale up then down'
    },
    colorShift: {
      code: '\\fad(200,200)\\t(0,300,\\c&H00FF00&)\\t(300,600,\\c&H0000FF&)\\t(600,900,\\c&H00FFFF&)',
      description: 'Color transitions'
    },
    bounce: {
      code: '\\fad(250,250)\\t(0,400,\\frz10)\\t(400,800,\\frz-10)\\t(800,1200,\\frz0)',
      description: 'Bouncy rotation'
    },
    blur: {
      code: '\\fad(300,300)\\t(0,500,\\blur2)\\t(500,1000,\\blur0)',
      description: 'Blur to sharp focus'
    },
    shake: {
      code: '\\fad(100,100)\\t(0,200,\\fscx120\\fscy120)\\shad3',
      description: 'Intense shake effect'
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.ass')) {
      setAssFile(file);
      loadSubtitles(file);
    } else {
      alert('Please select a valid .ass file');
    }
  };

  const loadSubtitles = async (file) => {
    try {
      const text = await file.text();
      setCurrentAssContent(text);
      parseAndRenderSubtitles(text);
    } catch (error) {
      console.error('Error loading subtitles:', error);
      alert('Error loading subtitles: ' + error.message);
    }
  };

  const parseAndRenderSubtitles = (text) => {
    const video = videoRef.current;
    if (!video) return;

    // ASS 파일 파싱
    const lines = text.split('\n');
    const dialogues = [];
    const styles = new Map();
    
    let inEvents = false;
    let inStyles = false;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine === '[V4+ Styles]') {
        inStyles = true;
        inEvents = false;
        continue;
      }
      
      if (trimmedLine === '[Events]') {
        inEvents = true;
        inStyles = false;
        continue;
      }
      
      if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
        inStyles = false;
        inEvents = false;
        continue;
      }
      
      if (inStyles && trimmedLine.startsWith('Style:')) {
        const styleParts = trimmedLine.substring(6).split(',');
        if (styleParts.length >= 4) {
          const styleName = styleParts[0].trim();
          const fontName = styleParts[1]?.trim() || 'Arial';
          const fontSize = parseInt(styleParts[2]) || 20;
          const primaryColour = styleParts[3]?.trim() || '&H00FFFFFF&';
          const bold = styleParts[6] === '1';
          const shadow = parseInt(styleParts[17]) || 0;
          const outline = parseInt(styleParts[16]) || 1;
          
          styles.set(styleName, {
            color: convertAssColor(primaryColour),
            fontName: fontName,
            fontSize: fontSize,
            bold: bold,
            shadow: shadow,
            outline: outline
          });
        }
      }
      
      if (inEvents && trimmedLine.startsWith('Dialogue:')) {
        const parts = trimmedLine.split(',');
        if (parts.length >= 10) {
          const startTime = parseTimeString(parts[1].trim());
          const endTime = parseTimeString(parts[2].trim());
          const style = parts[3].trim();
          const rawText = parts.slice(9).join(',');
          
          const processedText = processAssText(rawText);
          
          dialogues.push({
            start: startTime,
            end: endTime,
            style: style,
            text: processedText.text,
            effects: processedText.effects,
            originalText: rawText
          });
        }
      }
    }
    
    setParsedData({ dialogues, styles });
    setupSubtitleRenderer(dialogues, styles);
  };

  const setupSubtitleRenderer = (dialogues, styles) => {
    const video = videoRef.current;
    if (!video) return;

    let subtitleDiv = subtitleDivRef.current;
    if (!subtitleDiv) {
      subtitleDiv = document.createElement('div');
      subtitleDiv.className = 'subtitle-overlay';
      
      const videoContainer = video.parentElement;
      videoContainer.appendChild(subtitleDiv);
      subtitleDivRef.current = subtitleDiv;
    }
    
    subtitleDiv.innerHTML = '';

    // 기존 리스너 제거
    if (video.getAttribute('data-subtitle-listener')) {
      video.removeEventListener('timeupdate', window.subtitleUpdateHandler);
    }
    
    // 새 업데이트 핸들러 생성
    window.subtitleUpdateHandler = () => {
      const currentTime = video.currentTime;
      const currentSubs = dialogues.filter(sub => 
        currentTime >= sub.start && currentTime <= sub.end
      );
      
      if (currentSubs.length > 0) {
        subtitleDiv.innerHTML = currentSubs.map((sub, index) => {
          const style = styles.get(sub.style) || { 
            color: '#FFFFFF', 
            fontSize: 24, 
            fontName: 'Arial',
            bold: false,
            shadow: 1,
            outline: 1
          };
          const elapsedTime = currentTime - sub.start;
          const totalDuration = sub.end - sub.start;
          const effectStyle = getEffectStyle(sub.effects, elapsedTime, totalDuration);
          
          return `
            <div style="
              position: ${effectStyle.position};
              bottom: ${effectStyle.bottom};
              left: ${effectStyle.left};
              top: ${effectStyle.top || 'auto'};
              transform: translateX(-50%) ${effectStyle.transform};
              color: ${style.color};
              padding: 12px 20px;
              border-radius: 8px;
              font-family: ${style.fontName || 'Arial'}, sans-serif;
              font-size: ${style.fontSize || 24}px;
              font-weight: ${style.bold ? 'bold' : 'normal'};
              text-align: center;
              max-width: 80%;
              word-wrap: break-word;
              opacity: ${effectStyle.opacity};
              filter: ${effectStyle.filter};
              text-shadow: ${style.shadow}px ${style.shadow}px ${style.shadow * 2}px rgba(0,0,0,0.8);
              border: ${style.outline}px solid rgba(255,255,255,0.3);
              z-index: ${10 + index};
              backdrop-filter: blur(5px);
              ${effectStyle.additional}
            ">${sub.text}</div>
          `;
        }).join('');
      } else {
        subtitleDiv.innerHTML = '';
      }
    };
    
    video.addEventListener('timeupdate', window.subtitleUpdateHandler);
    video.setAttribute('data-subtitle-listener', 'true');
  };

  // 스타일 변경 함수
  const changeStyle = (styleType, styleValue) => {
    if (!currentAssContent) {
      alert('Please upload an ASS file first!');
      return;
    }

    let newAssContent = currentAssContent;
    const lines = newAssContent.split('\n');
    const newLines = [];
    
    let inStyles = false;
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const trimmedLine = line.trim();
      
      if (trimmedLine === '[V4+ Styles]') {
        inStyles = true;
        newLines.push(line);
        continue;
      }
      
      if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']') && trimmedLine !== '[V4+ Styles]') {
        inStyles = false;
      }
      
      if (inStyles && trimmedLine.startsWith('Style:')) {
        const styleParts = line.split(',');
        if (styleParts.length >= 23) {
          // 선택된 감정에 따라 스타일 적용
          if (styleType === 'emotion') {
            const emotionStyle = emotionStyles[styleValue];
            if (emotionStyle) {
              // 폰트 크기 (index 2)
              styleParts[2] = emotionStyle.fontSize.toString();
              // 색상 (index 3)
              styleParts[3] = convertCssColorToAss(emotionStyle.color);
              // Bold (index 6)
              styleParts[6] = emotionStyle.bold ? '1' : '0';
              // Outline (index 16)
              styleParts[16] = emotionStyle.outline.toString();
              // Shadow (index 17)
              styleParts[17] = emotionStyle.shadow.toString();
            }
          } else if (styleType === 'font') {
            // 폰트명 변경 (index 1)
            styleParts[1] = styleValue;
          }
          
          line = styleParts.join(',');
        }
      }
      
      // 애니메이션 효과 변경
      if (styleType === 'animation' && trimmedLine.startsWith('Dialogue:')) {
        const parts = line.split(',');
        if (parts.length >= 10) {
          const textPart = parts.slice(9).join(',');
          const cleanText = textPart.replace(/\{[^}]*\}/g, '');
          const newEffect = animationEffects[styleValue]?.code || '\\fad(300,300)';
          parts[9] = `{${newEffect}}${cleanText}`;
          line = parts.join(',');
        }
      }
      
      newLines.push(line);
    }
    
    newAssContent = newLines.join('\n');
    setCurrentAssContent(newAssContent);
    parseAndRenderSubtitles(newAssContent);
    
    // 선택 상태 업데이트
    if (styleType === 'emotion') {
      setSelectedEmotion(styleValue);
    } else if (styleType === 'font') {
      setSelectedFont(styleValue);
    } else if (styleType === 'animation') {
      setSelectedAnimation(styleValue);
    }
  };

  // CSS 색상을 ASS 형식으로 변환
  const convertCssColorToAss = (cssColor) => {
    if (cssColor.startsWith('#')) {
      const hex = cssColor.substring(1);
      const r = hex.substring(0, 2);
      const g = hex.substring(2, 4);
      const b = hex.substring(4, 6);
      return `&H00${b}${g}${r}&`;
    }
    return '&H00FFFFFF&';
  };

  // ASS 색상을 CSS로 변환
  const convertAssColor = (assColor) => {
    if (assColor.startsWith('&H')) {
      const hex = assColor.substring(2, 8);
      const r = hex.substring(4, 6);
      const g = hex.substring(2, 4);
      const b = hex.substring(0, 2);
      return `#${r}${g}${b}`;
    }
    return '#FFFFFF';
  };

  // ASS 텍스트 처리
  const processAssText = (rawText) => {
    const effects = [];
    let text = rawText;
    
    const tagRegex = /\{([^}]*)\}/g;
    let match;
    
    while ((match = tagRegex.exec(rawText)) !== null) {
      const tag = match[1];
      
      if (tag.includes('\\fad(')) {
        const fadeMatch = tag.match(/\\fad\((\d+),(\d+)\)/);
        if (fadeMatch) {
          effects.push({
            type: 'fade',
            fadeIn: parseInt(fadeMatch[1]),
            fadeOut: parseInt(fadeMatch[2])
          });
        }
      }
      
      if (tag.includes('\\t(') && (tag.includes('\\fscx') || tag.includes('\\fscy'))) {
        const scaleMatch = tag.match(/\\t\((\d+),(\d+),.*?\\fscx(\d+).*?\\fscy(\d+)/);
        if (scaleMatch) {
          effects.push({
            type: 'scale',
            startTime: parseInt(scaleMatch[1]),
            endTime: parseInt(scaleMatch[2]),
            scaleX: parseInt(scaleMatch[3]) / 100,
            scaleY: parseInt(scaleMatch[4]) / 100
          });
        }
      }
      
      if (tag.includes('\\t(') && tag.includes('\\frz')) {
        const rotateMatch = tag.match(/\\t\((\d+),(\d+),.*?\\frz(-?\d+)/);
        if (rotateMatch) {
          effects.push({
            type: 'rotate',
            startTime: parseInt(rotateMatch[1]),
            endTime: parseInt(rotateMatch[2]),
            rotation: parseInt(rotateMatch[3])
          });
        }
      }
    }
    
    text = text.replace(tagRegex, '');
    return { text, effects };
  };

  // 이펙트 스타일 처리
  const getEffectStyle = (effects, elapsedTime, totalDuration) => {
    let style = {
      transform: '',
      opacity: '1',
      filter: '',
      additional: '',
      position: 'absolute',
      bottom: '15%',
      left: '50%'
    };
    
    effects.forEach(effect => {
      switch (effect.type) {
        case 'fade':
          const fadeInTime = effect.fadeIn / 1000;
          const fadeOutTime = effect.fadeOut / 1000;
          const fadeOutStart = totalDuration - fadeOutTime;
          
          if (elapsedTime < fadeInTime) {
            style.opacity = (elapsedTime / fadeInTime).toString();
          } else if (elapsedTime > fadeOutStart) {
            const fadeOutProgress = (elapsedTime - fadeOutStart) / fadeOutTime;
            style.opacity = (1 - fadeOutProgress).toString();
          }
          break;
          
        case 'scale':
          const scaleProgress = Math.min(1, Math.max(0, (elapsedTime * 1000 - effect.startTime) / (effect.endTime - effect.startTime)));
          if (scaleProgress > 0 && scaleProgress < 1) {
            const currentScaleX = 1 + (effect.scaleX - 1) * scaleProgress;
            const currentScaleY = 1 + (effect.scaleY - 1) * scaleProgress;
            style.transform += ` scale(${currentScaleX}, ${currentScaleY})`;
          } else if (scaleProgress >= 1) {
            style.transform += ` scale(${effect.scaleX}, ${effect.scaleY})`;
          }
          break;
          
        case 'rotate':
          const rotateProgress = Math.min(1, Math.max(0, (elapsedTime * 1000 - effect.startTime) / (effect.endTime - effect.startTime)));
          if (rotateProgress > 0) {
            const currentRotation = effect.rotation * rotateProgress;
            style.transform += ` rotate(${currentRotation}deg)`;
          }
          break;
      }
    });
    
    if (!style.transform && style.left === '50%') {
      style.transform = 'translateX(-50%)';
    }
    
    return style;
  };

  // 시간 파싱
  const parseTimeString = (timeStr) => {
    const parts = timeStr.split(':');
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    const seconds = parseFloat(parts[2]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  };

  const togglePlayPause = async () => {
    const video = videoRef.current;
    if (video) {
      try {
        if (isPlaying) {
          video.pause();
          setIsPlaying(false);
        } else {
          await video.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Play/pause error:', error);
      }
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (video) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      video.currentTime = pos * duration;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const downloadSampleAss = () => {
    const sampleAssContent = `[Script Info]
Title: Enhanced Emotional Sample Subtitles
ScriptType: v4.00+

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Happy,Arial,28,&H00FFFF00,&H000000FF,&H00000000,&H80000000,1,0,0,0,100,100,0,0,1,2,0,2,10,10,10,1
Style: Sad,Arial,22,&H00AE8C6B,&H000000FF,&H00000000,&H80000000,0,1,0,0,100,100,0,0,1,1,3,2,10,10,10,1
Style: Angry,Arial,32,&H000000FF,&H000000FF,&H00FFFFFF,&H80000000,1,0,0,0,110,100,0,0,1,3,2,2,10,10,10,1
Style: Excited,Arial,26,&H00FFFF00,&H000000FF,&H00000000,&H80000000,1,0,0,0,100,100,0,0,1,2,0,2,10,10,10,1
Style: Whisper,Arial,18,&H00C0C0C0,&H000000FF,&H00000000,&H80000000,0,1,0,0,100,100,2,0,1,1,4,2,10,10,10,1
Style: Dramatic,Arial,34,&H00FFFFFF,&H000000FF,&H00000000,&H80000000,1,0,0,0,100,100,0,0,1,2,3,2,10,10,10,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:01.00,0:00:04.50,Happy,,0,0,0,,{\\fad(300,300)}안녕하세요! 정말 좋은 하루입니다!
Dialogue: 0,0:00:05.00,0:00:08.00,Excited,,0,0,0,,{\\fad(200,200)\\t(0,300,\\c&H00FF00&)\\t(300,600,\\c&H0000FF&)\\t(600,900,\\c&H00FFFF&)}와! 이거 정말 신나는데요!
Dialogue: 0,0:00:09.00,0:00:13.50,Sad,,0,0,0,,{\\fad(500,500)}그런데... 가끔은 슬플 때도 있어요...
Dialogue: 0,0:00:14.00,0:00:17.00,Angry,,0,0,0,,{\\fad(100,100)\\t(0,200,\\fscx120\\fscy120)\\shad3}이건 정말 화가 나는 일이야!
Dialogue: 0,0:00:18.00,0:00:22.50,Whisper,,0,0,0,,{\\fad(400,400)}쉿... 조용히 말해야 해요...
Dialogue: 0,0:00:23.00,0:00:27.00,Dramatic,,0,0,0,,{\\fad(300,300)\\t(0,500,\\blur2)\\t(500,1000,\\blur0)}이것은... 운명의 순간이다!
Dialogue: 0,0:00:28.00,0:00:32.50,Happy,,0,0,0,,{\\fad(250,250)\\t(0,400,\\frz10)\\t(400,800,\\frz-10)\\t(800,1200,\\frz0)}마지막은 역시 웃으면서 끝내야죠!
`;

    const blob = new Blob([sampleAssContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enhanced_emotional_sample.ass';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadModifiedAss = () => {
    if (!currentAssContent) {
      alert('No ASS content to download!');
      return;
    }

    const blob = new Blob([currentAssContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `modified_${assFile?.name || 'subtitle'}.ass`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h1 className="title">
        🎬 Enhanced ASS Subtitle Player
      </h1>
      
      {/* File Upload Section */}
      <div className="upload-area">
        <div className="upload-content">
          <Upload className="upload-icon" />
          <div style={{ textAlign: 'center' }}>
            <p className="upload-text">Upload your ASS subtitle file to get started</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".ass"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-blue"
              >
                <Upload style={{ width: '1rem', height: '1rem' }} />
                Choose ASS File
              </button>
              <button
                onClick={downloadSampleAss}
                className="btn btn-green"
              >
                <Download style={{ width: '1rem', height: '1rem' }} />
                Sample ASS
              </button>
              {currentAssContent && (
                <button
                  onClick={downloadModifiedAss}
                  className="btn btn-purple"
                >
                  <Download style={{ width: '1rem', height: '1rem' }} />
                  Export Modified
                </button>
              )}
            </div>
          </div>
          {assFile && (
            <p className="file-name">
              <span className="active-indicator"></span>
              Loaded: {assFile.name}
            </p>
          )}
        </div>
      </div>

      <div className="main-layout">
        {/* Video Player Section */}
        <div className="video-section">
          <div className="video-container">
            <video
              ref={videoRef}
              className="video"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/sample.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Subtitle Div Overlay */}
            <div
              ref={subtitleDivRef}
              className="subtitle-overlay"
            />
          </div>

          {/* Controls */}
          <div className="controls">
            <div className="controls-row">
              <button
                onClick={togglePlayPause}
                className="btn btn-blue"
              >
                {isPlaying ? <Pause style={{ width: '1.25rem', height: '1.25rem' }} /> : <Play style={{ width: '1.25rem', height: '1.25rem' }} />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              
              <div className="volume-control">
                <Volume2 className="volume-icon" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="slider"
                />
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{Math.round(volume * 100)}%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
              <div
                className="progress-bar"
                onClick={handleSeek}
              >
                <div
                  className="progress-fill"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Enhanced Style Control Panel */}
        <div className="style-panel">
          <div className="panel-header">
            <Settings style={{ width: '1.5rem', height: '1.5rem', color: '#6366f1' }} />
            <h2 className="panel-title">Style Controls</h2>
          </div>

          {/* Emotion Styles */}
          <div className="style-section">
            <h3 className="section-title">
              <Palette style={{ width: '1rem', height: '1rem' }} />
              Emotion Styles
            </h3>
            <div className="style-grid">
              {Object.entries(emotionStyles).map(([emotion, style]) => (
                <button
                  key={emotion}
                  onClick={() => changeStyle('emotion', emotion)}
                  className={`style-button emotion-${emotion.toLowerCase()} ${selectedEmotion === emotion ? 'active' : ''}`}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{emotion}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    {style.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Font Styles */}
          <div className="style-section">
            <h3 className="section-title">
              <Type style={{ width: '1rem', height: '1rem' }} />
              Font Family
            </h3>
            <div className="style-grid">
              {fontOptions.map((font) => (
                <button
                  key={font.name}
                  onClick={() => changeStyle('font', font.name)}
                  className={`style-button font-${font.name.toLowerCase().replace(/\s+/g, '')} ${selectedFont === font.name ? 'active' : ''}`}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', fontFamily: font.name }}>
                    {font.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    {font.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Animation Effects */}
          <div className="style-section">
            <h3 className="section-title">
              <Zap style={{ width: '1rem', height: '1rem' }} />
              Animation Effects
            </h3>
            <div className="style-grid">
              {Object.entries(animationEffects).map(([animation, effect]) => (
                <button
                  key={animation}
                  onClick={() => changeStyle('animation', animation)}
                  className={`style-button animation-${animation} ${selectedAnimation === animation ? 'active' : ''}`}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    {animation.charAt(0).toUpperCase() + animation.slice(1)}
                  </div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    {effect.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Style Preview */}
          <div className="style-preview">
            <h4 style={{ margin: '0 0 1rem 0', color: '#e5e7eb' }}>Current Style Preview</h4>
            <div className="preview-text">
              <span style={{ 
                fontSize: `${emotionStyles[selectedEmotion]?.fontSize || 24}px`,
                color: emotionStyles[selectedEmotion]?.color || '#FFFFFF',
                fontFamily: selectedFont,
                fontWeight: emotionStyles[selectedEmotion]?.bold ? 'bold' : 'normal'
              }}>
                Sample Subtitle Text
              </span>
            </div>
            <div className="current-style-info">
              <div><strong>Emotion:</strong> {selectedEmotion}</div>
              <div><strong>Font:</strong> {selectedFont}</div>
              <div><strong>Animation:</strong> {selectedAnimation}</div>
              <div><strong>Size:</strong> {emotionStyles[selectedEmotion]?.fontSize}px</div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="instructions">
        <h3 className="instructions-title">🚀 How to Use This Enhanced Player:</h3>
        <ol className="instructions-list">
          <li><strong>Upload Video:</strong> Place your video file as "sample.mp4" in the public folder</li>
          <li><strong>Get Subtitles:</strong> Download the sample ASS file or upload your own</li>
          <li><strong>Load Subtitles:</strong> Upload the ASS file using the "Choose ASS File" button</li>
          <li><strong>Customize Style:</strong> Use the style control panel to change emotions, fonts, and animations</li>
          <li><strong>Real-time Preview:</strong> See changes instantly applied to your subtitles</li>
          <li><strong>Export:</strong> Download your modified ASS file with the "Export Modified" button</li>
        </ol>
        <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#1e40af' }}>
          💡 Tip: Click different emotion styles to see how they transform the look and feel of your subtitles!
        </p>
      </div>
    </div>
  );
};

export default SubtitlePlayer;