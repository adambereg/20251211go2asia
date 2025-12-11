'use client';

import { Card, CardContent, Button } from '@go2asia/ui';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import type { RFChecklistItem } from '../../types';

interface ChecklistFormProps {
  checklist: RFChecklistItem[];
  onSave?: (checklist: RFChecklistItem[]) => void;
}

export function ChecklistForm({ checklist: initialChecklist, onSave }: ChecklistFormProps) {
  const [checklist, setChecklist] = useState<RFChecklistItem[]>(initialChecklist);

  const handleToggle = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: !item.status } : item))
    );
  };

  const handleSave = () => {
    onSave?.(checklist);
  };

  const basicItems = checklist.filter((item) => item.category === 'basic');
  const additionalItems = checklist.filter((item) => item.category === 'additional');

  return (
    <Card className="border-purple-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Чек-лист проверки</h3>
        <div className="space-y-6">
          {/* Базовые требования */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Базовые требования</h4>
            <div className="space-y-2">
              {basicItems.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={item.status}
                    onChange={() => handleToggle(item.id)}
                    className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className={item.status ? 'text-slate-900' : 'text-slate-500'}>
                    {item.requirement}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Дополнительные требования */}
          {additionalItems.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3">Дополнительные требования</h4>
              <div className="space-y-2">
                {additionalItems.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={item.status}
                      onChange={() => handleToggle(item.id)}
                      className="w-5 h-5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className={item.status ? 'text-slate-900' : 'text-slate-500'}>
                      {item.requirement}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Кнопка сохранения */}
          <div className="pt-4 border-t border-slate-200">
            <Button variant="primary" onClick={handleSave} className="w-full">
              Сохранить проверку
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

