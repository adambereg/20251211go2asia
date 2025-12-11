'use client';

/**
 * Quest Asia - Step Media (Photo/Video)
 * Компонент для загрузки фото или видео
 */

import { useState, useRef } from 'react';
import { Camera, Video, Upload, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { QuestStep, StepResult, MediaFile } from '@/components/quest/types';
import { validateMediaFile } from '@/components/quest/utils/validation';

interface StepMediaProps {
  step: QuestStep;
  onComplete: (result: StepResult) => void;
}

export function StepMedia({ step, onComplete }: StepMediaProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const mediaType = step.mediaType || (step.type === 'video' ? 'video' : 'photo');
  const minCount = step.minMediaCount || 1;

  // Обработка выбора файлов
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    const newFiles: MediaFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type.startsWith('video/') ? 'video' : 'photo';

      if (fileType !== mediaType) {
        setError(`Ожидается ${mediaType === 'photo' ? 'фото' : 'видео'}`);
        continue;
      }

      const url = URL.createObjectURL(file);
      const mediaFile: MediaFile = {
        id: `media-${Date.now()}-${i}`,
        type: fileType,
        url,
        thumbnail: fileType === 'video' ? undefined : url,
        metadata: {
          exif: {
            dateTime: new Date().toISOString(),
            // TODO: Извлечь координаты из EXIF, если доступны
          },
        },
      };

      newFiles.push(mediaFile);
    }

    setMediaFiles((prev) => [...prev, ...newFiles]);
  };

  // Захват фото с камеры
  const handleCapturePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Создаём canvas для захвата кадра
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current!.videoWidth;
      canvas.height = videoRef.current!.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current!, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const mediaFile: MediaFile = {
            id: `media-${Date.now()}`,
            type: 'photo',
            url,
            thumbnail: url,
            metadata: {
              exif: {
                dateTime: new Date().toISOString(),
              },
            },
          };
          setMediaFiles((prev) => [...prev, mediaFile]);
        }
      }, 'image/jpeg');

      // Останавливаем поток
      stream.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    } catch (err) {
      setError('Не удалось получить доступ к камере');
      console.error('Camera error:', err);
    }
  };

  // Запись видео
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: true,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const mediaFile: MediaFile = {
          id: `media-${Date.now()}`,
          type: 'video',
          url,
          thumbnail: undefined,
          metadata: {
            exif: {
              dateTime: new Date().toISOString(),
            },
          },
        };
        setMediaFiles((prev) => [...prev, mediaFile]);
        setRecordedChunks([]);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setError('Не удалось получить доступ к камере');
      console.error('Camera error:', err);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  // Удаление файла
  const handleRemoveFile = (id: string) => {
    const file = mediaFiles.find((f) => f.id === id);
    if (file) {
      URL.revokeObjectURL(file.url);
    }
    setMediaFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Отправка
  const handleSubmit = async () => {
    if (mediaFiles.length < minCount) {
      setError(`Требуется минимум ${minCount} ${minCount === 1 ? 'файл' : 'файлов'}`);
      return;
    }

    setIsUploading(true);
    setError(null);

    // Валидация файлов
    for (const file of mediaFiles) {
      const validation = validateMediaFile(file, step.coordinates, new Date());
      if (!validation.valid) {
        setError(validation.reason || 'Ошибка валидации файла');
        setIsUploading(false);
        return;
      }
    }

    // Имитация загрузки
    setTimeout(() => {
      const result: StepResult = {
        stepId: step.id,
        completed: true,
        completedAt: new Date(),
        method: mediaType === 'video' ? 'video' : 'photo',
        data: {
          media: mediaFiles,
        },
        points: step.rewards.points,
        synced: false,
      };

      setIsUploading(false);
      onComplete(result);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      {/* Инструкция */}
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          {mediaType === 'video' ? (
            <Video className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          ) : (
            <Camera className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          )}
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">
              {mediaType === 'video' ? 'Запишите видео' : 'Сделайте фото'}
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Минимум: {minCount} {minCount === 1 ? 'файл' : 'файлов'}
            </p>
          </div>
        </div>
      </div>

      {/* Видеопоток для записи */}
      {isRecording && (
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />
          <button
            onClick={handleStopRecording}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2"
          >
            <div className="w-4 h-4 bg-white rounded" />
            Остановить запись
          </button>
        </div>
      )}

      {/* Загруженные файлы */}
      {mediaFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mediaFiles.map((file) => (
            <div key={file.id} className="relative group">
              {file.type === 'photo' ? (
                <img
                  src={file.thumbnail || file.url}
                  alt="Uploaded"
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={file.url}
                  className="w-full h-32 object-cover rounded-lg"
                  controls
                />
              )}
              <button
                onClick={() => handleRemoveFile(file.id)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Кнопки действий */}
      {!isRecording && (
        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={mediaType === 'video' ? 'video/*' : 'image/*'}
            multiple={minCount > 1}
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Выбрать {mediaType === 'video' ? 'видео' : 'фото'}
          </button>
          {mediaType === 'photo' && (
            <button
              onClick={handleCapturePhoto}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              Сделать фото
            </button>
          )}
          {mediaType === 'video' && (
            <button
              onClick={handleStartRecording}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Video className="w-5 h-5" />
              Записать видео
            </button>
          )}
        </div>
      )}

      {/* Ошибка */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Кнопка отправки */}
      {mediaFiles.length >= minCount && !isRecording && (
        <button
          onClick={handleSubmit}
          disabled={isUploading}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            isUploading
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Загрузка...
            </>
          ) : (
            'Отправить'
          )}
        </button>
      )}
    </div>
  );
}

