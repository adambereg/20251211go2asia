'use client';

import { useState, useMemo } from 'react';
import { Card, Chip } from '@go2asia/ui';
import { Award } from 'lucide-react';
import type { NFTBadge, NFTRarity, ModuleType } from '../types';
import { NFT_RARITY_COLORS, NFT_RARITY_LABELS } from '../types';

interface NFTTabProps {
  nfts: NFTBadge[];
}

export function NFTTab({ nfts }: NFTTabProps) {
  const [selectedRarity, setSelectedRarity] = useState<NFTRarity | 'all'>('all');
  const [selectedModule, setSelectedModule] = useState<ModuleType | 'all'>('all');

  const filteredNFTs = useMemo(() => {
    let result = [...nfts];

    if (selectedRarity !== 'all') {
      result = result.filter((nft) => nft.rarity === selectedRarity);
    }

    if (selectedModule !== 'all') {
      result = result.filter((nft) => nft.module === selectedModule);
    }

    return result;
  }, [nfts, selectedRarity, selectedModule]);

  const rarityColors: Record<NFTRarity, string> = {
    common: 'border-slate-300',
    rare: 'border-blue-400',
    legendary: 'border-purple-500',
  };

  const rarityBgColors: Record<NFTRarity, string> = {
    common: 'bg-slate-50',
    rare: 'bg-blue-50',
    legendary: 'bg-purple-50',
  };

  const modules: (ModuleType | 'all')[] = [
    'all',
    'space',
    'atlas',
    'pulse',
    'rf',
    'quest',
    'guru',
  ];

  return (
    <div className="space-y-6">
      {/* Счётчик */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Award className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-600">NFT Бейджи</h3>
            <p className="text-4xl font-bold text-slate-900">{nfts.length}</p>
          </div>
        </div>
      </Card>

      {/* Фильтры */}
      <div className="space-y-3">
        {/* По редкости */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Редкость</h4>
          <div className="flex flex-wrap gap-2">
            {(['all', 'common', 'rare', 'legendary'] as const).map((rarity) => (
              <Chip
                key={rarity}
                size="sm"
                selected={selectedRarity === rarity}
                onClick={() => setSelectedRarity(rarity)}
              >
                {rarity === 'all' ? 'Все' : NFT_RARITY_LABELS[rarity]}
              </Chip>
            ))}
          </div>
        </div>

        {/* По модулю */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Модуль</h4>
          <div className="flex flex-wrap gap-2">
            {modules.map((module) => (
              <Chip
                key={module}
                size="sm"
                selected={selectedModule === module}
                onClick={() => setSelectedModule(module)}
              >
                {module === 'all' ? 'Все' : module}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* Грид NFT */}
      <div>
        {filteredNFTs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNFTs.map((nft) => (
              <Card
                key={nft.id}
                className={`p-4 border-2 ${rarityColors[nft.rarity]} ${rarityBgColors[nft.rarity]}`}
              >
                <div className="space-y-3">
                  {/* Изображение (placeholder) */}
                  <div className="aspect-square bg-white rounded-lg border-2 border-slate-200 flex items-center justify-center">
                    <Award className="w-16 h-16 text-slate-400" />
                  </div>

                  {/* Название */}
                  <div>
                    <h3 className="font-semibold text-slate-900">{nft.name}</h3>
                    <p className="text-xs text-slate-600 mt-1">{nft.description}</p>
                  </div>

                  {/* Редкость */}
                  <div>
                    <Chip size="sm" selected>
                      {NFT_RARITY_LABELS[nft.rarity]}
                    </Chip>
                  </div>

                  {/* Условия */}
                  <div className="text-xs text-slate-600">
                    <p className="font-medium mb-1">Условия получения:</p>
                    <p>{nft.conditions}</p>
                  </div>

                  {/* Дата получения */}
                  {nft.unlocked_at && (
                    <div className="text-xs text-slate-500">
                      Получен: {new Date(nft.unlocked_at).toLocaleDateString('ru-RU')}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">NFT бейджи не найдены</p>
            <p className="text-sm text-slate-400 mt-1">
              Выполняйте задания, чтобы получить первые бейджи!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

