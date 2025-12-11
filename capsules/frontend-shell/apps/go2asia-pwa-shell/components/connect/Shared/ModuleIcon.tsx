'use client';

import {
  Users,
  Map,
  Calendar,
  Handshake,
  Target,
  MapPin,
  type LucideIcon,
} from 'lucide-react';
import type { ModuleType } from '../types';

interface ModuleIconProps {
  module: ModuleType;
  size?: number;
  className?: string;
}

const MODULE_ICONS: Record<ModuleType, LucideIcon> = {
  space: Users,
  atlas: Map,
  pulse: Calendar,
  rf: Handshake,
  quest: Target,
  guru: MapPin,
};

export function ModuleIcon({ module, size = 20, className }: ModuleIconProps) {
  const Icon = MODULE_ICONS[module];
  return <Icon size={size} className={className} />;
}

